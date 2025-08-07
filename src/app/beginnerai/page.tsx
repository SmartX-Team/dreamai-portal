import React from "react";

export default function BeginnerAIPage() {
  const data = {
    title: "Beginner-AI",
    sloganLine1: "Beginner-AI Cluster는 인공지능 기술을 실습하고,",
    sloganLine2:
      "소규모로 개발하는 초보자용 AI 컴퓨팅 인프라 자원을 지원하는 클러스터입니다.",
    image: {
      src: "/images/beginnerai/beginnerai.png",
      alt: "Beginnerai 구조도",
    },
    pod: {
      title: "BeginnerAI",
      description:
        "AI 입문자를 위한 경량 클러스터 환경으로, 개인별 자원 할당 및 GPU 실습을 지원합니다.",
      partner: "K-HighTech, NetAI-Lab, lablup",
      color: "blue",
    },
    info: {
      iconSrc: "/images/beginnerai/ai.png", // 업로드한 아이콘 경로
      title: "Beginner-AI",
      detail:
        "GIST 내 AI/SW 교육 목적의 초심자를 위한 88개의 NVIDIA RTX 2080Ti가 장착된 GPU 클러스터",
      link: "172.25.161.250:10080",
      note: "※ GIST 내부망을 통해서만 접속 가능합니다.",
    },
    manualLink:
      "https://drive.google.com/file/d/1E9PDbZLl5QbL0ut0c-yXy4g0q6OQp1k5/view?usp=drive_link",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
          <p className="mt-2 text-lg font-medium text-blue-700">
            "{data.sloganLine1}
            <br />
            {data.sloganLine2}"
          </p>
        </header>

        {/* 구조도 이미지 */}
        <div className="flex justify-center mb-6">
          <img
            src={data.image.src}
            alt={data.image.alt}
            className="rounded-lg shadow-md w-full max-w-[800px] h-auto"
          />
        </div>

        {/* 중앙 정렬된 Beginner-AI 문단 */}
        <div className="text-sm text-gray-800 leading-relaxed space-y-1 text-center mb-10">
          <p className="font-semibold flex items-center justify-center gap-1 text-pink-600">
            <img
              src={data.info.iconSrc}
              alt="brain icon"
              className="w-6 h-6"
            />
            {data.info.title}
          </p>
          <p>{data.info.detail}</p>
          <p>
            접속링크 :{" "}
            <span className="font-mono text-gray-700">{data.info.link}</span>
          </p>
          <p className="font-semibold text-gray-700">{data.info.note}</p>
        </div>

        {/* 카드 */}
        <div className="flex justify-center">
          <div className="max-w-sm w-full bg-white rounded-xl shadow-md border-t-4 border-blue-500 p-6 text-center">
            {/* 아이콘 + 제목 */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <img
                src={data.info.iconSrc}
                alt="brain icon"
                className="w-6 h-6"
              />
              <h2 className="text-xl font-semibold text-gray-900">
                {data.pod.title}
              </h2>
            </div>

            {/* 설명 */}
            <p className="text-sm text-gray-700 mb-4">{data.pod.description}</p>

            {/* 협업 */}
            <p className="text-xs text-gray-500 mb-6">
              (협업: {data.pod.partner})
            </p>

            {/* 버튼 */}
            <a
              href={data.manualLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition"
            >
              Beginner AI GPU서버 사용자 기초메뉴얼
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}