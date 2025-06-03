"use client";

import dreamData from "@/data/dream-ai.json";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const columns = 3;
  const rowCount = Math.ceil(dreamData.catalog.categories.length / columns);

  let heroElement = (
    <div className="mb-12">
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

  return (
    <>
      {/* 기존 레이아웃에서 children 자리에 들어갈 내용 */}
      <section className="bg-white py-10">
        {dreamData.hero.imageUrl && heroElement}

        <div className="grid grid-cols-1 md:grid-cols-3">
          {dreamData.catalog.categories.map((category, index) => {
            const row = Math.floor(index / columns);
            const isLastRow = row === rowCount - 1;
            const className = isLastRow
              ? "flex items-center justify-center pt-12"
              : "flex items-center justify-center pb-12 md:border-b md:border-black";

            return (
              <div key={category.name} className={className}>
                <Link
                  href={category.url}
                  target={
                    category.url.startsWith("http") ? "_blank" : undefined
                  }
                >
                  {category.imageUrl ? (
                    <div className="relative w-70 h-70">
                      <Image
                        src={category.imageUrl}
                        alt={category.title}
                        fill
                      />
                    </div>
                  ) : (
                    <h2 className="text-5xl text-center font-bold mb-2 select-none">
                      {category.title}
                    </h2>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
