import type React from "react";
import data from "./contents.json";

/* --- 타입 정의 --- */
type IntroItem = {
  title: string;
  highlight: string;
  description: string;
  button?: string; // 버튼 문구 추가
  url?: string;
};

type SectionItem = {
  id: string;
  title: string;
  image: string;
};

/* --- 1. 인트로 섹션 컴포넌트 --- */
function IntroSection({ items }: { items: IntroItem[] }) {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-24 space-y-32">
      {items.map((item, idx) => (
        <div 
          key={idx} 
          className={`flex flex-col md:flex-row items-center gap-12 ${
            idx % 2 === 1 ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight whitespace-pre-line">
              {item.title} <br />
              <span className="text-blue-600">{item.highlight}</span>
            </h2>
            <div className="text-gray-600 leading-relaxed">
              <p className="font-semibold text-gray-700 mb-6 text-lg md:text-2xl whitespace-pre-line">
                {item.description}
              </p>
              
              {/* URL과 버튼 문구가 있을 때만 노출 */}
              {item.url && item.button && (
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-3 bg-black text-white font-medium rounded-full 
                             transition-all duration-300 ease-in-out
                             hover: hover:shadow-xl hover:-translate-y-1 active:scale-95"
                >
                  {item.button}
                </a>
              )}
            </div>
          </div>
          <div className="flex-1 hidden md:block" />
        </div>
      ))}
    </section>
  );
}

/* --- 2. 메인 페이지 컴포넌트 --- */
export default function ContentsPage() {
  const introItems = data.intro as IntroItem[];
  const sections = data.sections as SectionItem[];

  return (
    <main className="w-full bg-white">
      {/* ① 상단 타이틀 이미지 및 설명 섹션 */}
      <section className="relative max-w-[1200px] mx-auto px-6 pt-16 pb-12">
        <div className="flex justify-center mb-10">
          <img
            src={data.titleimg}
            alt={data.title}
            draggable={false}
            className="w-full max-w-[800px] h-auto"
            style={{ objectFit: "contain" }}
          />
        </div>
        
        <div className="mt-4 text-right text-gray-500 font-medium">
          {data.email}
        </div>
        
        <hr className="my-8 border-gray-200" />
        
        <p className="text-gray-700 text-lg leading-relaxed break-keep text-justify whitespace-pre-line">
          {data.description}
        </p>
      </section>

      {/* ② 중간 인트로 섹션 (LMS, 맞춤형 훈련 등) */}
      {introItems && <IntroSection items={introItems} />}

      {/* ③ 하단 리스트 섹션 (Landscape, Track List 등) */}
      {sections && sections.map((section) => (
        <section key={section.id} className="relative py-24 bg-white">
          <div className="relative max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-3 mb-12">
              <span className="inline-block w-2 h-8 bg-sky-700" />
              <h2 className="text-3xl font-bold text-gray-900">
                {section.title}
              </h2>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-[1120px]">
                <img
                  src={section.image}
                  alt={section.title}
                  draggable={false}
                  className="w-full h-auto"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}