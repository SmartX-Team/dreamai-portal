import trainingData from "./dream_ai_training.json";
import TrainingCheckinSection from "./TrainingCheckinSection";
import TrainingCoursesSection from "./TrainingCoursesSection";
import TrainingCertification from "./TrainingCertification";

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
const yearSection = trainingData.sections[4] as Section
// const certificationSection = trainingData.sections[2] as Section;
// const section = trainingData.sections[3] as Section;
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
      <h1 className="text-[18px] text-gray-500 text-right font-medium mb-4">
  {trainingData.email}
</h1>
<hr className="my-4 border-t border-gray-300" />
<p className="text-gray-700 leading-relaxed mb-8">
  {trainingData.explain}
</p>
      {/* 훈련 신청  */}
      <TrainingCheckinSection data={checkin} />
      <div className="h-8"></div> {/* 여백 추가  h-16 - 64px h-24 - 96px h-32 - 128px h-40 - 160px h-48 - 192px*/}
      {/* 훈련 과정 */}
      <TrainingCoursesSection />  
      {/* 훈련 인증 */}
      <TrainingCertification />

      {/* 훈련 유형 섹션 
      <div className="mb-20">
        <h2 className="text-2xl font-bold mt-[150px] mb-6 pl-4 ">
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
      </div>*/}

    {/* 연도별 진행 내역 */}
      {/* border, shadow 제거*/} 
      <div className="mb-20 bg-white rounded-3xl p-8 md:p-12 ]">
        <h2 className="text-3xl font-bold mb-10 pb-4 border-b border-gray-200 text-gray-900">
          {yearSection.title}
        </h2>
        
        <div className="flex flex-col">
          {Array.isArray(yearSection.imageUrl) && yearSection.imageUrl.map((url, idx) => (
            <div key={idx} className="flex justify-start"> 
              <img
                src={url}
                alt={`연도별 내역 ${idx + 1}`}
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 꿈꾸는 아이 Training ~ 2025 내역 */}
      {pptSection.ppt_imageUrl && pptSection.ppt_imageUrl.length > 0 && (
        <div className="mb-20 bg-white rounded-3xl p-8 md:p-12">
          <div className="mb-10 pb-4 border-b border-gray-200">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">
              {pptSection.title}
          </h2>
        </div>
    
      <div className="flex flex-col gap-64 ">
      {pptSection.ppt_imageUrl.map((url, idx) => (
        <div key={idx} className="flex justify-center ">
          <img
            src={url}
            alt={`PPT Slide ${idx + 1}`}
            className="w-full h-auto object-contain rounded-xl "
          />
        </div>
      ))}
    </div>
  </div>
)} 
    </div>
  );
}