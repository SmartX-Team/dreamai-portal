"use client";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function NewSacPage() {
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
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          <img
            src="/images/newsac/디지털새싹로고.png"
            alt="디지털새싹 로고"
            className="h-20"
          />
        </div>
      </div>

      {/* 프로그램 소개 */}
      <section className="mb-16">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🌱</span>
            <h2 className="text-xl font-bold text-black">프로그램 소개</h2>
          </div>
          <div className="w-full h-[2px] bg-green-600" />
        </div>
        <p className="text-gray-600 leading-relaxed">
          광주과학기술원(GIST)의 AI 인프라와 전문가 인력을 활용하여 AI·데이터
          기술을 실습과 프로젝트 중심으로 학습하는 고도화 체험형 프로그램입니다.
          디지털 트윈, 생성형 AI, 강화학습 등 최신 기술을 기반으로 이론부터
          실습, 프로젝트, 진로탐색까지 경험할 수 있도록 구성되었습니다. GIST AI
          인프라 체험, 교수진 멘토링, 스마트시티 설계 활동 등을 통해 실전 중심의
          교육을 제공합니다.
        </p>
      </section>

      {/* 홍보영상 */}
      {/* <section className="mb-16">
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
      </section> */}

      {/* 🔸 캠프 추억 영상 (유튜브 + mp4) */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🎞️</span>
          <h2 className="text-xl font-bold text-gray-700">
            GIST 꿈꾸는 아이(AI) 중·고등학생 AI 캠프 추억 영상
          </h2>
        </div>
        <div className="w-full h-[2px] bg-green-600 mb-2" />
        <p className="text-sm text-gray-500 mb-4 text-left">
          본 영상은 GIST에서 진행된 중·고등학생 AI 캠프의 현장 모습을 담은
          자료입니다.
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

      <section className="mb-16">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🎞️</span>
          <h2 className="text-xl font-bold text-gray-700">
            GIST 꿈꾸는 아이(AI) SPACE 설명 영상
          </h2>
        </div>
        <div className="w-full h-[2px] bg-green-600 mb-2" />
        <p className="text-sm text-gray-500 mb-4 text-left">
          본 영상은 GIST의 꿈꾸는 아이(AI) SPACE에 대한 설명 영상 입니다.
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

      {/* 캠프 안내 및 신청 */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          디지털 새싹 캠프 참가 및 안내사항
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          디지털 새싹 캠프에 참여를 희망하는 학생은 아래 신청하기 버튼을 눌러
          디지털 새싹 사이트에서 신청 바랍니다.
        </p>

        <ul className="text-gray-700 text-base mb-6">
          <h2>
            <li className="font-semibold">🌱 운영 기간 🌱</li>
            <li>📅 1차: 2025년 8월 4일(월) ~ 8월 5일(화)</li>
            <li>📅 2차: 2025년 8월 9일(토) ~ 8월 10일(일)</li>
            <li className="mt-2">※ 중학생은 보호자 동의 후 신청 바랍니다.</li>
            <li>※ 프로그램 내용은 변경될 수 있습니다.</li>
          </h2>
        </ul>

        <a
          href="https://newsac.kosac.re.kr/public/program/thumb/890?keyword=%EA%BF%88%EA%BE%B8%EB%8A%94"
          target="_blank"
          className="inline-block bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          📥 신청하기
        </a>
      </section>
    </main>
  );
}
