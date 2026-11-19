import home from "@/data/dream-ai.json";
import community from "@/app/community/community.json";
import contents from "@/app/contents/contents.json";
import space from "@/app/dream_ai_space/dream_ai_space.json";
import textbook from "@/app/textbook/contents.json";
import training from "@/app/training/dream_ai_training.json";
import { beginnerContent } from "./beginner";
import { defaultCourses, type Course } from "./courses";
import newsac from "./newsac.json";
import displayCopy from "./display-copy.json";
import annexLegacy from "./annex-legacy.json";
import eventLegacy from "./crosstraining-legacy.json";
import npuLegacy from "./nputraining-legacy.json";
import type { WidgetLayouts } from "./widgets";

export const portalDefaults = {
  "/": { ...home, display: displayCopy["/"] },
  "/annex": { display: annexLegacy.display },
  "/beginnerai": { ...beginnerContent, display: displayCopy["/beginnerai"] },
  "/community": { ...community, display: displayCopy["/community"] },
  "/contents": { ...contents, display: displayCopy["/contents"] },
  "/crosstraining": { display: eventLegacy.display },
  "/dream_ai_space": { ...space, display: displayCopy["/dream_ai_space"] },
  "/newsac": { ...newsac, display: displayCopy["/newsac"] },
  "/nputraining": { display: npuLegacy.display },
  "/textbook": { ...textbook, display: displayCopy["/textbook"] },
  "/training": { ...training, courses: defaultCourses, display: displayCopy["/training"] },
};

export type PortalPage = keyof typeof portalDefaults;
export type PortalContent = typeof portalDefaults;
export type Field = { id: string; label: string; value: string; kind: "text" | "image" | "link"; filename?: string };
export type Overrides = Record<string, { original: string; value: string; filename?: string }>;
export type Snapshot = { revision: string; overrides: Overrides; addedCourses: Course[]; layouts?: WidgetLayouts };
export type SiteState = {
  draft: Partial<Record<PortalPage, Snapshot>>;
  published: Partial<Record<PortalPage, Snapshot>>;
  demo?: Partial<Record<PortalPage, Snapshot>>;
  editSession?: { id: string; expires: number };
};

export const emptySnapshot: Snapshot = { revision: "initial", overrides: {}, addedCourses: [] };
export const assetPrefix = "/api/portal-content/assets/";
export const assetNamePattern = /^[a-f0-9]{64}\.(?:png|jpe?g|webp|gif|mp4|webm)$/;

export const pageNames: Record<PortalPage, string> = {
  "/": "홈",
  "/annex": "별관",
  "/beginnerai": "Beginner AI",
  "/community": "커뮤니티",
  "/contents": "콘텐츠",
  "/crosstraining": "공동 교육",
  "/dream_ai_space": "Dream AI Space",
  "/newsac": "디지털새싹",
  "/nputraining": "NPU Training",
  "/textbook": "교재",
  "/training": "교육·훈련",
};

const labels: Record<string, string> = {
  hero: "대표 배너", adBanner: "홍보 배너", courses: "과정", title: "제목", title2: "두 번째 제목",
  name: "이름", mainTitle: "주제", subTitle: "부제", subtitle: "부제", image: "이미지",
  imageUrl: "이미지", imageUrl2: "두 번째 이미지", titleimg: "대표 이미지", src: "이미지",
  description: "설명", text: "문구", content: "내용", detail: "상세 설명",
  buttonText: "버튼 문구", buttonUrl: "버튼 링크", url: "링크", link: "링크", alt: "이미지 설명",
  schedule: "일정", duration: "교육 시간", curriculum: "커리큘럼", tools: "도구",
  formUrl: "신청 링크", footer: "하단 안내", gallery: "갤러리", video: "영상", email: "이메일",
  explain: "교육 안내", sections: "섹션", menu: "메뉴", catalog: "목록",
  introductionTitle: "소개 제목", introduction: "소개", logoImage: "로고", registrationTitle: "신청 제목",
  registration: "신청 안내", memoriesTitle: "캠프 영상 제목", memories: "캠프 영상 설명",
  spaceTitle: "SPACE 영상 제목", space: "SPACE 영상 설명", period: "운영 기간",
  firstDate: "1차 일정", secondDate: "2차 일정", firstNotice: "안내 1", secondNotice: "안내 2",
  display: "화면 요소",
};

export function isPortalPage(path: unknown): path is PortalPage {
  return typeof path === "string" && Object.hasOwn(portalDefaults, path);
}

export function portalPageForPath(path: string): PortalPage | undefined {
  return path === "/textbook/content" ? "/textbook" : isPortalPage(path) ? path : undefined;
}

export function portalFieldId(...parts: (string | number)[]) {
  return JSON.stringify(parts.map(String));
}

function imageFilename(value: string) {
  const name = value.split(/[?#]/, 1)[0].split("/").at(-1);
  if (!name) return;
  try { return decodeURIComponent(name); } catch { return name; }
}

function fieldKind(path: string[], value: string): Field["kind"] | undefined {
  const key = path.filter((part) => !/^\d+$/.test(part)).at(-1) ?? "";
  if (/^(id|type|kind|category|level|status|color|icon|key|index|role|className|tabs)$/i.test(key)) return;
  if (/^\/images\//.test(value) || /\.(png|jpe?g|webp|gif|avif|svg)(?:[?#].*)?$/i.test(value)) return "image";
  if (!value && /image|^src$/i.test(key)) return "image";
  if (/^(https?:\/\/|\/|mailto:|tel:)/i.test(value)) return "link";
  if (/url$|link$|^href/i.test(key)) return "link";
  if (value.trim() || key === "description") return "text";
}

function baseContent(page: PortalPage, addedCourses: Course[]) {
  return page === "/training"
    ? { ...portalDefaults[page], courses: [...defaultCourses, ...addedCourses] }
    : portalDefaults[page];
}

export function listFields(page: PortalPage, snapshot = emptySnapshot): Field[] {
  const fields: Field[] = [];
  function visit(node: unknown, path: string[]) {
    if (typeof node === "string") {
      if (page === "/textbook" && path[0] === "catalog" && path[2] === "items") return;
      const kind = fieldKind(path, node);
      if (kind) {
        const id = portalFieldId(...path);
        const label = path.map((part) => /^\d+$/.test(part) ? String(Number(part) + 1) : labels[part] ?? part).join(" / ");
        const override = snapshot.overrides[id];
        const active = override?.original === node ? override : undefined;
        const value = active?.value ?? node;
        fields.push({ id, label, kind, value, filename: kind === "image" ? active?.filename ?? imageFilename(value) : undefined });
      }
    } else if (node && typeof node === "object") {
      for (const [key, child] of Object.entries(node)) visit(child, [...path, key]);
    }
  }
  visit(baseContent(page, snapshot.addedCourses), []);
  return fields;
}

export function applySnapshot<Page extends PortalPage>(page: Page, snapshot = emptySnapshot): PortalContent[Page] {
  function apply(node: unknown, path: string[]): unknown {
    if (typeof node === "string") {
      const override = snapshot.overrides[portalFieldId(...path)];
      return override?.original === node ? override.value : node;
    }
    if (Array.isArray(node)) return node.map((value, index) => apply(value, [...path, String(index)]));
    if (node && typeof node === "object") {
      return Object.fromEntries(Object.entries(node).map(([key, value]) => [key, apply(value, [...path, key])]));
    }
    return node;
  }
  return apply(baseContent(page, snapshot.addedCourses), []) as PortalContent[Page];
}
