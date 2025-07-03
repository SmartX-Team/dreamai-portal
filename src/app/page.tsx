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

        {/* 아래 아이템 */}
        <div className="flex flex-col items-center pb-4">
          <Image
            src="/images/footer/textbook_info.png"
            alt="DreamAI 정보"
            width={800}
            height={1e6}
          />
        </div>
      </section>

      <footer className="relative bg-zinc-900 text-zinc-300 text-2xl py-8 w-full">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <div className="leading-none">{dreamData.footer.copyright}</div>
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
