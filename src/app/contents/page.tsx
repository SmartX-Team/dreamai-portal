import type React from "react";
import data from "./contents.json";

type RoadmapSection = {
  id: "roadmap";
  title: string;
  image: string;
};

type Card = {
  title: string;
  image: string;
  link: string;
};

type XaiSection = {
  id: "xai";
  title: string;
  subtitle?: string;
  background?: string;
  cards: Card[];
};

type GenaiSection = {
  id: "genai";
  title: string;
  background?: string;
  image: string;
  button?: { label: string; link: string };
};

type Section = RoadmapSection | XaiSection | GenaiSection;

/* 카드 기본 크기(비율 유지) */
const CARD_W = 1120;
const CARD_H = 286;

/* 버튼 위치 (미사용 파라미터 제거) */
function buttonRect() {
  return { left: 650, top: 196, width: 140, height: 44, radius: 12 };
}

/* 카드별 스티커 */
function CardStickers({ index }: { index: number }) {
  const items: Array<{ src: string; w: number; style: React.CSSProperties }> = [];

  if (index === 0) {
    items.push({
      src: "/images/contents/stk_bubbles_yellow.png",
      w: 180,
      style: { position: "absolute", top: -26, right: 300 },
    });
  }
  if (index === 1) {
    items.push({
      src: "/images/contents/stk_star_pink.png",
      w: 190,
      style: { position: "absolute", top: -120, left: 130 },
    });
    items.push({
      src: "/images/contents/stk_sparkles_white.png",
      w: 120,
      style: { position: "absolute", top: 18, right: 190 },
    });
  }
  if (index === 2) {
    items.push({
      src: "/images/contents/stk_clover_green.png",
      w: 210,
      style: { position: "absolute", top: -90, left: 120 },
    });
    items.push({
      src: "/images/contents/stk_bolt_blue.png",
      w: 160,
      style: { position: "absolute", top: 36, right: 150 },
    });
  }
  if (index === 3) {
    items.push({
      src: "/images/contents/stk_bubbles_green.png",
      w: 180,
      style: { position: "absolute", bottom: -22, left: 300 },
    });
  }

  return (
    <>
      {items.map((s, i) => (
        <div
          key={i}
          style={{ ...s.style, width: s.w }}
          className="pointer-events-none select-none"
        >
          <img
            src={s.src}
            alt=""
            draggable={false}
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
        </div>
      ))}
    </>
  );
}

/* 카드 */
function Card({
  img,
  title,
  link,
  index,
}: {
  img: string;
  title: string;
  link: string;
  index: number;
}) {
  const btn = buttonRect();

  return (
    <div
      className="relative mx-auto"
      style={{ width: CARD_W, aspectRatio: `${CARD_W} / ${CARD_H}` }}
    >
      {/* 카드 이미지 */}
      <img
        src={img}
        alt={title}
        draggable={false}
        className="rounded-xl"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />

      {/* 버튼 */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} 강의 바로가기`}
        className="absolute"
        style={{
          left: btn.left,
          top: btn.top,
          width: btn.width,
          height: btn.height,
          borderRadius: btn.radius,
        }}
      >
        <span className="block w-full h-full bg-[#e2664d] text-white font-semibold text-center leading-[44px] hover:brightness-105 transition rounded-xl">
          강의 바로가기
        </span>
      </a>

      {/* 스티커 */}
      <CardStickers index={index} />
    </div>
  );
}

/*  생성형 AI 버튼/배경 */
const GENAI_BTN = { x: 830, y: 600, w: 140, h: 44, r: 12 };
const GENAI_BG = { width: 1400, offsetY: 150 };

export default function ContentsPage() {
  const sections = data.sections as Section[];

  const roadmap = sections.find(
    (s): s is RoadmapSection => s.id === "roadmap"
  );
  const xai = sections.find((s): s is XaiSection => s.id === "xai");
  const genai = sections.find((s): s is GenaiSection => s.id === "genai");

  return (
    <main className="w-full bg-white">
      {/* ① 타이틀/설명 */}
      <section className="relative max-w-[1200px] mx-auto px-6 pt-16 pb-10">
        <div className="flex justify-center">
          <img
            src={data.titleimg}
            alt={data.title}
            draggable={false}
            className="w-full max-w-[800px] h-auto mb-10"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="mt-6 text-right text-gray-500">{data.email}</div>
        <hr className="my-6 border-gray-200" />
        <p className="text-gray-700">{data.description}</p>
      </section>

      {/* ② CONTENT 훈련 로드맵 */}
      {roadmap && (
        <section className="relative py-12">
          <div className="relative max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-8">
              <span className="inline-block w-2 h-8 bg-sky-700" />
              <h2 className="text-2xl md:text-3xl font-semibold">
                {roadmap.title}
              </h2>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-[1120px] relative rounded-xl">
                <img
                  src={roadmap.image}
                  alt="훈련 로드맵"
                  draggable={false}
                  className="rounded-xl"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ③ CONTENT 내용 – X+AI 서비스 실증 */}
      {/*
      
      {xai && (
        <section className="relative py-16 pb-24">
          {xai.background && (
            <div className="absolute inset-0 z-0 flex justify-center">
              <img
                src={xai.background}
                alt="xai-bg"
                draggable={false}
                className="pointer-events-none"
                style={{ width: 1600, height: "auto", objectFit: "contain" }}
              />
            </div>
          )}

          <div className="relative z-10 max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-8 bg-sky-700" />
              <h2 className="text-2xl md:text-3xl font-semibold">{xai.title}</h2>
            </div>
            {xai.subtitle && (
              <p className="text-xl md:text-2xl font-semibold mt-4">
                {xai.subtitle}
              </p>
            )}

            <div className="mt-8 space-y-12">
              {xai.cards.map((card, idx) => (
                <Card
                  key={card.title + idx}
                  img={card.image}
                  title={card.title}
                  link={card.link}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </section>
      )}
*/}

      {/* ④ 생성형 AI */}
{/*
      {genai && (
        <section className="relative pt-24 pb-20">
          {genai.background && (
            <div
              className="absolute inset-0 z-0 flex justify-center pointer-events-none"
              style={{ transform: `translateY(${GENAI_BG.offsetY}px) scale(0.9)` }}
            >
              <img
                src={genai.background}
                alt="genai-bg"
                draggable={false}
                className="max-w-[95vw]"
                style={{ width: GENAI_BG.width, height: "auto", objectFit: "contain" }}
              />
            </div>
          )}

          <div className="relative z-10 max-w-[1200px] mx-auto px-6">
            <h2 className="text-xl md:text-2xl font-semibold">{genai.title}</h2>

            <div className="mt-8 flex flex-col items-center">
              <div
                className="relative w-full max-w-[1160px] rounded-xl"
                style={{ aspectRatio: "1160/680" }}
              >
                <img
                  src={genai.image}
                  alt="생성형 AI"
                  draggable={false}
                  className="rounded-xl"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />

                {genai.button && (
                  <a
                    href={genai.button.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="생성형 AI 강의 바로가기"
                    className="absolute"
                    style={{
                      left: GENAI_BTN.x,
                      top: GENAI_BTN.y,
                      width: GENAI_BTN.w,
                      height: GENAI_BTN.h,
                      borderRadius: GENAI_BTN.r,
                      transform: "translateX(-50%)",
                    }}
                  >
                    <span className="block w-full h-full bg-[#e2664d] text-white font-semibold text-center leading-[44px] hover:brightness-105 transition rounded-xl">
                      {genai.button.label}
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
 */}     


    </main>
  );
}
