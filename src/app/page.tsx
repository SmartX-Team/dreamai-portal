import { PageWidgets } from "@/lib/portal-content/page-widgets";
import { getZoneItems, widgetTarget, type WidgetZone } from "@/lib/portal-content/widgets";
import { readPortalPage } from "@/lib/portal-content/server";
import { portalFieldId } from "@/lib/portal-content/registry";
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
  subtitle: string;
  titleUrl: string;
  buttonText: string;
  reservationUrl: string;
};

export default async function HomePage() {
  const { content: dreamData } = await readPortalPage("/");
  let heroElement = (
    <div>
      <Image
        data-portal-field={portalFieldId("hero", "imageUrl")}
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

  const left = dreamData.catalog.categoriesLeft;
  const right = dreamData.catalog.categoriesRight;

  // 좌우 메뉴 전체 높이
  const sideColumnClass =
    "flex h-[800px] flex-col items-center justify-between";

  // 그룹 내부는 버튼끼리 붙게
  const groupClass = "flex flex-col items-center gap-0";

  function drawItem(item: Item, zone: WidgetZone, slot: string) {
    const target = widgetTarget(zone, slot);
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
        <div {...target} className={`relative ${width} ${height}`}>
          <Image src={item.imageUrl} alt={item.title ?? item.name} fill />
        </div>
      );
    } else if (item.title) {
      element = (
        <div
          {...target}
          className={`bg-blue-100 p-4 rounded shadow text-center ${width} ${height}`}
        >
          <div className="text-sm font-bold">{item.title}</div>
        </div>
      );
    } else {
      element = <div {...target} />;
    }

    if (item.url) {
      element = (
        <Link
          {...target}
          href={item.url}
          target={item.url.startsWith("http") ? "_blank" : undefined}
        >
          {element}
        </Link>
      );
    }

    return element;
  }

  function drawGroup(zone: WidgetZone, items: Item[], target?: ReturnType<typeof widgetTarget>) {
    return (
      <div {...target} className={groupClass}>
        <PageWidgets zone={zone} nodes={Object.fromEntries(getZoneItems(zone).map(([key], index) =>
          [key, drawItem(items[index], zone, key)]))} />
      </div>
    );
  }

  function drawReservationButton(item: ReservationButton, index: number, slot: string) {
    const centerLast = reservationButtons.length % 2 === 1 && index === reservationButtons.length - 1;
    const cardClasses = "relative h-[92px] w-full transition-transform duration-200 ease-out hover:-translate-y-1";
    return (
      <div {...widgetTarget("home.reservations", slot)} className={cardClasses + (centerLast ? " sm:col-span-2 sm:mx-auto sm:w-1/2" : "")}>
        <Link href={item.titleUrl} aria-label={item.title + " 페이지로 이동"}
          className="absolute inset-0 rounded-[10px] border border-[#E5E7EB] bg-white shadow-[0_3px_10px_rgba(0,0,0,0.06)] transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]" />
        <div className="pointer-events-none relative z-10 flex h-full w-full items-center justify-between gap-3 px-5 sm:px-7">
          <div className="min-w-0">
            <span className="block text-[20px] font-bold tracking-wide text-[#2F3437] sm:text-[22px]">{item.title}</span>
            <span className="mt-1 block truncate text-[12px] text-[#77818C] sm:text-[13px]">{item.subtitle}</span>
          </div>
          <Link href={item.reservationUrl} target="_blank"
            className="pointer-events-auto flex h-[42px] shrink-0 items-center justify-center rounded-[8px] border border-[#D8E3F2] bg-[#EEF4FB] px-4 text-[13px] font-semibold text-[#3B3F44] transition-colors hover:bg-[#E3EDF8] sm:px-6 sm:text-[14px]">
            {item.buttonText}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 상단 중앙 HeroImage */}
      <PageWidgets zone="home.page" nodes={{
        hero: (
          <section {...widgetTarget("home.page", "hero")} className="flex w-full justify-center py-8">
        <div className="w-full max-w-[500px]">
          {dreamData.hero.imageUrl && heroElement}
        </div>
      </section>
        ),
        /* 메인 콘텐츠 영역 */
        directory: (
          <section {...widgetTarget("home.page", "directory")} className="bg-white pt-10">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_4fr_1fr]">
          {/* 좌측 */}
          <PageWidgets zone="home.directory" nodes={{
            left: (
              <div {...widgetTarget("home.directory", "left")} className={sideColumnClass}>
            <PageWidgets zone="home.left" nodes={{
              training: drawGroup("home.left.training", left.slice(5), widgetTarget("home.left", "training")),
              resources: drawGroup("home.left.resources", left.slice(0, 3), widgetTarget("home.left", "resources")),
              community: drawGroup("home.left.community", left.slice(3, 5), widgetTarget("home.left", "community")),
            }} />
          </div>
            ),
            /* 중앙 */
            center: (
              <div {...widgetTarget("home.directory", "center")} className="flex h-[800px] w-full flex-col items-center px-4 pt-4">
            {/* 비디오 제목 */}
            <PageWidgets zone="home.center" nodes={{
              title: (
                <h2 {...widgetTarget("home.center", "title")} className="mb-6 text-center text-2xl font-bold text-gray-800">
                  {dreamData.video.name}
                </h2>
              ),
              /* 유튜브 영상 */
              video: (
                <div {...widgetTarget("home.center", "video")} className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${
                      dreamData.video.url.split("/").pop()?.split("?")[0]
                    }`}
                    title={dreamData.video.name}
                    className="absolute left-0 top-0 h-full w-full"
                    allowFullScreen
                  />
                </div>
              ),
              /* SPACE / ANNEX 버튼 영역 */
              reservations: (
                <div {...widgetTarget("home.center", "reservations")} className="mt-auto grid w-full grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
                  <PageWidgets zone="home.reservations" nodes={Object.fromEntries(getZoneItems("home.reservations").map(([slot], index) =>
                    [slot, drawReservationButton(reservationButtons[index], index, slot)]))} />
                </div>
              ),
            }} />
          </div>
            ),
            /* 우측 */
            right: (
              <div {...widgetTarget("home.directory", "right")} className={sideColumnClass}>
            <PageWidgets zone="home.right" nodes={{
              aigs: <div {...widgetTarget("home.right", "aigs")} className={groupClass}>{drawItem(right[0], "home.right", "aigs")}</div>,
              scalex: <div {...widgetTarget("home.right", "scalex")} className={groupClass}>{drawItem(right[1], "home.right", "scalex")}</div>,
              projects: drawGroup("home.right.projects", right.slice(2), widgetTarget("home.right", "projects")),
            }} />
          </div>
            ),
          }} />
        </div>
      </section>
        ),
        /* AD 배너 */
        promotion: (
          <section {...widgetTarget("home.page", "promotion")} className="mb-32 mt-20 bg-white">
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
              <PageWidgets zone="home.promotion" nodes={{
                text: (
                  <div {...widgetTarget("home.promotion", "text")} className="z-10 flex h-full w-[58%] flex-col items-start justify-center whitespace-nowrap pl-[8%]">
                <PageWidgets zone="home.promotion.copy" nodes={{
                  subheading: (
                    <div {...widgetTarget("home.promotion.copy", "subheading")} data-portal-field={portalFieldId("adBanner", "subTitle")} style={{ color: "#000000", fontSize: "1.55cqw" }}>
                      {dreamData.adBanner.subTitle}
                    </div>
                  ),
                  heading: (
                    <div {...widgetTarget("home.promotion.copy", "heading")}
                      data-portal-field={portalFieldId("adBanner", "mainTitle")}
                      style={{
                        color: "#075F9A",
                        fontSize: "2.45cqw",
                        fontWeight: "bold",
                      }}
                      className="my-[0.25cqw] leading-none"
                    >
                      {dreamData.adBanner.mainTitle}
                    </div>
                  ),
                  schedule: (
                    <div {...widgetTarget("home.promotion.copy", "schedule")}
                      data-portal-field={portalFieldId("adBanner", "schedule")}
                      style={{ color: "#4B5563", fontSize: "1.25cqw" }}
                      className="mb-[1.3cqw]"
                    >
                      {dreamData.adBanner.schedule}
                    </div>
                  ),
                  button: (
                    <Link {...widgetTarget("home.promotion.copy", "button")}
                      data-portal-field={portalFieldId("adBanner", "buttonText")}
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
                  ),
                }} />
              </div>
                ),
                /* 오른쪽 이미지 영역 */
                image: (
                  <div {...widgetTarget("home.promotion", "image")} className="absolute right-0 top-0 flex h-full w-[42%] items-center justify-end pr-[4%]">
                <div className="relative h-[88%] w-full">
                  <Image
                    data-portal-field={portalFieldId("adBanner", "imageUrl")}
                    src={dreamData.adBanner.imageUrl}
                    alt="AD Illustration"
                    fill
                    className="object-contain object-right"
                    priority
                  />
                </div>
              </div>
                ),
              }} />
            </div>
          </div>
        </div>
      </section>
        ),
        footer: (
          <footer {...widgetTarget("home.page", "footer")} className="relative w-full bg-zinc-900 py-8 text-2xl text-zinc-300">
        <PageWidgets zone="home.footer" nodes={{
          info: (
            <div {...widgetTarget("home.footer", "info")} className="mx-auto max-w-screen-xl px-4 text-center">
              <div className="leading-none">{dreamData.footer.copyright}</div>
              <div className="text-xl leading-none">
                <br />
                {dreamData.footer.businessInfo}
              </div>
            </div>
          ),
          links: (
            dreamData.footer.trailing.map((item, idx) => {
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
            })
          ),
        }} />
      </footer>
        ),
      }} />
    </>
  );
}
