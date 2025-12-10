import React from 'react';

interface CheckinSection {
  title: string;
  imageUrl?: string | string[];
  content?: string;
  subtitle?: string;
  item?: Array<{ main: string; sub: string }>;
  ppt_imageUrl?: string[];
}

interface TrainingCheckinSectionProps {
  data: CheckinSection;
}

export default function TrainingCheckinSection({ data }: TrainingCheckinSectionProps) {
  // content 문자열을 줄바꿈으로 분리
  const lines = data.content?.split('\n').filter(line => line.trim()) || [];
  
  // 과정명, 연수비, 기타사항, 신청방법 추출
  const details = lines.slice(2, 6); // 3번째~6번째 줄
  const notice = lines[6] || ''; // 7번째 줄 (공지사항)

  return (
    <div className="mb-20">
      {/* 섹션 타이틀 */}
      <h2 className="text-3xl font-bold mt-[150px] pl-4 border-l-4 border-blue-500">
        {data.title}
      </h2>

      {/* 2단 레이아웃 */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* 왼쪽: 정보 영역 */}
        <div className="flex flex-col gap-6">

          {/* 교육 과정 정보 카드 */}
          <div className=" rounded-xl p-7 ">
            <h3 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b-2 border-blue-500">
              교육 과정 안내
            </h3>
            <div className="flex flex-col gap-4">
              {details.map((line, idx) => {
                const [label, ...contentParts] = line.split(':');
                const content = contentParts.join(':').trim();
                
                return (
                  <div key={idx} className="flex gap-3 leading-relaxed">
                    <div className="text-gray-700 font-semibold text-sm min-w-[110px] flex-shrink-0">
                      {label.trim()}:
                    </div>
                    <div className="text-gray-900 text-sm flex-1">
                      {content}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          
          {/* 공지사항 카드 */}
          <div className=" rounded-xl p-5">
            <h4 className="text-gray-900 font-bold text-base mb-3">
            공지사항
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed">
            현재 모든 교육 과정의 신청이 마감되었습니다. 
            <br/><br/>
            교육 과정에 관심을 가져주신 모든 분께 감사드립니다. 다음 차수 교육 일정은 추후 공지될 예정이오니, 지속적인 관심 부탁드립니다.
            <br/><br/>
            훈련 교안은 하단의 
             <span style={{ color: '#0070f3', fontWeight: 'bold' }}> '훈련 교안 다운로드' </span> 버튼을 통해 언제든지 내려받으실 수 있습니다.
            </p>
          </div>

          {/* 버튼 영역 - Contents 스타일 적용! */}
          <div className="flex flex-col gap-3">
            <a
              href="https://forms.gle/3Vf4RrBW1WEhNv8e9"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center px-6 py-4 rounded-xl text-sm font-semibold
                bg-[#e2664d] text-white hover:brightness-105 transition-all duration-200
                shadow-md hover:shadow-lg"
            >
              과정 신청 바로가기
            </a>
            <a
              href="https://drive.google.com/drive/folders/1SuZvyfbeNI7bmXlBc0LRJhwUErZlqdg6?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center px-6 py-4 rounded-xl text-sm font-semibold
                bg-white text-[#e2664d] border-2 border-[#e2664d] hover:bg-orange-50
                transition-all duration-200"
            >
              훈련 교안 다운로드
            </a>
          </div>

          {/* 연락처 카드 */}
          <div className="bg-gradient-to-br from-blue-10 to-blue-50 rounded-xl p-5 text-center">
            <p className="text-gray-700 text-sm leading-relaxed mb-1">
              광주과학기술원 AI대학원
            </p>
            <p className="text-gray-700 text-sm">
              T. 062-715-6396 | E. shee4797@gist.ac.kr
            </p>
          </div>
        </div>

        {/* 오른쪽: 포스터 이미지 */}
        <div className="flex items-start justify-center lg:justify-end">
          {data.imageUrl && (
            <div className="w-full max-w-lg">
              <img
                src={Array.isArray(data.imageUrl) ? data.imageUrl[0] : data.imageUrl}
                alt="훈련 포스터"
                className="w-full h-auto object-contain rounded-xl shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}