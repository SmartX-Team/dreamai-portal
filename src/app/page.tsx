"use client";

import { useEffect, useState } from "react";
import dreamData from "@/data/dream-ai.json";
import Image from "next/image";
import Link from "next/link";

type LinkCard = {
  title: string;
  imageUrl?: string;
  linkText: string;
  url: string;
};

type BigCardData = {
  sectionLabel: string;
  title: string;
  buttonText: string;
  buttonUrl: string;
  bgColor: string;
  imageUrl: string;
  features: string[];
};

type SideCardData = {
  title: string;
  buttonText: string;
  buttonUrl: string;
  imageUrl: string;
  bgColor: string;
};

function getYoutubeEmbedUrl(url: string) {
  if (!url) return "";

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsed.pathname.replace("/", "")}`;
    }

    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    return url;
  } catch {
    return url;
  }
}

function isExternalUrl(url?: string) {
  return !!url && url.startsWith("http");
}

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);

  const heroSlides = dreamData.hero.slides;
  const currentVideo = dreamData.videos[videoIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setVideoIndex((prev) =>
        prev === dreamData.videos.length - 1 ? 0 : prev + 1
      );
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  const bigCardHover =
    "transition-all duration-300 hover:-translate-y-[4px] hover:shadow-[0px_8px_24px_rgba(0,0,0,0.16)]";
  const smallCardHover =
    "transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0px_8px_20px_rgba(0,0,0,0.12)]";

  const handlePrevHero = () => {
    setHeroIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNextHero = () => {
    setHeroIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const handlePrevVideo = () => {
    setVideoIndex((prev) =>
      prev === 0 ? dreamData.videos.length - 1 : prev - 1
    );
  };

  const handleNextVideo = () => {
    setVideoIndex((prev) =>
      prev === dreamData.videos.length - 1 ? 0 : prev + 1
    );
  };

  const renderLinkWrapper = (
    url: string,
    children: React.ReactNode,
    key?: string | number,
    className = "cursor-pointer"
  ) => {
    if (isExternalUrl(url)) {
      return (
        <Link
          key={key}
          href={url}
          target="_blank"
          rel="noreferrer"
          className={className}
        >
          {children}
        </Link>
      );
    }

    return (
      <Link key={key} href={url} className={className}>
        {children}
      </Link>
    );
  };

  const renderBigCard = (card: BigCardData) => (
    <article className="w-[695px]">
      <div className="h-[50px] flex items-center">
        <h2 className="text-[32px] font-medium text-[#0f0f0f]">
          {card.sectionLabel}
        </h2>
      </div>

      <div
        className={`w-[695px] h-[550px] rounded-3xl overflow-hidden ${bigCardHover}`}
        style={{ backgroundColor: card.bgColor }}
      >
        <div className="flex w-full h-full items-center">
          <div className="flex flex-col w-[363px] h-full items-start justify-end gap-3 pl-10 py-10">
            <p className="text-base font-medium text-white leading-[25px]">
              {card.features.map((feature, index) => (
                <span key={index}>
                  {feature}
                  {index < card.features.length - 1 && <br />}
                </span>
              ))}
            </p>

            <h3 className="text-[45px] font-extrabold text-white leading-[1.25] whitespace-pre-line break-keep">
              {card.title}
            </h3>

            <Link
              href={card.buttonUrl}
              className="inline-flex items-center justify-center px-[15px] py-2.5 rounded-[999px] bg-white cursor-pointer mt-3"
            >
              <span className="text-xl font-semibold text-[#0f0f0f] whitespace-nowrap">
                {card.buttonText}
              </span>
            </Link>
          </div>

          <div className="relative w-[332px] h-full p-5 flex items-center">
            <div className="relative w-full h-[306px]">
              <Image
                src={card.imageUrl}
                alt={card.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );

  const renderTopBigCard = (card: BigCardData) => (
    <article className="w-[695px]">
      <div className="h-[50px] flex items-center">
        <h2 className="text-[32px] font-medium text-[#0f0f0f]">
          {card.sectionLabel}
        </h2>
      </div>

      <div
        className={`w-[695px] h-[450px] rounded-3xl overflow-hidden ${bigCardHover}`}
        style={{ backgroundColor: card.bgColor }}
      >
        <div className="flex w-full h-full items-center">
          <div className="flex flex-col w-[363px] h-full items-start justify-end gap-3 pl-10 py-10">
            <p className="text-base font-medium text-white leading-[25px]">
              {card.features.map((feature, index) => (
                <span key={index}>
                  {feature}
                  {index < card.features.length - 1 && <br />}
                </span>
              ))}
            </p>

            <h3 className="text-[45px] font-extrabold text-white leading-[1.25] whitespace-pre-line break-keep">
              {card.title}
            </h3>

            <Link
              href={card.buttonUrl}
              className="inline-flex items-center justify-center px-[15px] py-2.5 rounded-[999px] bg-white cursor-pointer mt-3"
            >
              <span className="text-xl font-semibold text-[#0f0f0f] whitespace-nowrap">
                {card.buttonText}
              </span>
            </Link>
          </div>

          <div className="relative w-[332px] h-full p-5 flex items-center">
            <div className="relative w-full h-[306px]">
              <Image
                src={card.imageUrl}
                alt={card.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );

  const renderSideCard = (card: SideCardData, key: number) => {
    const inner = (
      <article
        className={`w-[695px] h-[200px] rounded-3xl overflow-hidden ${bigCardHover}`}
      >
        <div
          className="w-full h-full rounded-3xl"
          style={{ backgroundColor: card.bgColor }}
        >
          <div className="flex w-full h-full items-start">
            <div className="flex flex-col w-[470px] h-full items-start justify-between p-10">
              <h3 className="text-[35px] font-extrabold text-white leading-none break-keep">
                {card.title}
              </h3>

              <div className="inline-flex items-center justify-center px-[15px] py-2.5 rounded-[999px] bg-white">
                <span className="text-xl font-semibold text-[#0f0f0f] whitespace-nowrap">
                  {card.buttonText}
                </span>
              </div>
            </div>

            <div className="relative w-[225px] h-full p-5 flex items-center justify-center">
              <div className="relative w-36 h-[120px]">
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    );

    return renderLinkWrapper(card.buttonUrl, inner, key);
  };

  const renderSmallLinkCard = (card: LinkCard, idx: number) => {
    const cardInner = (
      <article
        className={`w-[150px] h-[150px] rounded-[24px] bg-white shadow-[0px_2px_10px_rgba(134,134,134,0.25)] border border-[#efefef] overflow-hidden ${smallCardHover}`}
      >
        <div className="flex flex-col items-center justify-between h-full px-[10px] py-[10px]">
          <h4 className="text-[20px] font-medium text-[#4a4a4a] leading-none whitespace-nowrap mt-1">
            {card.title}
          </h4>

          {card.imageUrl ? (
            <div className="relative w-[110px] h-[50px]">
              <Image
                src={card.imageUrl}
                alt={card.title}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-[110px] h-[50px]" />
          )}

          <div className="flex items-center justify-end gap-1 w-full text-[14px] text-[#4a4a4a] leading-none mb-1">
            <span>{card.linkText}</span>
            <span>›</span>
          </div>
        </div>
      </article>
    );

    return renderLinkWrapper(card.url, cardInner, `${card.title}-${idx}`);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative w-full h-[700px] overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${heroIndex * 100}%)` }}
        >
          {heroSlides.map((slide, index) => (
            <div key={index} className="relative w-full h-full flex-shrink-0">
              {slide.url ? (
                <Link
                  href={slide.url}
                  target={isExternalUrl(slide.url) ? "_blank" : undefined}
                  rel={isExternalUrl(slide.url) ? "noreferrer" : undefined}
                  className="block w-full h-full"
                >
                  <Image
                    src={slide.imageUrl}
                    alt={`${dreamData.hero.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </Link>
              ) : (
                <Image
                  src={slide.imageUrl}
                  alt={`${dreamData.hero.name} ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handlePrevHero}
          className="absolute left-[96px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-white/50 text-white text-2xl flex items-center justify-center transition-all duration-200 hover:bg-white/15 cursor-pointer"
          aria-label="이전 슬라이드"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={handleNextHero}
          className="absolute right-[96px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-white/50 text-white text-2xl flex items-center justify-center transition-all duration-200 hover:bg-white/15 cursor-pointer"
          aria-label="다음 슬라이드"
        >
          ›
        </button>

        <div className="absolute left-1/2 bottom-10 -translate-x-1/2 inline-flex items-center justify-center gap-2.5 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setHeroIndex(index)}
              className={`h-2.5 rounded-[999px] cursor-pointer ${
                index === heroIndex ? "w-[26px] bg-white" : "w-2.5 bg-[#ffffff66]"
              }`}
              aria-label={`슬라이드 ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* MENU */}
      <section className="w-full bg-[#f5f5f5] px-60 py-[50px]">
        <div className="w-[1440px] mx-auto flex flex-col items-start">
          <header className="flex h-[100px] items-center self-stretch">
            <h1 className="font-semibold text-5xl leading-[64.8px] text-[#0f0f0f]">
              {dreamData.menuSection.title}
            </h1>
          </header>

          <div className="flex flex-col w-[1440px] items-start gap-[50px]">
            <div className="flex items-end gap-[50px] w-full">
              {renderTopBigCard(dreamData.menuSection.topLeftCard)}
              <div className="flex flex-col w-[695px] h-[450px] justify-between">
                {dreamData.menuSection.topRightCards.map(renderSideCard)}
              </div>
            </div>

            <div className="flex w-full items-start gap-[50px]">
              {renderBigCard(dreamData.menuSection.bottomLeftCard)}

              <div className="flex w-[695px] items-start gap-[42px]">
                <article className="w-[300px]">
                  <div className="h-[50px] flex items-center">
                    <h2 className="text-[32px] font-medium text-[#0f0f0f]">
                      {dreamData.menuSection.newSac.sectionLabel}
                    </h2>
                  </div>

                  <div
                    className={`relative w-[300px] h-[550px] rounded-3xl overflow-hidden bg-cover bg-center ${bigCardHover}`}
                    style={{
                      backgroundImage: `url(${dreamData.menuSection.newSac.bgImageUrl})`
                    }}
                  >
                    <div className="flex flex-col w-full h-full items-start gap-5 px-[25px] py-5">
                      <div className="relative w-[200px] h-[61px]">
                        <Image
                          src={dreamData.menuSection.newSac.titleImageUrl}
                          alt="디지털새싹 로고"
                          fill
                          className="object-contain object-left"
                        />
                      </div>

                      <p className="text-[15px] font-medium text-[#532c11] leading-[22px] break-keep">
                        {dreamData.menuSection.newSac.features.map(
                          (feature, index) => (
                            <span key={index}>
                              {feature}
                              {index <
                                dreamData.menuSection.newSac.features.length - 1 && <br />}
                            </span>
                          )
                        )}
                      </p>

                      <Link
                        href={dreamData.menuSection.newSac.buttonUrl}
                        className="inline-flex items-center justify-center px-[15px] py-2.5 rounded-[999px] bg-[#532d11] cursor-pointer"
                      >
                        <span className="text-xl font-semibold text-white whitespace-nowrap">
                          {dreamData.menuSection.newSac.buttonText}
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>

                <div className="flex gap-[26px] items-start">
                  <nav className="flex flex-col w-[150px] h-[600px]">
                    <div className="h-[50px] flex items-start">
                      <h2 className="text-[32px] font-medium text-[#4a4a4a] leading-none">
                        SCENT
                      </h2>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      {dreamData.menuSection.smallCardsColumn1.map(
                        renderSmallLinkCard
                      )}
                    </div>
                  </nav>

                  <nav className="flex flex-col w-[150px] h-[600px]">
                    <div className="h-[50px]" />
                    <div className="flex-1 flex flex-col justify-between">
                      {dreamData.menuSection.smallCardsColumn2.map(
                        renderSmallLinkCard
                      )}
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training banner */}
      <section className="w-full bg-[#f5f5f5] px-60 py-[50px]">
        <div className="w-[1440px] mx-auto">
          <article
            className={`flex w-[1440px] h-[360px] items-center relative bg-white rounded-3xl overflow-hidden shadow-[0px_2px_10px_#86868640] ${bigCardHover}`}
          >
            <div className="flex flex-col w-[1050px] h-[360px] items-start justify-between p-10">
              <header className="inline-flex flex-col items-start gap-2.5">
                <h3 className="text-2xl font-medium text-[#0f0f0f]">
                  {dreamData.adBanner.subTitle}
                </h3>

                <h2 className="text-[40px] font-bold text-[#075f9a] whitespace-pre-line break-keep leading-[1.15]">
                  {dreamData.adBanner.mainTitle}
                </h2>

                <p className="w-[360px] text-xl text-[#505050]">
                  {dreamData.adBanner.schedule}
                </p>
              </header>

              <Link
                href={dreamData.adBanner.buttonUrl}
                className="inline-flex items-center justify-center px-[15px] py-2.5 rounded-[999px] bg-[#0f0f0f] cursor-pointer"
              >
                <span className="text-xl font-semibold text-white whitespace-nowrap">
                  {dreamData.adBanner.buttonText}
                </span>
              </Link>
            </div>

            <div className="relative w-[390px] h-[360px]" aria-hidden="true">
              <div className="absolute top-[calc(50%_-_125px)] left-[calc(50%_-_125px)] w-[250px] h-[250px]">
                <Image
                  src={dreamData.adBanner.imageUrl}
                  alt="훈련 배너 일러스트"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Schedule + Video */}
      <section className="w-full bg-[#f5f5f5] px-60 py-[50px]">
        <div className="w-[1440px] mx-auto">
          <div className="flex w-[1440px] h-[500px] items-start gap-[50px]">
            <div className="flex w-[695px] h-[500px] items-start gap-2.5">
              <div className="flex flex-col w-60 h-[500px] items-start">
                <div className="flex flex-col items-start gap-2.5">
                  <h2 className="text-5xl font-semibold text-[#0f0f0f]">
                    {dreamData.scheduleVideoSection.schedule.title}
                  </h2>
                  <p className="text-base text-[#505050] leading-[22px] whitespace-pre-line break-keep">
                    {dreamData.scheduleVideoSection.schedule.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-col items-start gap-4 w-full">
                  <div className="pl-3 border-l-[3px] border-[#f15a24]">
                    <div className="text-base text-[#0f0f0f] leading-[1.35] break-keep">
                      {dreamData.scheduleVideoSection.schedule.date}
                      <br />
                      {dreamData.scheduleVideoSection.schedule.program}
                    </div>
                  </div>

                  <Link
                    href={dreamData.scheduleVideoSection.schedule.buttonUrl}
                    className="inline-flex items-center justify-center px-[15px] py-2.5 rounded-[999px] bg-black mt-6 cursor-pointer transition-all duration-200 hover:bg-[#222]"
                  >
                    <span className="text-white text-base font-semibold whitespace-nowrap">
                      {dreamData.scheduleVideoSection.schedule.buttonText}
                    </span>
                  </Link>
                </div>
              </div>

              <div className="relative w-[445px] h-[500px]">
                <div className="absolute top-[calc(50%_-_250px)] left-[calc(50%_-_214px)] w-[427px] h-[500px]">
                  <Image
                    src={dreamData.scheduleVideoSection.schedule.imageUrl}
                    alt="Schedule month"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col w-[695px] h-[500px] items-start justify-between">
              <div className="relative w-[695px] h-[58px]">
                <div className="absolute top-0 left-0 w-60 h-[58px] flex items-center text-5xl font-semibold text-black">
                  {dreamData.scheduleVideoSection.promoTitle}
                </div>
              </div>

              <div className="relative w-[695px] h-[420px] bg-[#383838] rounded-3xl overflow-hidden">
                <iframe
                  src={getYoutubeEmbedUrl(currentVideo.url)}
                  title={currentVideo.name}
                  className="absolute top-0 left-0 w-full h-full"
                  allowFullScreen
                />

                <button
                  type="button"
                  onClick={handlePrevVideo}
                  className="absolute left-[30px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-white/40 text-white text-2xl flex items-center justify-center transition-all duration-200 hover:bg-white/15 cursor-pointer"
                  aria-label="이전 영상"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={handleNextVideo}
                  className="absolute right-[30px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-white/40 text-white text-2xl flex items-center justify-center transition-all duration-200 hover:bg-white/15 cursor-pointer"
                  aria-label="다음 영상"
                >
                  ›
                </button>

                <div className="absolute left-1/2 bottom-[23px] -translate-x-1/2 inline-flex items-center justify-center gap-2.5 z-10">
                  {dreamData.videos.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setVideoIndex(index)}
                      className={`h-2.5 rounded-[999px] cursor-pointer ${
                        index === videoIndex ? "w-[26px] bg-white" : "w-2.5 bg-[#ffffff66]"
                      }`}
                      aria-label={`홍보 영상 ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#0f0f0f] px-2.5 py-[50px] relative">
        <div className="w-[1440px] h-[100px] mx-auto relative">
          <p className="absolute top-[calc(50%_-_50px)] left-0 w-[1440px] h-[100px] text-xl font-normal text-white text-center leading-[normal]">
            {dreamData.footer.copyright}
            <br />
            {dreamData.footer.businessInfo}
          </p>
        </div>

        {dreamData.footer.trailing.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="absolute right-10 bottom-8 text-right underline text-zinc-300 hover:text-white transition-colors duration-200"
          >
            {item.title}
          </a>
        ))}
      </footer>
    </>
  );
}