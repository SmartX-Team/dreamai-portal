import Image from "next/image";
import data from "./contents.json";

/* 카드 이미지 크기(비율 유지) */
const CARD_W = 1120;
const CARD_H = 286;

/* X+AI 카드 버튼 위치 */
function buttonRect(_idx: number) {
  return {
    left: 650,
    top: 196,
    width: 140,
    height: 44,
    radius: 12,
  };
}

/* 카드별 스티커 */
function CardStickers({ index }: { index: number }) {
  const items: Array<{ src: string; w: number; style: React.CSSProperties }> = [];

  // 1장
  if (index === 0) {
    items.push({
      src: "/images/contents/stk_bubbles_yellow.png",
      w: 180,
      style: { position: "absolute", top: -26, right: 300 },
    });
  }
  // 2장
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
  // 3장
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
  // 4장
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
          <Image
            src={s.src}
            alt=""
            unoptimized
            width={s.w}
            height={s.w}
            className="object-contain w-full h-auto"
            priority={index === 0}
          />
        </div>
      ))}
    </>
  );
}

/* X+AI 카드 */
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
  const btn = buttonRect(index);

  return (
    <div
      className="relative mx-auto"
      style={{ width: CARD_W, aspectRatio: `${CARD_W} / ${CARD_H}` }}
    >
      {/* 카드 비율 유지 */}
      <Image
        src={img}
        alt={title}
        unoptimized
        fill
        className="rounded-xl object-contain"
        priority={index === 0}
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

/* 생성형 AI 버튼 위치 */
const GENAI_BTN = {
  x: 830,
  y: 600,
  w: 140,
  h: 44,
  r: 12,
};

/* 생성형 AI 배경 */
const GENAI_BG = {
  width: 1400,
  offsetY: 150,
};

export default function ContentsPage() {
  const roadmap = data.sections.find((s) => s.id === "roadmap") as any;
  const xai = data.sections.find((s) => s.id === "xai") as any;
  const genai = data.sections.find((s) => s.id === "genai") as any;

  return (
    <main className="w-full bg-white">
      {/* 타이틀/설명 */}
      <section className="relative max-w-[1200px] mx-auto px-6 pt-16 pb-10">
        {/* 타이틀 이미지 */}
        <div className="flex justify-center">
          <Image
            src={data.titleimg}
            alt={data.title}
            width={0}
            height={0}
            className="object-contain w-full max-w-[800px] h-auto mb-10"
            unoptimized
          />
        </div>

        <div className="mt-6 text-right text-gray-500">{data.email}</div>
        <hr className="my-6 border-gray-200" />
        <p className="text-gray-700">{data.description}</p>
      </section>

      {/* CONTENT 훈련 로드맵 */}
      {roadmap && (
        <section className="relative py-12">
          <div className="relative max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-8">
              <span className="inline-block w-2 h-8 bg-sky-700" />
              <h2 className="text-2xl md:text-3xl font-semibold">{roadmap.title}</h2>
            </div>

            <div className="flex justify-center">
              <div
                className="w-full max-w-[1120px] relative rounded-xl"
                style={{ aspectRatio: "1120/646" }}
              >
                <Image
                  src={roadmap.image}
                  alt="훈련 로드맵"
                  unoptimized
                  fill
                  className="object-contain rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CONTENT 내용 – X+AI 서비스 실증 */}
      {xai && (
        <section className="relative py-16 pb-24">
          {xai.background && (
            <div className="absolute inset-0 z-0 flex justify-center">
              <Image
                src={xai.background}
                alt="xai-bg"
                unoptimized
                width={1600}
                height={900}
                className="w-[1600px] h-auto object-contain pointer-events-none"
              />
            </div>
          )}

          <div className="relative z-10 max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-8 bg-sky-700" />
              <h2 className="text-2xl md:text-3xl font-semibold">{xai.title}</h2>
            </div>
            {xai.subtitle && (
              <p className="text-xl md:text-2xl font-semibold mt-4">{xai.subtitle}</p>
            )}

            <div className="mt-8 space-y-12">
              {xai.cards.map((card: any, idx: number) => (
                <Card
                  key={idx}
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

      {/* 생성형 AI */}
      {genai && (
        <section className="relative pt-24 pb-20">
          {genai.background && (
            <div
              className="absolute inset-0 z-0 flex justify-center pointer-events-none"
              style={{ transform: `translateY(${GENAI_BG.offsetY}px) scale(0.9)` }}
            >
              <Image
                src={genai.background}
                alt="genai-bg"
                unoptimized
                width={GENAI_BG.width}
                height={Math.round((GENAI_BG.width * 9) / 16)}
                className="w-[1400px] max-w-[95vw] h-auto object-contain"
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
                <Image
                  src={genai.image}
                  alt="생성형 AI"
                  unoptimized
                  fill
                  className="object-contain rounded-xl"
                />

                {/* 생성형 AI 버튼 */}
                <a
                  href={genai.button?.link || "#"}
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
                    {genai.button?.label || "강의 바로가기"}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
