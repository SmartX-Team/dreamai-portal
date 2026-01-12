"use client";

import React, { useState, useEffect } from 'react'; // useEffect 
import { createPortal } from 'react-dom'; // createPortal 

type Category = "All" | "Core" | "GenAI" | "DT&Robot";

interface Course {
  id: number;
  category: Exclude<Category, "All">;
  title: string;
  duration: string;
  level: "체험" | "집중" | "심화";
  imageUrl?: string;
  description?: string;
  curriculum?: string[];
  tools?: string[];
  formUrl?: string;  
  isRegistrationOpen?: boolean;
}

export default function TrainingCoursesSection() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const courses: Course[] = [
    {
      id: 1,
      category: "Core",
      title: "MobileX Station 기반 AI 서비스 구현 교육",
      duration: "1일 4시간",
      level: "체험",
      imageUrl: "/images/training/core-7.png",
      description: "AI 서비스 구현 능력 기반 교육을 통해 전문성 역량 강화 ",
      curriculum: ["AI대학원 꿈꾸는 아이(AI) Space 인프라 및 D-N-A 기반 X+AI 서비스 개념 및 원리", "대형 언어 모델(LLM) 기반 프롬프트 엔지니어링 이론", "Omniverse 도구 기반 디지털 트윈(Digital Twin) 개념 및 원리"],
      tools: ["GAN", "Diffusion Models", "NVIDIA Omniverse"],
      formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSc3-FS3GwN_2J73gTQAdcyXnrCoJkk-uIXQd0XYG6PahQQkpA/viewform?usp=header",
      isRegistrationOpen: false 
    },
    {
      id: 2,
      category: "GenAI",
      title: "꿈꾸는아이(AI) 훈련 플랫폼을 활용한 초거대 생성형AI 실증",
      duration: "1일 4시간",
      level: "체험",
      imageUrl: "/images/training/genai-2.png",
      description: "초거대 생성형AI 실증 교육을 통해 전문성 역량 강화 ",
      curriculum: ["꿈꾸는 아이(AI) Space 인프라 기반 교육 서비스 및 D-N-A 기반의 X+AI 서비스 실증", "생성형AI 창작", "초거대 AI시대를 여는 LLM 기초 및 활용: 대형 언어 모델(LLM)기반의 프롬포트 엔지니어링 서비스"],
      tools: ["ChatGPT API", "Tiny-Llama", "SD Turbo"],
      formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSc3-FS3GwN_2J73gTQAdcyXnrCoJkk-uIXQd0XYG6PahQQkpA/viewform?usp=header",
      isRegistrationOpen: false  
    },
    {
      id: 3,
      category: "DT&Robot",
      title: "꿈꾸는아이(AI) Digital Twin 직무혁신",
      duration: "1일 4시간",
      level: "체험",
      imageUrl: "/images/training/dt-robot-2.png",
      description: "꿈꾸는아이(AI) 훈련 플랫폼을 활용한 Digital Twin 교육을 통해 전문성 역량 강화 ",
      curriculum: ["꿈꾸는아이(AI) Digital Twin을 통한 X+AI 서비스 관제", "Digital Twin을 위한 현실세계 데이터의 3D 변환", "인공지능 서비스 실현을 위한 Digital Twin 소개", "Digital Twin 활용 로봇 시뮬레이션" ],
      tools: ["Dream-AI Space","NVIDIA Omniverse", "Isaac Sim"],
      formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSftuj2FpvS3j5b4amztjyF6VDfqtIRvzigxOIJbwJYVaVOpJA/viewform",
      isRegistrationOpen: true
    },
    {
      id: 4,
      category: "DT&Robot",
      title: "디지털트윈 환경 구축과 시뮬레이션 실습 과정",
      duration: "1일 4시간",
      level: "집중",
      imageUrl: "/images/training/dt-robot-1.png",
      description: "OpenUSD–Omniverse–AI Surrogate 모델–SimReady 자산을 통합 활용하여 디지털트윈의 설계–시뮬레이션–실증(Sim-to-Real) 전 과정을 학습하는 산업 실증형 전문인재 양성 과정",
      curriculum: [ "OpenUSD Omniverse 기반으로 시작하는 Sim2Real Digital Twin", "SimReady Digital Twin 구축과 활용을 위한 3D Asset 생성과 가상통합", "로봇과 자율자동차 훈련을 위한 가상/실제 연동 Physital Digital Twin"],
      tools: ["NVIDIA Omniverse", "MobileX Pole"],
      formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSftuj2FpvS3j5b4amztjyF6VDfqtIRvzigxOIJbwJYVaVOpJA/viewform",
      isRegistrationOpen: true
    },
    {
      id: 5,
      category: "Core",
      title: "Model Zoo1: Python 기반 AI 이해 및 데이터 시각화 실습",
      duration: "1일 4시간",
      level: "체험",
      imageUrl: "/images/training/core-1.png",
      description: "AI 개발의 기초 역량을 강화하고 Python을 활용한 기술 이해와 실습 능력 향상",
      curriculum: [ "AI 실습 환경 세팅 및 Python을 활용한 AI 이해 및 체험", "CNN 모델 학습부터 추론까지의 과정 실습", "음성, 시계열, 이미지 등 다양한 데이터의 이해 및 시각화"],
      tools: ["CNN","Python" ],
      formUrl: "https://forms.google.com/your-form-3",
      isRegistrationOpen: false
    },
    {
      id: 6,
      category: "Core",
      title: "Model Zoo2: 초거대 AI와 클라우드 인프라 기반 X+AI 융합 서비스 이해",
      duration: "1일 4시간",
      level: "체험",
      imageUrl: "/images/training/core-2.png",
      description: "초거대 AI와 LLM 기초를 다지고, 이를 지원하는 클라우드 인프라 및 D-N-A 기반 융합 서비스 이해",
      curriculum: ["초거대 AI 시대를 여는 LLM(대규모 언어 모델) 기초 및 파운데이션 모델 이해", "Agentic AI의 개념과 활용 및 LLM 추론", "D-N-A(Data, Network, AI) 인프라(데이터센터)와 클라우드 기술 구조 이해"],
      tools: ["LLM", "Agentic AI", "D-N-A Infrastructure"],
      formUrl: "https://forms.google.com/your-form-4",
      isRegistrationOpen: false
    },
    {
      id: 7,
      category: "Core",
      title: "AI Playground1: 수학으로 접근하는 기계학습",
      duration: "1일 4시간",
      level: "체험",
      imageUrl: "/images/training/core-3.png",
      description: "기계학습(ML)의 핵심이 되는 수학적 원리를 이해하고, 지도 및 비지도 학습 모델을 직접 구현해보는 기초 실습",
      curriculum: ["선형회귀와 오차, 경사하강법 등 머신러닝 수학 기초", "로지스틱 회귀 및 신경망(Neural Networks) 구조 이해", "비지도 학습의 개념과 K-means 알고리즘 실습"],
      tools: ["Machine Learning", "Linear/Logistic Regression"],
      formUrl: "https://forms.google.com/your-form-5",
      isRegistrationOpen: false
    },
    {
      id: 8,
      category: "Core",
      title: "AI Playground2: 신뢰할 수 있는 데이터 엔지니어링과 LLM 이해 및 실습",
      duration: "1일 4시간",
      level: "체험",
      imageUrl: "/images/training/core-4.png",
      description: "LLM의 핵심인 트랜스포머 구조를 실습하고, 고품질 AI 개발을 위한 신뢰할 수 있는 데이터 엔지니어링(수집·저장·관리) 기술 습득",
      curriculum: ["LLM과 트랜스포머(Transformer) 구조의 이해 및 모델 실습", "믿을 수 있는 데이터 축적의 중요성과 메타데이터(Metadata) 활용", "데이터 활용을 위한 저장 형식, 데이터 레이크(Data Lake) 및 레이크하우스 이해"],
      tools: ["LLM", "Transformer"],
      formUrl: "https://forms.google.com/your-form-6",
      isRegistrationOpen: false
    },
    {
      id: 9,
      category: "Core",
      title: "Impact AI Hackathon",
      duration: "1일 16시간",
      level: "체험",
      imageUrl: "/images/training/core-5.png",
      description: "사회 문제 해결을 주제로 실제 AI 서비스를 기획·개발하며 실전 문제 해결 능력과 협업 역량을 키우는 프로젝트형 해커톤",
      curriculum: ["사회 문제 정의 및 AI 기반 해결 아이디어 도출 (Ideation)", "팀 빌딩 및 AI 서비스 프로토타입 개발 (Mentoring)", "최종 결과물 발표 및 시연 (Presentation)"],
      tools: ["자유 선택"],
      formUrl: "https://forms.google.com/your-form-7",
      isRegistrationOpen: false
    },
    {
      id: 10,
      category: "Core",
      title: "DLI DAY",
      duration: "1일 4시간",
      level: "체험",
      imageUrl: "/images/training/core-6.png",
      description: "NVIDIA의 글로벌 AI 인증 프로그램과 연계하여 딥러닝 및 GPU 병렬처리 기술을 실습하고, 초거대 AI 모델 운영 능력을 배양",
      curriculum: [ "딥러닝(Deep Learning)의 기초 이론 및 원리 학습", "GPU 병렬처리 기술 및 고성능 컴퓨팅(HPC) 활용 실습", "NVIDIA DLI 인증 평가 및 자격 취득"],
      tools: ["NVIDIA DLI", "Deep Learning", "HPC"],
      formUrl: "https://forms.google.com/your-form-8",
      isRegistrationOpen: false
    },
    {
      id: 11,
      category: "GenAI",
      title: "생성형 AI 기반 에이전트 아키텍처 이론과 응용 설계",
      duration: "1일 4시간",
      level: "집중",
      imageUrl: "/images/training/genai-1.png",
      description:  "생성형 AI 모델을 설계하고, 이를 바탕으로 스스로 판단하고 행동하는 에이전트(Agent) 시스템을 구축하는 이론 및 응용 실습",
      curriculum: [ "생성형 AI(Generative AI) 모델의 아키텍처 설계 및 원리 이해", "멀티 에이전트(Multi-Agent) 시스템의 개념과 응용", "LLM 기반의 자율형 AI 서비스 구현 및 API 연동 실습"],
      tools: ["Agentic AI", "Multi-Agent Systems", "LLM"],
      formUrl: "https://forms.google.com/your-form-2",
      isRegistrationOpen: false
    },
  ];

  const categories: Category[] = ["All", "Core", "GenAI", "DT&Robot"];

  const categoryStyles: Record<Category, { bg: string; text: string; badge: string }> = {
    All: {
      bg: "bg-[#FFFFFF] hover:bg-[#F8F8F8] border border-gray-200",
      text: "text-gray-900",
      badge: "bg-gray-100 text-gray-700",
    },
    Core: {
      bg: "bg-[#FFFFFF] hover:bg-[#F8F8F8] border border-gray-200",
      text: "text-[#C8A102]",
      badge: "bg-[#C8A102]/10 text-[#C8A102]",
    },
    GenAI: {
      bg: "bg-[#FFFFFF] hover:bg-[#F8F8F8] border border-gray-200",
      text: "text-[#36822C]",
      badge: "bg-[#36822C]/10 text-[#36822C]",
    },
    "DT&Robot": {
      bg: "bg-[#FFFFFF] hover:bg-[#F8F8F8] border border-gray-200",
      text: "text-[#4681DA]",
      badge: "bg-[#4681DA]/10 text-[#4681DA]",
    },
  };
  

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  const getCategoryCount = (cat: Category) => {
    if (cat === "All") return courses.length;
    return courses.filter((c) => c.category === cat).length;
  };

  return (
    <section className="w-full bg-white py-32 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[300px] left-1/2 -translate-x-1/2 w-[1800px] h-[200px] rounded-full opacity-20 blur-[200px]"
          style={{ background: "radial-gradient(circle, #00C896 0%, #00A47C 30%, #E6F7F2 50%, transparent 80%)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Pretendard, sans-serif' }}>2026년 훈련 과정</h2>
          <p className="text-gray-600 text-lg mb-6">총 {courses.length}개 과정 · 3개 트랙</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const style = categoryStyles[cat];

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ease-in-out border
                  ${
                    isSelected
                      ? cat === "All"
                        ? "bg-gray-900 text-white border-gray-900 shadow-lg transform scale-105"
                        : `bg-white border-gray-200 shadow-lg transform scale-105 ${style.text}`
                      : `${style.bg} ${style.text}`
                  }
                `}
              >
                {cat} ({getCategoryCount(cat)})
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredCourses.map((course) => {
            const style = categoryStyles[course.category];
            return (
              <div
                key={course.id}
                className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col group"
              >
                <div className="relative w-full h-40 bg-gradient-to-br from-gray-50 to-gray-100">
                  {course.imageUrl ? (
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                  
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white border border-gray-200 ${style.text}`}
                    >
                      {course.category}
                    </span>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white border border-gray-200 ${style.text}`}
                    >
                      {course.level}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-base font-bold text-gray-900 mb-3 leading-tight flex-grow line-clamp-2">
                    {course.title}
                  </h3>

                  <div className="flex items-center text-sm text-gray-600 pt-3 border-t border-gray-100">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{course.duration}</span>
                  </div>

                  <button
                    onClick={() => setSelectedCourse(course)}
                    className={
                      "mt-3 w-full py-2 rounded-lg font-semibold text-sm transition-all duration-300 opacity-0 group-hover:opacity-100 " +
                      style.bg + " " + style.text
                    }
                  >
                    자세히 보기
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">해당 카테고리의 과정이 없습니다.</p>
          </div>
        )}

        {selectedCourse && mounted && createPortal(
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4"
            onClick={() => setSelectedCourse(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* --- 모달  --- */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <div className="flex gap-2 mb-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white border border-gray-200 ${categoryStyles[selectedCourse.category].text}`}
                    >
                      {selectedCourse.category}
                    </span>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white border border-gray-200 ${categoryStyles[selectedCourse.category].text}`}
                    >
                      {selectedCourse.level}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedCourse.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* --- 모달 끝 --- */}

              <div className="px-8 py-6">
                <div className="flex items-center text-cyan-600 mb-6">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold">{selectedCourse.duration}</span>
                </div>

                {selectedCourse.description && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      과정 소개
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{selectedCourse.description}</p>
                  </div>
                )}

                {selectedCourse.curriculum && selectedCourse.curriculum.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      커리큘럼
                    </h4>
                    <div className="space-y-2">
                      {selectedCourse.curriculum.map((item, idx) => (
                        <div key={idx} className="flex items-start">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedCourse.tools && selectedCourse.tools.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      사용 기술
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCourse.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    if (!selectedCourse.isRegistrationOpen) {
                      alert('아직 수강신청 기간이 아닙니다.\n곧 오픈 예정이니 조금만 기다려주세요!');
                      return;
                    }
                    if (selectedCourse.formUrl) {
                      window.open(selectedCourse.formUrl, '_blank');
                    }
                  }}
                  className={`w-full font-bold py-4 rounded-xl transition-colors duration-200 mt-8 ${
                    selectedCourse.isRegistrationOpen
                      ? 'bg-cyan-500 hover:bg-cyan-600 text-white cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {selectedCourse.isRegistrationOpen ? '수강 신청하기' : '수강 신청 준비중'}
                </button>
              </div>
            </div>
          </div>,
          document.body 
        )}
      </div>
    </section>
  );
}