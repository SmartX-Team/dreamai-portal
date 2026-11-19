export const widgetZones = {
  "header.left": { page: "/", name: "공통 머리글 왼쪽", slots: { gist: "GIST 로고 링크", aigs: "AIGS 로고 링크" } },
  "header.right": { page: "/", name: "공통 머리글 오른쪽", slots: { scent: "SCENT 로고 링크", khp: "한국산업인력공단 로고 링크" } },
  "home.page": { page: "/", name: "홈 화면", slots: { hero: "대표 포스터", directory: "포털 메뉴와 동영상", promotion: "홍보 배너", footer: "공통 안내와 링크" } },
  "home.directory": { page: "/", name: "홈 포털 메뉴", slots: { left: "왼쪽 메뉴", center: "소개 영상과 예약", right: "오른쪽 메뉴" } },
  "home.left": { page: "/", name: "왼쪽 메뉴 묶음", slots: { training: "훈련·행사", resources: "학습 자료", community: "커뮤니티" } },
  "home.left.training": { page: "/", name: "훈련·행사 링크", slots: { training: "훈련", newsac: "디지털새싹", events: "행사", npu: "NPU Training" } },
  "home.left.resources": { page: "/", name: "학습 자료 링크", slots: { contents: "콘텐츠", lms: "LMS", textbook: "교재" } },
  "home.left.community": { page: "/", name: "커뮤니티 링크", slots: { community: "커뮤니티", ambassador: "AI Ambassador" } },
  "home.right": { page: "/", name: "오른쪽 메뉴 묶음", slots: { aigs: "AIGS", scalex: "ScaleX", projects: "프로젝트 링크" } },
  "home.right.projects": { page: "/", name: "오른쪽 프로젝트 링크", slots: { beginner: "Beginner AI", scent: "SCENT", dream: "Dream AI" } },
  "home.center": { page: "/", name: "홈 중앙 안내", slots: { title: "소개 영상 제목", video: "소개 동영상", reservations: "시설 예약 버튼" } },
  "home.reservations": { page: "/", name: "시설별 예약 카드", slots: { space: "SPACE 예약", annex: "ANNEX 예약", livingLab: "Living Lab 예약" } },
  "home.promotion": { page: "/", name: "홍보 배너", slots: { text: "홍보 문구와 신청 링크", image: "홍보 이미지" } },
  "home.promotion.copy": { page: "/", name: "홍보 배너 문구", slots: { subheading: "부제", heading: "제목", schedule: "일정", button: "신청 버튼" } },
  "home.footer": { page: "/", name: "홈 하단 안내", slots: { info: "저작권과 사업자 정보", links: "하단 링크" } },
  "annex.page": { page: "/annex", name: "별관 화면", slots: {
    hero: "별관 제목", overview: "층별 안내도", opening: "공간 소개", space: "2층 실습실", thirdFloor: "3층 연구실", livingLab: "Living Lab",
  } },
  "annex.second": { page: "/annex", name: "별관 2층 실습실", slots: { first: "SW Lab #1", second: "SW Lab #2" } },
  "annex.third": { page: "/annex", name: "별관 3층 연구실", slots: {
    first: "AI-Instructor Room", second: "Dream-AI Room", third: "Physical-AI Room", fourth: "Agentic-AI Room",
  } },
  "beginner.page": { page: "/beginnerai", name: "Beginner AI 화면", slots: { hero: "제목과 소개", diagram: "클러스터 구조도", intro: "세부 안내", pod: "컴퓨팅 자원과 매뉴얼" } },
  "community.page": { page: "/community", name: "커뮤니티 화면", slots: { title: "커뮤니티 제목", description: "커뮤니티 소개", teams: "운영진과 AI Ambassador" } },
  "community.faculty": { page: "/community", name: "운영진 안내", slots: { title: "운영진 제목과 인원", groups: "운영진 카드" } },
  "community.ambassador": { page: "/community", name: "AI Ambassador 안내", slots: { title: "프로그램 제목과 인원", cohorts: "기수 선택", teams: "기수별 팀" } },
  "content.page": { page: "/contents", name: "콘텐츠 화면", slots: { hero: "배너 슬라이드", cards: "콘텐츠 탭", courses: "필수 코스", roadmap: "로드맵" } },
  "content.hero": { page: "/contents", name: "배너 슬라이드 제어", slots: { previous: "이전 배너", card: "배너 이미지와 링크", next: "다음 배너" } },
  "content.menu": { page: "/contents", name: "콘텐츠 탐색", slots: { content: "콘텐츠 카드", training: "훈련 카드" } },
  "content.courses": { page: "/contents", name: "필수 코스 안내", slots: { title: "필수 코스 제목", tabs: "코스 구분", screenshot: "코스 이미지" } },
  "cross.page": { page: "/crosstraining", name: "공동 교육 화면", slots: {
    title: "행사 소개", description: "2026년 행사", catalog: "2025년 행사", year2024: "2024년 행사", year2023: "2023년 행사", year2022: "2022년 행사",
  } },
  "space.page": { page: "/dream_ai_space", name: "Dream AI Space 화면", slots: { hero: "공간 제목", video: "소개 영상", overview: "공간 설명", gallery: "사진 갤러리" } },
  "newsac.page": { page: "/newsac", name: "디지털새싹 화면", slots: { logo: "디지털새싹 로고", intro: "프로그램 소개", memories: "캠프 영상", space: "공간 영상", registration: "캠프 참가 안내" } },
  "newsac.registration": { page: "/newsac", name: "캠프 신청", slots: { title: "신청 제목", introduction: "신청 안내", details: "운영 기간과 공지", button: "신청 링크" } },
  "npu.page": { page: "/nputraining", name: "NPU 교육 화면", slots: { hero: "NPU 교육 소개", programs: "NPU 교육 프로그램" } },
  "npu.courses": { page: "/nputraining", name: "NPU 교육 과정", slots: { heading: "프로그램 제목", followup: "NPU 평가·검증 실무 교육", furiosa: "FuriosaAI NPU 실증 교육" } },
  "textbook.page": { page: "/textbook", name: "교재 화면", slots: { primary: "첫 교재 목록", secondary: "두 번째 교재 목록" } },
  "textbook.detail": { page: "/textbook", name: "교재 상세 화면", slots: { links: "교재 링크", cover: "교재 이미지" } },
  "training.page": { page: "/training", name: "교육·훈련 화면", slots: { logo: "훈련 로고", contact: "연락처", divider: "구분선", introduction: "교육 소개", signup: "훈련 신청", spacer: "여백", courses: "훈련 과정", history: "훈련 내역" } },
  "training.catalog": { page: "/training", name: "훈련 과정 목록", slots: { title: "과정 제목과 설명", filters: "과정 분류 필터", cards: "과정 카드", empty: "과정 없음 안내", dialog: "과정 상세 및 신청" } },
} as const;

export type WidgetZone = keyof typeof widgetZones;
export const widgetTypes = ["existing", "heading", "text", "image", "video", "link", "divider", "spacer"] as const;
export type WidgetType = typeof widgetTypes[number];

export type Widget = {
  id: string;
  type: WidgetType;
  slot?: string;
  text?: string;
  src?: string;
  href?: string;
  filename?: string;
  width?: "full" | "half" | "third";
};
export type WidgetLayouts = Partial<Record<WidgetZone, Widget[]>>;

export function isWidgetZone(value: unknown): value is WidgetZone {
  return typeof value === "string" && Object.hasOwn(widgetZones, value);
}

export function getZoneItems(zone: WidgetZone) {
  return Object.entries(widgetZones[zone].slots);
}

export function defaultWidgets(zone: WidgetZone): Widget[] {
  return getZoneItems(zone).map(([slot]) => ({ id: slot, type: "existing", slot }));
}

export function widgetTarget(zone: WidgetZone, slot: string) {
  return {
    "data-portal-widget": `widget:${zone}:${slot}`,
    "data-portal-widget-name": widgetLabel(zone, { id: slot, type: "existing", slot }),
  };
}

export function moveWidget(items: Widget[], id: string, destination: number | string): Widget[] {
  const from = items.findIndex((item) => item.id === id);
  const to = typeof destination === "number" ? from + destination : items.findIndex((item) => item.id === destination);
  if (from < 0 || to < 0 || to >= items.length || from === to) return items;
  const result = [...items];
  const [item] = result.splice(from, 1);
  result.splice(to, 0, item);
  return result;
}

export function widgetLabel(zone: WidgetZone, widget: Widget) {
  if (widget.type === "existing") return getZoneItems(zone).find(([slot]) => slot === widget.slot)?.[1] ?? "기존 요소";
  const names: Record<Exclude<WidgetType, "existing">, string> = {
    heading: "제목", text: "문구", image: "이미지", video: "동영상", link: "링크", divider: "구분선", spacer: "여백",
  };
  return widget.text || widget.filename || names[widget.type];
}
