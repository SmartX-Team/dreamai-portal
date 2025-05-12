"use client";

import dreamData from "@/data/dream-ai.json";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      {/* 기존 레이아웃에서 children 자리에 들어갈 내용 */}
      <section className="bg-white py-10 border-b">
        {dreamData.hero.imageUrl && (
          <div className="w-full mb-12">
            <Image
              src={dreamData.hero.imageUrl}
              alt={dreamData.hero.name}
              width={1920}
              height={1080}
            />
          </div>
        )}

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          {dreamData.catalog.categories.map((category) => (
            <div key={category.name}>
              <h2 className="text-lg font-bold mb-2">{category.title}</h2>
              <ul className="text-sm text-gray-700 space-y-1">
                {category.items?.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.url}
                      target={
                        item.url.startsWith("http") ? "_blank" : undefined
                      }
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
