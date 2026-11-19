import { PageWidgets } from "@/lib/portal-content/page-widgets";
import { readPortalPage } from "@/lib/portal-content/server";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default async function NewSacPage() {
  const editableCopy = (await readPortalPage("/newsac")).content.display;
  const { content } = await readPortalPage("/newsac");
  // const videoList = [
  //   {
  //     title: "",
  //     src: "https://youtube.com/shorts/g1f03DBTA_k?si=ZvTBkPi6GiT355MY",
  //   },
  //   { title: "", src: "/videos/prof_kim.mp4" },
  //   { title: "", src: "images/digitalsprout/연구원홍보영상.mp4" },
  //   { title: "", src: "images/digitalsprout/학부모홍보영상.mp4" },
  //   { title: "", src: "/videos/student3.mp4" },
  //   { title: "", src: "/videos/student4.mp4" },
  // ];

  return (
    <main className="px-6 py-10 max-w-6xl mx-auto">
      {/*상단 로고 */}
      <PageWidgets zone="newsac.page" nodes={{
        logo: (
          <div className="flex flex-col items-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          <img
            src={content.logoImage}
            alt="디지털새싹 로고"
            className="h-20"
          />
        </div>
      </div>
        ),
        /* {content.introductionTitle} */
        intro: (
          <section className="mb-16">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🌱</span>
            <h2 className="text-xl font-bold text-black">{editableCopy["NewSacPage 문구 1"]}</h2>
          </div>
          <div className="w-full h-[2px] bg-green-600" />
        </div>
        <p className="text-gray-600 leading-relaxed">
          {content.introduction}
        </p>
      </section>
        ),
        /* 홍보영상 */
        /* <section className="mb-16">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🎬</span>
            <h2 className="text-xl font-bold text-black">
              {" "}
              2025 GIST 꿈꾸는 아이(AI){" "}
              <span className="text-green-600">디지털 새싹</span> 홍보영상
            </h2>
          </div>
          <div className="w-full h-[2px] bg-green-600" />
        </div>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {videoList.map((video, idx) => {
            let content;
            if (video.src.startsWith("https://")) {
              content = (
                <div className="w-full aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={video.src}
                    title="캠프 유튜브 영상"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              );
            } else {
              content = (
                <div className="aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded shadow-md">
                  <video controls className="w-full h-full object-cover">
                    <source src={video.src} type="video/mp4" />
                    브라우저가 비디오를 지원하지 않습니다.
                  </video>
                </div>
              );
            }

            return (
              <SwiperSlide key={idx} className="flex flex-col items-center">
                {content}
                <p className="mt-2 text-sm font-medium text-center">
                  {video.title}
                </p>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="custom-pagination mt-4 flex justify-center" />
      </section> */
        /* 🔸 캠프 추억 영상 (유튜브 + mp4) */
        memories: (
          <section className="mb-16">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🎞️</span>
          <h2 className="text-xl font-bold text-gray-700">
            {content.memoriesTitle}
          </h2>
        </div>
        <div className="w-full h-[2px] bg-green-600 mb-2" />
        <p className="text-sm text-gray-500 mb-4 text-left">
          {content.memories}
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {/* 영상 1 */}
          <div className="w-full aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/WxyQIMBamEU"
              title="캠프 유튜브 영상"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* 영상 2 */}
          <div className="w-full aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/ktMNV_0ph80"
              title="2024년도 중등영재캠프 (광주교육연구정보원 X 광주과학기술원 AI대학원)"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
        ),
        space: (
          <section className="mb-16">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🎞️</span>
          <h2 className="text-xl font-bold text-gray-700">
            {content.spaceTitle}
          </h2>
        </div>
        <div className="w-full h-[2px] bg-green-600 mb-2" />
        <p className="text-sm text-gray-500 mb-4 text-left">
          {content.space}
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {/* YouTube Embed */}
          <div className="w-full aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/BuSTJ4YOjXg"
              title="캠프 유튜브 영상"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
        ),
        /* 캠프 안내 및 신청 */
        registration: (
          <section className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
        <PageWidgets zone="newsac.registration" nodes={{
          title: (
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {content.registrationTitle}
            </h2>
          ),
          introduction: (
            <p className="text-lg text-gray-700 mb-6">
              {content.registration}
            </p>
          ),
          details: (
            <ul className="text-gray-700 text-base mb-6">
              <h2>
                <li className="font-semibold">{content.period}</li>
                <li>{content.firstDate}</li>
                <li>{content.secondDate}</li>
                <li className="mt-2">{content.firstNotice}</li>
                <li>{content.secondNotice}</li>
              </h2>
            </ul>
          ),
          button: (
            <a
              href={content.buttonUrl}
              target="_blank"
              className="inline-block bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              {content.buttonText}
            </a>
          ),
        }} />
      </section>
        ),
      }} />
    </main>
  );
}
