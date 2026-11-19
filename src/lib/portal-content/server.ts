import { randomUUID } from "node:crypto";
import { mkdir, readdir, readFile, rename, rmdir, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { connection } from "next/server";
import { cache } from "react";
import {
  applySnapshot, assetNamePattern, assetPrefix, emptySnapshot, listFields, portalDefaults,
  type PortalContent, type PortalPage, type SiteState, type Snapshot,
} from "./registry";
import { defaultCourses, type Course } from "./courses";
import { defaultWidgets, getZoneItems, widgetTypes, type Widget, type WidgetLayouts, type WidgetZone } from "./widgets";

export function contentDirectory() {
  return process.env.DREAMAI_CONTENT_DIR;
}

export function isDraftSite() {
  return process.env.DREAMAI_CONTENT_MODE === "draft";
}

export function isDemoSite() {
  return process.env.DREAMAI_CONTENT_MODE === "demo";
}

function visibleSnapshots(state: SiteState) {
  if (isDraftSite()) return state.draft;
  if (isDemoSite()) return state.demo ?? {};
  return state.published;
}

export class ContentError extends Error {
  constructor(message: string, readonly status = 400) {
    super(message);
  }
}

function filesystemCode(error: unknown) {
  return (error as NodeJS.ErrnoException).code;
}

export async function readState(): Promise<SiteState> {
  const directory = contentDirectory();
  if (!directory) return { draft: {}, published: {} };
  try {
    return JSON.parse(await readFile(path.join(directory, "site.json"), "utf8")) as SiteState;
  } catch (error) {
    if (filesystemCode(error) === "ENOENT") return { draft: {}, published: {} };
    throw error;
  }
}

const readRenderState = cache(async () => {
  await connection();
  return readState();
});

export async function readPortalPage<Page extends PortalPage>(page: Page) {
  const state = await readRenderState();
  const snapshot = visibleSnapshots(state)[page] ?? emptySnapshot;
  const content = applySnapshot(page, snapshot);
  return { content, courses: page === "/training" ? (content as PortalContent["/training"]).courses : [] };
}

export async function readPortalContent() {
  const state = await readRenderState();
  const snapshots = visibleSnapshots(state);
  const entries = (Object.keys(portalDefaults) as PortalPage[]).map((page) => [page, applySnapshot(page, snapshots[page])]);
  const layouts = Object.assign({}, ...Object.values(snapshots).map((snapshot) => snapshot.layouts)) as WidgetLayouts;
  return { content: Object.fromEntries(entries) as PortalContent, layouts };
}

async function lockDirectory(directory: string) {
  const lock = path.join(directory, ".write-lock");
  for (let attempt = 0; attempt < 25; attempt++) {
    try {
      await mkdir(lock);
      return lock;
    } catch (error) {
      if (filesystemCode(error) !== "EEXIST") throw error;
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
  }
  throw new ContentError("다른 저장 작업이 진행 중입니다. 잠시 뒤 다시 시도하세요.", 503);
}

export async function withContentLock<T>(work: (directory: string) => Promise<T>) {
  const directory = contentDirectory();
  if (!directory) throw new ContentError("콘텐츠 저장소가 연결되지 않았습니다.", 503);
  await mkdir(directory, { recursive: true });
  const lock = await lockDirectory(directory);
  try {
    return await work(directory);
  } finally {
    await rmdir(lock);
  }
}

export function updateState(change: (state: SiteState) => void | Promise<void>): Promise<SiteState> {
  return withContentLock(async (directory) => {
    const temporary = path.join(directory, `.${randomUUID()}.tmp`);
    try {
      const state = await readState();
      await change(state);
      await writeFile(temporary, JSON.stringify(state), { flag: "wx" });
      await rename(temporary, path.join(directory, "site.json"));
      await sweepExpiredUploads(directory, state).catch((error) => console.warn("DreamAI upload cleanup failed", error));
      return state;
    } finally {
      await unlink(temporary).catch((error) => { if (filesystemCode(error) !== "ENOENT") throw error; });
    }
  });
}

let previousSweep = 0;
async function sweepExpiredUploads(directory: string, state: SiteState) {
  const now = Date.now();
  if (now - previousSweep < 15 * 60 * 1000) return;
  previousSweep = now;
  const protectedFiles = new Set<string>();
  for (const channel of [state.draft, state.demo, state.published]) {
    for (const snapshot of Object.values(channel ?? {})) {
      const references = [
        ...Object.values(snapshot.overrides).map((entry) => entry.value),
        ...snapshot.addedCourses.map((course) => course.imageUrl),
        ...Object.values(snapshot.layouts ?? {}).flatMap((widgets) => widgets.map((widget) => widget.src)),
      ];
      for (const value of references) if (value?.startsWith(assetPrefix)) protectedFiles.add(value.slice(assetPrefix.length));
    }
  }
  const folder = path.join(directory, "assets");
  const entries = await readdir(folder, { withFileTypes: true }).catch((error) => {
    if (filesystemCode(error) === "ENOENT") return [];
    throw error;
  });
  for (const entry of entries) {
    if (!entry.isFile() || !assetNamePattern.test(entry.name) || protectedFiles.has(entry.name)) continue;
    const filename = path.join(folder, entry.name);
    if (now - (await stat(filename)).mtimeMs > 60 * 60 * 1000) await unlink(filename);
  }
}

export function getDraft(state: SiteState, page: PortalPage) {
  return state.draft[page] ?? emptySnapshot;
}

export function getEditorData(state: SiteState, page: PortalPage) {
  const draft = getDraft(state, page);
  const production = process.env.DREAMAI_EDITOR_RELEASE_TARGET === "production";
  const released = production ? state.published : state.demo;
  return {
    fields: listFields(page, draft),
    revision: draft.revision,
    published: Object.entries(state.draft).every(([key, snapshot]) => released?.[key as PortalPage]?.revision === snapshot.revision),
    releaseSite: production ? "dreamai.kr" : "demo.dreamai.kr",
    layouts: draft.layouts ?? {},
  };
}

function validateLink(value: string) {
  if (/^\/(?![/\\])[^\\\s]*$/.test(value) || /^(mailto|tel):[^\s]+$/i.test(value)) return;
  try {
    const url = new URL(value);
    if (["https:", "http:"].includes(url.protocol) && !url.username && !url.password) return;
  } catch {
    // An invalid URL gets the same message as a disallowed scheme.
  }
  throw new ContentError("웹 주소나 사이트 안의 경로를 입력하세요.");
}

async function validateAsset(value: string, kind: "image" | "video" = "image") {
  const name = value.startsWith(assetPrefix) ? value.slice(assetPrefix.length) : "";
  if (!assetNamePattern.test(name) || /\.(mp4|webm)$/.test(name) !== (kind === "video")) {
    throw new ContentError(kind === "image" ? "이미지 파일을 업로드해 주세요." : "동영상 파일을 업로드해 주세요.");
  }
  try {
    if (!(await stat(path.join(contentDirectory()!, "assets", name))).isFile()) {
      throw new ContentError("업로드한 이미지가 없습니다.");
    }
  } catch (error) {
    if (filesystemCode(error) !== "ENOENT") throw error;
    throw new ContentError("업로드한 이미지가 없습니다.");
  }
}

export async function validateWidgets(zone: WidgetZone, raw: unknown): Promise<Widget[]> {
  if (!Array.isArray(raw) || raw.length > 100) throw new ContentError("위젯 목록을 확인하세요.");
  const ids = new Set<string>();
  const usedSlots = new Set<string>();
  const slots = new Set(getZoneItems(zone).map(([id]) => id));
  const result: Widget[] = [];
  for (const value of raw) {
    if (!value || typeof value !== "object") throw new ContentError("위젯 형식을 확인하세요.");
    const { id, type, slot, text, src, href, width, filename } = value;
    if (typeof id !== "string" || !/^[\w-]{1,80}$/.test(id) || ids.has(id) || !widgetTypes.includes(type)) {
      throw new ContentError("위젯 식별자를 확인하세요.");
    }
    ids.add(id);
    if (width && !["full", "half", "third"].includes(width)) throw new ContentError("위젯 너비를 확인하세요.");
    const block: Widget = { id, type, width };
    if (type === "existing") {
      if (typeof slot !== "string" || !slots.has(slot) || usedSlots.has(slot)) throw new ContentError("기존 요소를 한 번만 배치할 수 있습니다.");
      block.slot = slot;
      usedSlots.add(slot);
    }
    if (["heading", "text", "link", "image", "video"].includes(type)) block.text = courseText(text ?? "", "문구", 16_000);
    if (type === "link") {
      block.href = courseText(href ?? "", "링크", 2048);
      if (block.href) validateLink(block.href);
    }
    if (type === "image" || type === "video") {
      block.src = courseText(src ?? "", "파일", 180);
      if (block.src) await validateAsset(block.src, type);
      if (typeof filename === "string") block.filename = filename.replace(/[\\/\p{Cc}\p{Cf}]/gu, "").slice(0, 255).trim();
    }
    result.push(block);
  }
  return result;
}

export function defaultLayoutMatches(zone: WidgetZone, items: Widget[]) {
  return JSON.stringify(items) === JSON.stringify(defaultWidgets(zone));
}

export async function saveField(page: PortalPage, draft: Snapshot, id: unknown, value: unknown, filename?: unknown) {
  const baseline = listFields(page, { ...draft, overrides: {} }).find((entry) => entry.id === id);
  if (!baseline || typeof value !== "string" || !value.trim() || value.length > 16_000) {
    throw new ContentError("편집 항목과 내용을 확인하세요.");
  }
  const next = value.trim();
  if (baseline.kind === "image" && next !== baseline.value) await validateAsset(next);
  if (baseline.kind === "link" && next !== baseline.value) validateLink(next);
  const overrides = { ...draft.overrides };
  if (next === baseline.value) delete overrides[baseline.id];
  else {
    const displayName = baseline.kind === "image" && typeof filename === "string"
      ? filename.replace(/[\\/\p{Cc}\p{Cf}]/gu, "").slice(0, 255).trim() || undefined
      : undefined;
    overrides[baseline.id] = { original: baseline.value, value: next, filename: displayName };
  }
  return overrides;
}

function courseText(value: unknown, name: string, maximum: number, required = false) {
  if (typeof value !== "string" || value.length > maximum || (required && !value.trim())) {
    throw new ContentError(`${name}을 확인하세요.`);
  }
  return value.trim();
}

export async function createCourse(draft: Snapshot, input: unknown): Promise<Course> {
  if (!input || typeof input !== "object") throw new ContentError("과정 정보를 입력하세요.");
  if (draft.addedCourses.length >= 300) throw new ContentError("추가할 수 있는 과정 수를 초과했습니다.");
  const entry = input as Record<string, unknown>;
  const { category, level, isRegistrationOpen } = entry;
  if (category !== "Core" && category !== "AgenticAI" && category !== "DT&Robot") throw new ContentError("과정 분류를 선택하세요.");
  if (level !== "체험" && level !== "집중" && level !== "심화") throw new ContentError("난이도를 선택하세요.");
  const imageUrl = courseText(entry.imageUrl ?? "", "포스터", 200);
  const formUrl = courseText(entry.formUrl ?? "", "신청 링크", 2048);
  if (imageUrl) await validateAsset(imageUrl);
  if (formUrl) validateLink(formUrl);
  const id = Math.max(0, ...defaultCourses.map((course) => course.id), ...draft.addedCourses.map((course) => course.id)) + 1;
  return {
    id, category, level, imageUrl, formUrl,
    title: courseText(entry.title, "제목", 250, true),
    duration: courseText(entry.duration, "교육 시간", 120, true),
    description: courseText(entry.description ?? "", "설명", 16_000),
    isRegistrationOpen: isRegistrationOpen === true && Boolean(formUrl),
  };
}
