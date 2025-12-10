import trainingData from "./dream_ai_training.json";
import TrainingCheckinSection from "./TrainingCheckinSection";

// 간단한 타입 정의
interface Section {
  title: string;
  imageUrl?: string | string[];
  content?: string;
  subtitle?: string;
  item?: Array<{ main: string; sub: string }>;
  ppt_imageUrl?: string[];
}

export default function TrainingPage() {
  const checkin = trainingData.sections[0] as Section;
  const roadmapSection = trainingData.sections[1] as Section;
  const certificationSection = trainingData.sections[2] as Section;
  const section = trainingData.sections[3] as Section;
  const yearSection = trainingData.sections[4] as Section;
  const pptSection = trainingData.sections[5] as Section;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-center mb-[30px]">
        <img
          src={trainingData.titleimg}
          alt={trainingData.title}
          className="w-full max-w-[200px] h-auto"
          style={{ objectFit: "contain" }}
        />
      </div>
      <h1 className="text-[18px] text-gray-500 text-right font-semibold mb-4">
        {trainingData.email}
      </h1>
      <hr className="my-4 border-t border-gray-300" />
      <h1 className="text-xl font-bold mb-[100px] max-w-7xl mx-auto text-justify leading-relaxed">
        {trainingData.explain}
      </h1>

      {/* 훈련 신청 - 새 컴포넌트로 교체! */}
      <TrainingCheckinSection data={checkin} />
      
      {/* 훈련 로드맵 */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mt-[150px] pl-4 border-l-4 border-blue-500">
          {roadmapSection.title}
        </h2>
        <div className="flex justify-center mb-[30px]">
          <img
            src={roadmapSection.imageUrl?.toString()}
            className="w-full max-w-5xl object-contain mx-auto mb-16 mt-10"
          />
        </div>
      </div>

      {/* 훈련 인증 */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mt-[150px] pl-4 border-l-4 border-blue-500">
          {certificationSection.title}
        </h2>
        <div className="flex justify-center mb-[30px]">
          <img
            src={certificationSection.imageUrl?.toString()}
            className="w-full max-w-5xl object-contain mx-auto mb-16 mt-10"
          />
        </div>
      </div>

      {/* 훈련 유형 섹션 */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mt-[150px] mb-6 pl-4 border-l-4 border-blue-500">
          {section.title}
        </h2>
        {section.imageUrl && (
          <img
            src={section.imageUrl.toString()}
            alt="훈련 유형 이미지"
            className="w-full max-w-5xl object-contain mx-auto mb-16 mt-10"
          />
        )}
        <div className="grid gap-6">
          {Array.isArray(section.item) &&
            section.item.map((item, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-semibold">{item.main}</h3>
                <p className="text-gray-600">{item.sub}</p>
              </div>
            ))}
        </div>
      </div>

      {/* 연도별 진행 내역 */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mt-[200px] mb-6 pl-4 border-l-4 border-blue-500">
          {yearSection.title}
        </h2>
        <div className="flex flex-col gap-10">
          {Array.isArray(yearSection.imageUrl) && yearSection.imageUrl.map((url, idx) => (
            <div key={idx} className="flex justify-center">
              <img
                src={url}
                alt={`연도별 내역 ${idx + 1}`}
                className="w-full max-w-5xl object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* PPT 이미지 시퀀스 섹션 */}
      {pptSection.ppt_imageUrl && pptSection.ppt_imageUrl.length > 0 && (
        <div>
          <div className="pl-4 border-l-4 border-blue-500 mt-[200px] mb-8">
            <h2 className="text-3xl font-bold mt-[200px] mb-2 ">
              {pptSection.title}
            </h2>
            <h3 className="text-lg text-gray-600 mb-8">
              {pptSection.subtitle}
            </h3>
          </div>

          <div className="flex flex-col">
            {pptSection.ppt_imageUrl.map((url, idx) => (
              <div key={idx} className="flex justify-center">
                <img
                  src={url}
                  alt={`PPT Slide ${idx + 1}`}
                  className="w-full max-w-5xl object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}