"use client";

import dreamData from "@/data/dream-ai.json";
import Link from "next/link";
import Image from "next/image";

type Item = {
  name: string;
  title?: string;
  imageUrl?: string;
  url?: string;
  height?: string;
  margin?: boolean;
};

export default function HomePage() {
  let heroElement = (
    <div>
      <Image
        src={dreamData.hero.imageUrl}
        alt={dreamData.hero.name}
        width={1e6}
        height={1e6}
      />
    </div>
  );
  if (dreamData.hero.url) {
    heroElement = (
      <Link
        href={dreamData.hero.url}
        target={dreamData.hero.url.startsWith("http") ? "_blank" : undefined}
      >
        {heroElement}
      </Link>
    );
  }

  function drawItem(item: Item, idx: number) {
    const width = "w-40";
    let height;
    switch (item.height ?? "lg") {
      case "sm":
        height = "h-15";
        break;
      case "md":
        height = "h-35";
        break;
      case "lg":
      default:
        height = "h-50";
        break;
    }
    let margin;
    if (item.margin === false) {
      margin = "mb-0";
    } else {
      margin = "mb-10";
    }

    {
      /* 이미지 주소가 있으면 이미지를 그리기 */
    }
    let element;
    if (item.imageUrl) {
      element = (
        <div key={idx} className={`relative ${width} ${height} ${margin}`}>
          <Image src={item.imageUrl} alt={item.title ?? item.name} fill />
        </div>
      );

      {
        /* 이미지 느낌나게 카드를 그리기 */
      }
    } else if (item.title) {
      element = (
        <div
          key={idx}
          className={`bg-blue-100 p-4 rounded shadow text-center w-${width} h-${height}`}
        >
          {item.title && <div className="text-sm font-bold">{item.title}</div>}
          <div>{item.title}</div>
        </div>
      );

      {
        /* 내용물이 없으면 빈칸으로 남기기 */
      }
    } else {
      element = <div key={idx} />;
    }

    {
      /* 링크가 있으면 첨부하기 */
    }
    if (item.url) {
      element = (
        <Link
          key={idx}
          href={item.url}
          target={item.url.startsWith("http") ? "_blank" : undefined}
        >
          {element}
        </Link>
      );
    }

    return element;
  }

  return (
    <>
      {/* 기존 레이아웃에서 children 자리에 들어갈 내용 */}
      <section className="bg-white pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* 좌측 아이템 */}
          <div className="flex flex-col items-center">
            {dreamData.catalog.categoriesLeft.map(drawItem)}
          </div>

          {/* 중앙 HERO 이미지 */}
          {dreamData.hero.imageUrl && heroElement}

          {/* 우측 아이템 */}
          <div className="flex flex-col items-center">
            {dreamData.catalog.categoriesRight.map(drawItem)}
          </div>
        </div>
      </section>

      {/* AD 배너 */}
      <section className="w-full flex justify-center mb-32 mt-12"> 
        <div 
          className="w-[60%] max-w-[900px] bg-[#E1EBF4] rounded-[40px] flex items-center relative shadow-sm border border-blue-50 overflow-hidden"
          style={{ 
            aspectRatio: '14 / 2.8',
            containerType: 'inline-size'
          }}
        >
          {/* 왼쪽: 텍스트 영역 */}
          <div className="flex flex-col items-start justify-center h-full w-[50%] pl-[8%] whitespace-nowrap z-10">
            <div style={{ color: '#000000', fontSize: '1.8cqw' }}>
              {dreamData.adBanner.subTitle}
            </div>
            <div 
              style={{ color: '#075F9A', fontSize: '2.8cqw', fontWeight: 'bold' }} 
              className="my-[0.3cqw] leading-none"
            >
              {dreamData.adBanner.mainTitle}
            </div>
            <div style={{ color: '#4B5563', fontSize: '1.4cqw' }} className="mb-[1.5cqw]">
              {dreamData.adBanner.schedule}
            </div>
            <Link 
              href={dreamData.adBanner.buttonUrl} 
              style={{ backgroundColor: '#FFFFFF', color: '#000000', fontSize: '1.1cqw' }}
              className="px-[3cqw] py-[0.6cqw] rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-all font-medium inline-block"
            >
              {dreamData.adBanner.buttonText}
            </Link>
          </div>

          {/* 오른쪽: 이미지 영역 */}
          <div className="absolute right-0 top-0 h-full w-[48%] flex items-center justify-end pr-[2%]">
            <div className="relative w-full h-[95%]"> 
              <Image 
                src={dreamData.adBanner.imageUrl} 
                alt="AD Illustration" 
                fill 
                className="object-contain object-right"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="relative bg-zinc-900 text-zinc-300 text-2xl py-8 w-full">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <div className="leading-none">{dreamData.footer.copyright}</div>
          <div className="leading-none text-xl"><br></br>{dreamData.footer.businessInfo}</div>
        </div>
        {dreamData.footer.trailing.map((item, idx) => {
          return (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              className="leading-none absolute right-10 bottom-8 text-right underline hover:text-white transition-colors duration-200"
            >
              {item.title}
            </a>
          );
        })}
      </footer>
    </>
  );
}
