"use client";

import { useState, useEffect, useCallback } from "react";
import siteData from "./contents.json";

/* ────────────────────────────────────────────
   TYPES
──────────────────────────────────────────── */
interface HeroSlide { id: number; image: string; link?: string; }
interface MenuCard { id: string; category: string; title: string; description: string; icon?: string; link: string; }
interface RoadmapFeature { icon: string; text: string; }
interface RoadmapTab {
  id: string; label: string; image?: string;
  icon?: string; subtitle?: string; quote?: string;
  heroImage?: string; features?: RoadmapFeature[];
}

/* ────────────────────────────────────────────
   HERO — 이미지만, 텍스트 없음
──────────────────────────────────────────── */
function HeroSection() {
  const slides: HeroSlide[] = siteData.hero.slides;
  const [cur, setCur] = useState(0);
  const prev = useCallback(() => setCur((c) => (c - 1 + slides.length) % slides.length), [slides.length]);
  const next = useCallback(() => setCur((c) => (c + 1) % slides.length), [slides.length]);
  useEffect(() => { const t = setInterval(next, 20000); return () => clearInterval(t); }, [next]);

  return (
    <section style={s.heroWrapper}>
      <button onClick={prev} style={s.heroArrow}>‹</button>
      <div style={s.heroCard}>
        <img src={slides[cur].image} alt={`slide-${slides[cur].id}`} style={s.heroImg} />

        {slides[cur].link && (
          <a href={slides[cur].link} style={s.heroCta}>
            바로가기 ›
          </a>
        )}

        <div style={s.heroDots}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCur(i)}
              style={{ ...s.heroDot, ...(i === cur ? s.heroDotActive : {}) }} />
          ))}
        </div>
      </div>
      <button onClick={next} style={s.heroArrow}>›</button>
    </section>
  );
}

/* ────────────────────────────────────────────
   MENU
──────────────────────────────────────────── */
function MenuSection() {
  const tabs = siteData.menu.tabs;
  const allCards = siteData.menu.contents as Record<string, MenuCard[]>;
  const [idx, setIdx] = useState(0);
  const cards = allCards[tabs[idx]] ?? [];
  const isFirst = idx === 0, isLast = idx === tabs.length - 1;

  return (
    <section style={s.section}>
      <div style={s.menuHeading}>
        {tabs.map((tab, i) => (
          <span key={tab} style={{ display: "flex", alignItems: "center" }}>
            {i > 0 && <span style={s.menuDot}>&nbsp;·&nbsp;</span>}
            <button onClick={() => setIdx(i)}
              style={{ ...s.menuTabLabel, ...(i === idx ? s.menuTabLabelActive : {}) }}>
              {tab}
            </button>
          </span>
        ))}
      </div>
      <div style={s.cardGrid}>
        {cards.map((card) => <CardItem key={card.id} card={card} />)}
      </div>
      <div style={s.menuNav}>
        <button style={{ ...s.navBtn, ...(isFirst ? s.navBtnInactive : s.navBtnActive) }}
          onClick={() => !isFirst && setIdx((p) => p - 1)}>‹ 이전</button>
        <button style={{ ...s.navBtn, ...(isLast ? s.navBtnInactive : s.navBtnActive) }}
          onClick={() => !isLast && setIdx((p) => p + 1)}>다음 ›</button>
      </div>
    </section>
  );
}

function CardItem({ card }: { card: MenuCard }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...s.card, ...(hov ? s.cardHovered : {}) }}>
      <div style={s.cardThumb}>
        {card.icon && <img src={card.icon} alt={`${card.title} icon`} style={s.cardIcon} />}
      </div>
      <p style={s.cardCategory}>{card.category}</p>
      <h3 style={s.cardTitle}>{card.title}</h3>
      <p style={s.cardDesc}>{card.description}</p>
      <a href={card.link} style={s.cardBtn}>바로가기 ›</a>
    </div>
  );
}

/* ────────────────────────────────────────────
   COURSES — 이미지 하나
──────────────────────────────────────────── */
function CoursesSection() {
  const tabs = siteData.courses.tabs;
  const images = siteData.courses.images as Record<string, string>;
  const [active, setActive] = useState("dt");

  return (
    <section style={s.section}>
      <h2 style={s.sectionTitle}>성장을 위한 필수 코스</h2>
      <div style={s.pillRow}>
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActive(tab.id)}
            style={{ ...s.pill, ...(active === tab.id ? s.pillActive : {}) }}>
            {tab.label}
          </button>
        ))}
      </div>
      <div style={s.imgWrap}>
        <img key={active} src={images[active]} alt={active} style={s.fullImg} />
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   ROADMAP
   ┌──────────────────────────────────────┐  ← 회색 배경 (roadmapOuter)
   │ [꿈꾸는AI] [DT&Robot] [GenAI] [Core] │  ← 탭 바 (roadmapTabBar)
   │ ┌────────────────────────────────┐   │
   │ │   흰 카드 (roadmapCard)         │   │
   │ └────────────────────────────────┘   │
   └──────────────────────────────────────┘
──────────────────────────────────────────── */
function RoadmapSection() {
  const tabs = siteData.roadmap.tabs as RoadmapTab[];
  const [activeId, setActiveId] = useState(tabs[0].id);
  const activeTab = tabs.find((t) => t.id === activeId)!;

  return (
    <section style={s.roadmapOuter}>
      {/* 탭 바 */}
      <div style={s.roadmapTabBar}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button key={tab.id} onClick={() => setActiveId(tab.id)}
              style={{ ...s.roadmapTabBtn, ...(isActive ? s.roadmapTabBtnActive : {}) }}>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 흰 콘텐츠 카드 */}
      <div style={s.roadmapCard}>
        {activeTab.features
          ? <RoadmapDetail tab={activeTab} />
          : <img key={activeId} src={activeTab.image ?? ""} alt={activeTab.label} style={s.fullImg} />
        }
      </div>
    </section>
  );
}

function RoadmapDetail({ tab }: { tab: RoadmapTab }) {
  return (
    <div>
      <div style={s.rdHeader}>
        {tab.icon && <img src={tab.icon} alt="icon" style={{ width: 28, height: 28 }} />}
        <span style={s.rdTitle}>{tab.label}</span>
        <div style={s.rdLine} />
      </div>
      <div style={s.rdHeroRow}>
        <div style={s.rdHeroText}>
          {tab.subtitle && <p style={s.rdSubtitle}>{tab.subtitle}</p>}
          {tab.quote && (
            <blockquote style={s.rdQuote}>
              <span style={s.rdQuoteMark}>"</span>{tab.quote}<span style={s.rdQuoteMark}>"</span>
            </blockquote>
          )}
        </div>
        {tab.heroImage && <img src={tab.heroImage} alt="hero" style={s.rdHeroImg} />}
      </div>
      {tab.features && (
        <div style={s.rdFeatures}>
          {tab.features.map((f, i) => (
            <div key={i} style={s.rdFeatureRow}>
              <img src={f.icon} alt={`feature-${i}`} style={s.rdFeatureIcon} />
              <p style={s.rdFeatureText}>{f.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────
   APP ROOT
──────────────────────────────────────────── */
export default function App() {
  return (
    <div style={s.root}>
      <HeroSection />
      <MenuSection />
      <CoursesSection />
      <RoadmapSection />
    </div>
  );
}

/* ────────────────────────────────────────────
   STYLES
──────────────────────────────────────────── */
const s: Record<string, React.CSSProperties> = {
  root: {
    fontFamily: "'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
    maxWidth: 1100, margin: "0 auto", padding: "32px 16px",
    display: "flex", flexDirection: "column", gap: 64,
    color: "#1a1a2e", background: "#fff",
  },

  /* ── HERO ── */
  heroWrapper: { display: "flex", alignItems: "center", gap: 12 },
  heroArrow: {
    flexShrink: 0, width: 36, height: 36, borderRadius: "50%",
    border: "1.5px solid #d1d5db", background: "#fff",
    fontSize: 20, cursor: "pointer", color: "#6b7280",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  heroCard: { flex: 1, borderRadius: 16, overflow: "hidden", position: "relative", background: "#f3f4f6", aspectRatio: "1440 / 500" },
  heroImg: { width: "100%", height: "100%", display: "block", objectFit: "cover", position: "absolute", top: 0, left: 0 },
  heroCta: {
    position: "absolute", left: "60.5%", top: "70%", zIndex: 4,
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    padding: "9px 22px", borderRadius: 999, background: "#111124", border: "none",
    fontSize: 10, fontWeight: 800, color: "#ffffff", textDecoration: "none", lineHeight: 1, width: "fit-content", whiteSpace: "nowrap",
  },
  heroDots: {
    position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
    display: "flex", gap: 6, alignItems: "center",
  },
  heroDot: {
    width: 8, height: 8, borderRadius: "50%",
    background: "rgba(255,255,255,0.55)", border: "none",
    cursor: "pointer", padding: 0, transition: "all 0.3s",
  },
  heroDotActive: { background: "#ffffff", width: 22, borderRadius: 4 },

  /* ── SECTION ── */
  section: { display: "flex", flexDirection: "column", gap: 20 },
  sectionTitle: { fontSize: 22, fontWeight: 800, margin: 0 },

  /* ── MENU ── */
  menuHeading: {
    display: "flex", alignItems: "center",
    flexWrap: "wrap" as const, marginBottom: 4,
  },
  menuDot: { color: "#9ca3af", fontSize: 22, fontWeight: 400 },
  menuTabLabel: {
    background: "none", border: "none", cursor: "pointer",
    fontSize: 22, fontWeight: 700, color: "#9ca3af",
    padding: 0, transition: "color 0.2s", userSelect: "none" as const,
  },
  menuTabLabelActive: { color: "#7c3aed" },

  /* ── CARDS ── */
  cardGrid: { display: "flex", gap: 20, flexWrap: "wrap" as const },
  card: {
    flex: "1 1 280px", border: "1.5px solid #e5e7eb", borderRadius: 16,
    padding: "28px 24px", background: "#fff", cursor: "pointer",
    transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
    display: "flex", flexDirection: "column", gap: 10,
  },
  cardHovered: { transform: "translateY(-2px)", border: "1.5px solid #7c3aed", boxShadow: "0 6px 20px rgba(124,58,237,0.13)" },
  cardThumb: {
    width: 52, height: 52, borderRadius: 12, background: "#ede9fe", marginBottom: 4,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  cardIcon: { width: 36, height: 36, objectFit: "contain" as const, display: "block" },
  cardCategory: { fontSize: 11, fontWeight: 700, color: "#7c3aed", letterSpacing: 0.5, margin: 0, textTransform: "uppercase" as const },
  cardTitle: { fontSize: 24, fontWeight: 800, margin: 0 },
  cardDesc: { fontSize: 13, color: "#6b7280", lineHeight: 1.65, flex: 1, margin: 0, whiteSpace: "pre-line" },
  cardBtn: {
    display: "inline-block", marginTop: 8, padding: "8px 18px",
    border: "1.5px solid #060606", borderRadius: 8,
    fontSize: 13, fontWeight: 600, color: "#ffffff",
    background: "#060606",
    textDecoration: "none", width: "fit-content",
  },

  /* ── NAV ── */
  menuNav: { display: "flex", justifyContent: "space-between", marginTop: 4 },
  navBtn: { border: "1.5px solid", borderRadius: 8, padding: "9px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" },
  navBtnActive: { borderColor: "#1a1a2e", background: "#1a1a2e", color: "#fff" },
  navBtnInactive: { borderColor: "#e5e7eb", background: "#fff", color: "#9ca3af", cursor: "default" },

  /* ── PILLS ── */
  pillRow: { display: "flex", gap: 8, flexWrap: "wrap" as const },
  pill: { border: "1.5px solid #d1d5db", background: "#fff", borderRadius: 999, padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#6b7280", transition: "all 0.2s" },
  pillActive: { background: "#1a1a2e", border: "1.5px solid #1a1a2e", color: "#fff" },

  /* ── IMAGE ── */
  imgWrap: { borderRadius: 16, overflow: "hidden", border: "1px solid #e5e7eb" },
  fullImg: { width: "100%", display: "block", objectFit: "cover" },

  /* ─────────────────────────────────────────
     ROADMAP — 시안과 동일한 구조
     ───────────────────────────────────────── */

  /* 회색 배경 전체 컨테이너 */
  roadmapOuter: {
    background: "#ebe9f4",
    borderRadius: 20,
    padding: "20px 20px 28px 20px",
    display: "flex",
    flexDirection: "column",
  },

  /* 탭 버튼들이 늘어선 행 — 흰 카드 위에 떠 있음 */
  roadmapTabBar: {
    display: "flex",
    gap: 2,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  /* 기본(비활성) 탭 버튼 */
  roadmapTabBtn: {
    border: "1px solid transparent",
    borderBottom: "none",
    background: "transparent",
    borderRadius: "10px 10px 0 0",
    padding: "11px 26px 12px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    color: "#9ca3af",
    transition: "background 0.15s, color 0.15s",
    whiteSpace: "nowrap" as const,
  },

  /* 활성 탭: 흰 배경 + 테두리, 카드와 이음새 없이 연결 */
  roadmapTabBtnActive: {
    background: "#fff",
    color: "#6d28d9",
    fontWeight: 700,
    border: "1px solid #ddd6fe",
    borderBottom: "1px solid #fff",   /* 카드 위쪽 테두리를 덮어 이음 */
    marginBottom: -1,                 /* 카드 border와 1px 겹쳐서 이음새 제거 */
    padding: "11px 26px 13px",
    zIndex: 2,
    position: "relative" as const,
  },

  /* 흰 콘텐츠 카드 */
  roadmapCard: {
    background: "#fff",
    border: "1px solid #ddd6fe",
    borderRadius: "10px",
    padding: "36px 36px 40px",
    position: "relative" as const,
    zIndex: 1,
  },

  /* ── ROADMAP DETAIL ── */
  rdHeader: { display: "flex", alignItems: "center", gap: 10, marginBottom: 28 },
  rdTitle: { fontSize: 18, fontWeight: 700, color: "#1a1a2e", whiteSpace: "nowrap" as const },
  rdLine: { flex: 1, height: 1, background: "#e5e7eb", marginLeft: 12 },
  rdHeroRow: { display: "flex", gap: 40, alignItems: "flex-start", marginBottom: 48 },
  rdHeroText: { flex: 1 },
  rdSubtitle: { fontSize: 13, color: "#6b7280", lineHeight: 1.7, margin: "0 0 16px", textAlign: "center" as const },
  rdQuote: { fontSize: 18, fontWeight: 700, color: "#2563eb", lineHeight: 1.5, margin: "16px 0 0", border: "none", padding: 0, fontStyle: "normal", textAlign: "center" as const },
  rdQuoteMark: { fontSize: 22, color: "#93c5fd", marginRight: 2 },
  rdHeroImg: { width: 280, objectFit: "contain" as const, flexShrink: 0 },
  rdFeatures: { display: "flex", flexDirection: "column", gap: 36 },
  rdFeatureRow: { display: "flex", alignItems: "flex-start", gap: 28 },
  rdFeatureIcon: { width: 80, height: 80, objectFit: "contain" as const, flexShrink: 0 },
  rdFeatureText: { fontSize: 15, lineHeight: 1.8, color: "#374151", margin: 0, paddingTop: 8 },
};