import Image from "next/image";

export default function BeginnerAIPage() {
  const data = {
    title: "Beginner-AI",
    sloganLine1:
      "Beginner-AI Cluster는 인공지능 기술을 실습하고 소규모로 개발하는 초보자용 AI 컴퓨팅 인프라 자원을 AI융합학과 슈퍼컴퓨팅센터가 협업하여 지원하는 클러스터입니다.",
    image: { src: "/images/beginnerai/beginnerai.png", alt: "Beginner-AI 구조도" },
    pod: {
      title: "BeginnerAI",
      description:
        "AI 입문자를 위한 경량 클러스터 환경으로, 개인별 자원 할당 및 GPU 실습을 지원합니다.",
      partner: "AI 융합학과, 슈퍼컴퓨팅센터",
      color: "blue",
    },
    info: {
      iconSrc: "/images/beginnerai/ai.png",
      title: "Beginner-AI",
      detail:
        "GIST 내 AI/SW 교육 목적의 초심자를 위한 88개의 NVIDIA RTX 2080Ti가 장착된 GPU 클러스터",
    },
    manualLink:
      "https://drive.google.com/file/d/1E9PDbZLl5QbL0ut0c-yXy4g0q6OQp1k5/view?usp=drive_link",
    accessUrl: "http://172.25.161.250:10080", // 내부망 주소(프로토콜 포함)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 text-center">
            {data.title}
          </h1>

          {/* 한 줄 중앙 정렬(데스크톱), 모바일은 자동 줄바꿈 */}
          <div className="mt-2 flex justify-center">
            <p className="text-lg font-medium text-blue-700 whitespace-normal md:whitespace-nowrap text-center">
              {data.sloganLine1}
            </p>
          </div>
        </header>

        {/* 구조도 이미지 */}
        <div className="flex justify-center mb-3">
          <Image
            src={data.image.src}
            alt={data.image.alt}
            width={800}
            height={450}
            className="rounded-lg shadow-md w-full max-w-[800px] h-auto"
            priority
          />
        </div>

        {/* 중앙 정렬된 Beginner-AI 문단 */}
        <div className="text-sm text-gray-800 leading-relaxed text-center mb-10">
          <p>{data.info.detail}</p>
        </div>

        {/* 카드 */}
        <div className="flex justify-center">
          <div className="max-w-sm w-full bg-white rounded-xl shadow-md border-t-4 border-blue-500 p-6 text-center">
            {/* 아이콘 + 제목 + 버튼 */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
              <Image src={data.info.iconSrc} alt="brain icon" width={24} height={24} />
              <h2 className="text-xl font-semibold text-gray-900">
                {data.pod.title}
              </h2>
              <a
                href={data.manualLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-2 py-1 border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition text-sm"
              >
                Beginner-AI 메뉴얼
              </a>
            </div>

            {/* 설명 */}
            <p className="text-sm text-gray-700 mb-4">{data.pod.description}</p>

            {/* 접속 링크 버튼 */}
            <a
              href={data.accessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Beginner-AI 접속하기
            </a>

            {/* 협업 + 안내문 */}
            <div className="text-xs text-gray-500 mt-4 space-y-1">
              <p>(협업: {data.pod.partner})</p>
              <p>※ GIST 내부망을 통해서만 접속 가능합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}