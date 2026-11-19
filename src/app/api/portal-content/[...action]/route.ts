import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  beginGithubLogin, canPublish, clearEditorSession, editorAvailable,
  finishGithubLogin, getEditorIdentity, requireSameOrigin,
} from "@/lib/portal-content/auth";
import { assetNamePattern, assetPrefix, isPortalPage } from "@/lib/portal-content/registry";
import {
  ContentError, contentDirectory, createCourse, getDraft, getEditorData,
  defaultLayoutMatches, isDemoSite, isDraftSite, readState, saveField, updateState, validateWidgets, withContentLock,
} from "@/lib/portal-content/server";
import { isWidgetZone, widgetZones } from "@/lib/portal-content/widgets";
import {
  closeWorkspace, editorOrigin, isWorkspaceSession, openWorkspace, requireWorkspace,
  workspaceProtected, workspaceToken,
} from "@/lib/portal-content/workspace-session";

export const runtime = "nodejs";

type Route = { params: Promise<{ action: string[] }> };
const maxImageSize = 8 * 1024 * 1024;
const maxVideoSize = 40 * 1024 * 1024;
const maxJsonSize = 64 * 1024;
const imageTypes: Record<string, string> = {
  png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp", gif: "image/gif",
  mp4: "video/mp4", webm: "video/webm",
};

function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

function handleError(error: unknown) {
  if (error instanceof ContentError) return json({ error: error.message }, error.status);
  console.error("DreamAI content operation failed", error);
  return json({ error: "콘텐츠를 처리하지 못했습니다. 다시 시도해 주세요." }, 500);
}

async function readBody(request: Request, max: number) {
  if (!request.body || Number(request.headers.get("content-length")) > max) {
    throw new ContentError("요청 크기가 허용 범위를 초과했습니다.", 413);
  }
  const reader = request.body.getReader();
  const parts: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > max) {
        await reader.cancel();
        throw new ContentError("요청 크기가 허용 범위를 초과했습니다.", 413);
      }
      parts.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return Buffer.concat(parts, size);
}

function extensionForMedia(bytes: Buffer) {
  if (bytes.length < 16) return;
  if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return "png";
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return "jpg";
  if (bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP") return "webp";
  if (["GIF87a", "GIF89a"].includes(bytes.toString("ascii", 0, 6))) return "gif";
  if (bytes.toString("ascii", 4, 8) === "ftyp") return "mp4";
  if (bytes.subarray(0, 4).equals(Buffer.from([26, 69, 223, 163])) && bytes.subarray(0, 128).includes("webm")) return "webm";
}

async function upload(request: Request, workspaceId?: string) {
  const bytes = await readBody(request, maxVideoSize);
  const extension = extensionForMedia(bytes);
  if (!extension) throw new ContentError("PNG, JPG, WebP, GIF, MP4 또는 WebM 파일을 선택하세요.", 415);
  if (extension !== "mp4" && extension !== "webm" && bytes.byteLength > maxImageSize) {
    throw new ContentError("이미지는 8 MiB까지 업로드할 수 있습니다.", 413);
  }
  const name = createHash("sha256").update(bytes).digest("hex") + "." + extension;
  await withContentLock(async (root) => {
    if (workspaceId && !isWorkspaceSession(await readState(), workspaceId)) throw new ContentError("편집 세션이 종료되었습니다.", 401);
    const directory = path.join(root, "assets");
    await mkdir(directory, { recursive: true });
    const temporary = path.join(directory, `.${randomUUID()}.tmp`);
    try {
      await writeFile(temporary, bytes, { flag: "wx" });
      await rename(temporary, path.join(directory, name));
    } finally {
      await unlink(temporary).catch((error: NodeJS.ErrnoException) => {
        if (error.code !== "ENOENT") throw error;
      });
    }
  });
  return json({ url: assetPrefix + name }, 201);
}

async function getAsset(name: string, range: string | null) {
  const directory = contentDirectory();
  if (!directory || !assetNamePattern.test(name)) return new Response(null, { status: 404 });
  const site = await readState();
  const rendered = isDraftSite() ? site.draft : isDemoSite() ? site.demo ?? {} : site.published;
  const workspace = workspaceProtected();
  if (workspace && !isWorkspaceSession(site, await workspaceToken())) return new Response(null, { status: 404 });
  const url = assetPrefix + name;
  const referenced = Object.values(rendered).some((snapshot) =>
    Object.values(snapshot.overrides).some((entry) => entry.value === url) ||
    snapshot.addedCourses.some((course) => course.imageUrl === url) ||
    Object.values(snapshot.layouts ?? {}).some((widgets) => widgets.some((widget) => widget.src === url))
  );
  if (!referenced && (!isDraftSite() || (!workspace && !(await getEditorIdentity())))) return new Response(null, { status: 404 });
  try {
    const bytes = await readFile(path.join(directory, "assets", name));
    const type = imageTypes[name.split(".").at(-1)!];
    const headers = new Headers({
      "Content-Type": type,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": isDraftSite() ? "private, no-store" : "public, max-age=31536000, immutable",
    });
    if (type.startsWith("video/")) headers.set("Accept-Ranges", "bytes");
    if (type.startsWith("video/") && range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);
      const start = match?.[1] ? Number(match[1]) : Math.max(0, bytes.length - Number(match?.[2]));
      const end = match?.[1] && match[2] ? Math.min(bytes.length - 1, Number(match[2])) : bytes.length - 1;
      if (!match || (!match[1] && !match[2]) || !Number.isSafeInteger(start) || start > end) {
        headers.set("Content-Range", `bytes */${bytes.length}`);
        return new Response(null, { status: 416, headers });
      }
      headers.set("Content-Range", `bytes ${start}-${end}/${bytes.length}`);
      headers.set("Content-Length", String(end - start + 1));
      return new Response(new Uint8Array(bytes.subarray(start, end + 1)), { status: 206, headers });
    }
    headers.set("Content-Length", String(bytes.length));
    return new Response(new Uint8Array(bytes), { headers });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return new Response(null, { status: 404 });
    throw error;
  }
}

export async function GET(request: Request, context: Route) {
  try {
    const { action: [action, name, ...extra] } = await context.params;
    if (action === "assets" && name && !extra.length) return await getAsset(name, request.headers.get("range"));
    if (!editorAvailable() || name) return new Response(null, { status: 404 });
    if (action === "session" && workspaceProtected()) {
      await requireWorkspace();
      return json({ active: true });
    }
    if (action === "login") return beginGithubLogin(request);
    if (action === "callback") return await finishGithubLogin(request);
    if (action !== "draft") return new Response(null, { status: 404 });

    const identity = await getEditorIdentity();
    if (workspaceProtected()) await requireWorkspace();
    else if (!identity) return json({ error: "로그인 후 편집할 수 있습니다." }, 401);
    const page = new URL(request.url).searchParams.get("page");
    if (!isPortalPage(page)) throw new ContentError("편집할 페이지를 선택하세요.");
    const production = process.env.DREAMAI_EDITOR_RELEASE_TARGET === "production";
    return json({ ...getEditorData(await readState(), page), canPublish: !production || Boolean(identity && canPublish(identity)) });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request, context: Route) {
  try {
    const { action: [action, ...extra] } = await context.params;
    if (!editorAvailable() || extra.length) return new Response(null, { status: 404 });
    const workspace = workspaceProtected();
    if (workspace) {
      if (request.headers.get("origin") !== editorOrigin()) throw new ContentError("이 사이트에서 보낸 요청만 허용됩니다.", 403);
    } else {
      requireSameOrigin(request);
    }
    if (workspace && action === "access") {
      let credentials;
      try { credentials = JSON.parse((await readBody(request, 4096)).toString()); }
      catch { throw new ContentError("로그인 요청을 확인하세요."); }
      return await openWorkspace(credentials?.password, credentials?.replace === true);
    }
    const identity = await getEditorIdentity();
    const workspaceId = workspace ? await requireWorkspace() : undefined;
    if (!workspaceId && !identity) return json({ error: "로그인 후 편집할 수 있습니다." }, 401);
    if (action === "logout" && workspaceId) return await closeWorkspace(workspaceId);
    if (action === "logout") return clearEditorSession();
    if (action === "upload") return await upload(request, workspaceId);
    if (!["save", "course", "layout", "publish"].includes(action)) return new Response(null, { status: 404 });
    const production = process.env.DREAMAI_EDITOR_RELEASE_TARGET === "production";
    const permitted = !production || Boolean(identity && canPublish(identity));
    if (action === "publish" && !permitted) throw new ContentError("운영판 게시 권한이 없습니다.", 403);
    let input;
    try {
      input = JSON.parse((await readBody(request, action === "layout" ? 512 * 1024 : maxJsonSize)).toString());
    } catch (error) {
      if (error instanceof ContentError) throw error;
      throw new ContentError("요청을 읽을 수 없습니다.");
    }
    if (!input || typeof input !== "object") throw new ContentError("요청을 확인하세요.");
    const { page, revision } = input;
    if (!isPortalPage(page)) throw new ContentError("편집할 페이지를 선택하세요.");
    const state = await updateState(async (current) => {
      if (workspaceId && !isWorkspaceSession(current, workspaceId)) throw new ContentError("편집 세션이 종료되었습니다.", 401);
      const draft = getDraft(current, page);
      if (draft.revision !== revision) throw new ContentError("시험판에 새 변경이 있습니다. 편집 화면을 새로고침하세요.", 409);
      if (action === "publish") {
        if (production) current.published = { ...current.draft };
        else current.demo = { ...current.draft };
      } else if (action === "save") {
        const overrides = await saveField(page, draft, input.id, input.value, input.filename);
        current.draft[page] = { ...draft, overrides, revision: randomUUID() };
      } else if (action === "layout") {
        const { zone, widgets } = input;
        if (!isWidgetZone(zone) || widgetZones[zone].page !== page) throw new ContentError("이 페이지에서 배치할 수 있는 영역을 선택하세요.");
        const items = await validateWidgets(zone, widgets);
        const layouts = { ...draft.layouts };
        if (defaultLayoutMatches(zone, items)) delete layouts[zone];
        else layouts[zone] = items;
        current.draft[page] = { ...draft, layouts, revision: randomUUID() };
      } else if (page === "/training") {
        const course = await createCourse(draft, input.course);
        current.draft[page] = { ...draft, addedCourses: [...draft.addedCourses, course], revision: randomUUID() };
      } else {
        throw new ContentError("교육·훈련 페이지에서 과정을 추가하세요.");
      }
    });
    return json({ ...getEditorData(state, page), canPublish: permitted });
  } catch (error) {
    return handleError(error);
  }
}
