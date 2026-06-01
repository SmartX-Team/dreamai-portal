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

type ReservationButton = {
  name: string;
  title: string;
  titleUrl: string;
  buttonText: string;
  reservationUrl: string;
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

  const reservationButtons =
    ((dreamData as { reservationButtons?: ReservationButton[] })
      .reservationButtons ?? []);

  // 좌측 버튼 그룹
  const leftGroups = [
    dreamData.catalog.categoriesLeft.slice(0, 3), // Content, LMS, Textbook
    dreamData.catalog.categoriesLeft.slice(3, 5), // Community, AI Ambassador
    dreamData.catalog.categoriesLeft.slice(5, 8), // Training, NewSac, CrossTraining
  ];

  // 우측 버튼 그룹
  const rightGroups = [
    dreamData.catalog.categoriesRight.slice(0, 1), // AIGS
    dreamData.catalog.categoriesRight.slice(1, 2), // ScaleX
    dreamData.catalog.categoriesRight.slice(2, 5), // Beginner-AI, SCENT, Dream-AI
  ];

  // 좌우 메뉴 전체 높이
  const sideColumnClass =
    "flex h-[800px] flex-col items-center justify-between";

  // 그룹 내부는 버튼끼리 붙게
  const groupClass = "flex flex-col items-center gap-0";

  function drawItem(item: Item, idx: number) {
    const width = "w-40";
    let height;

    switch (item.height ?? "lg") {
      case "sm":
        height = "h-[60px]";
        break;
      case "md":
        height = "h-[140px]";
        break;
      case "lg":
      default:
        height = "h-[200px]";
        break;
    }

    let element;

    if (item.imageUrl) {
      element = (
        <div key={idx} className={`relative ${width} ${height}`}>
          <Image src={item.imageUrl} alt={item.title ?? item.name} fill />
        </div>
      );
    } else if (item.title) {
      element = (
        <div
          key={idx}
          className={`bg-blue-100 p-4 rounded shadow text-center ${width} ${height}`}
        >
          <div className="text-sm font-bold">{item.title}</div>
        </div>
      );
    } else {
      element = <div key={idx} />;
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

  function drawGroup(group: Item[], groupIdx: number) {
    return (
      <div key={groupIdx} className={groupClass}>
        {group.map(drawItem)}
      </div>
    );
  }

  function drawReservationButton(item: ReservationButton, idx: number) {
    return (
      <div
        key={idx}
        className="relative h-[92px] w-full transition-transform duration-200 ease-out hover:-translate-y-1"
      >
        {/* 흰색 카드 전체: SPACE / ANNEX 버튼 */}
        <Link
          href={item.titleUrl}
          target={item.titleUrl.startsWith("http") ? "_blank" : undefined}
          aria-label={`${item.title} 페이지로 이동`}
          className="absolute inset-0 rounded-[10px] border border-[#E5E7EB] bg-white shadow-[0_3px_10px_rgba(0,0,0,0.06)] transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
        />

        {/* 카드 위 내용 */}
        <div className="pointer-events-none relative z-10 flex h-full w-full items-center justify-between px-7">
          <span className="text-[22px] font-bold tracking-wide text-[#2F3437]">
            {item.title}
          </span>

          {/* 오른쪽 예약하기 버튼 */}
          <Link
            href={item.reservationUrl}
            target={
              item.reservationUrl.startsWith("http") ? "_blank" : undefined
            }
            className="pointer-events-auto flex h-[42px] items-center justify-center rounded-[8px] border border-[#D8E3F2] bg-[#EEF4FB] px-6 text-[14px] font-semibold text-[#3B3F44] transition-colors hover:bg-[#E3EDF8]"
          >
            {item.buttonText}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 상단 중앙 HeroImage */}
      <section className="flex w-full justify-center py-8">
        <div className="w-full max-w-[500px]">
          {dreamData.hero.imageUrl && heroElement}
        </div>
      </section>

      {/* 메인 콘텐츠 영역 */}
      <section className="bg-white pt-10">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_4fr_1fr]">
          {/* 좌측 */}
          <div className={sideColumnClass}>
            {leftGroups.map(drawGroup)}
          </div>

          {/* 중앙 */}
          <div className="flex h-[800px] w-full flex-col items-center px-4 pt-4">
            {/* 비디오 제목 */}
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
              {dreamData.video.name}
            </h2>

            {/* 유튜브 영상 */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${
                  dreamData.video.url.split("/").pop()?.split("?")[0]
                }`}
                title={dreamData.video.name}
                className="absolute left-0 top-0 h-full w-full"
                allowFullScreen
              />
            </div>

            {/* SPACE / ANNEX 버튼 영역 */}
            <div className="mt-auto grid w-full grid-cols-2 gap-10">
              {reservationButtons.map(drawReservationButton)}
            </div>
          </div>

          {/* 우측 */}
          <div className={sideColumnClass}>
            {rightGroups.map(drawGroup)}
          </div>
        </div>
      </section>

      {/* AD 배너 */}
      <section className="mb-32 mt-20 bg-white">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-4 md:grid-cols-[1fr_4fr_1fr]">
          {/* 중앙 영상/SPACE/ANNEX 영역과 동일한 가로폭으로 맞춤 */}
          <div className="w-full px-4 md:col-start-2">
            <div
              className="relative flex w-full items-center overflow-hidden rounded-[10px] border border-[#E5E7EB] bg-[#E1EBF4] shadow-[0_3px_10px_rgba(0,0,0,0.06)]"
              style={{
                aspectRatio: "14 / 2.6",
                containerType: "inline-size",
              }}
            >
              {/* 왼쪽 텍스트 영역 */}
              <div className="z-10 flex h-full w-[58%] flex-col items-start justify-center whitespace-nowrap pl-[8%]">
                <div style={{ color: "#000000", fontSize: "1.55cqw" }}>
                  {dreamData.adBanner.subTitle}
                </div>

                <div
                  style={{
                    color: "#075F9A",
                    fontSize: "2.45cqw",
                    fontWeight: "bold",
                  }}
                  className="my-[0.25cqw] leading-none"
                >
                  {dreamData.adBanner.mainTitle}
                </div>

                <div
                  style={{ color: "#4B5563", fontSize: "1.25cqw" }}
                  className="mb-[1.3cqw]"
                >
                  {dreamData.adBanner.schedule}
                </div>

                <Link
                  href={dreamData.adBanner.buttonUrl}
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#000000",
                    fontSize: "1cqw",
                  }}
                  className="inline-block rounded-[8px] border border-gray-200 px-[2.8cqw] py-[0.55cqw] font-medium shadow-sm transition-all hover:bg-gray-50"
                >
                  {dreamData.adBanner.buttonText}
                </Link>
              </div>

              {/* 오른쪽 이미지 영역 */}
              <div className="absolute right-0 top-0 flex h-full w-[42%] items-center justify-end pr-[4%]">
                <div className="relative h-[88%] w-full">
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
          </div>
        </div>
      </section>

      <footer className="relative w-full bg-zinc-900 py-8 text-2xl text-zinc-300">
        <div className="mx-auto max-w-screen-xl px-4 text-center">
          <div className="leading-none">{dreamData.footer.copyright}</div>
          <div className="text-xl leading-none">
            <br />
            {dreamData.footer.businessInfo}
          </div>
        </div>

        {dreamData.footer.trailing.map((item, idx) => {
          return (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              className="absolute bottom-8 right-10 text-right leading-none underline transition-colors duration-200 hover:text-white"
            >
              {item.title}
            </a>
          );
        })}
      </footer>
    </>
  );
}