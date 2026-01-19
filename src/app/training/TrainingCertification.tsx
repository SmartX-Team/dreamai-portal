'use client';

import React from 'react';

interface Course {
  title: string;
  duration: string;
  icon: string;
  category: string;
  available?: boolean;
}

export default function TrainingCertification() {
  const certifications = [
    { 
      level: "Bronze",
      org: "GIST AI대학원", 
      totalHours: "체험 12h",
      image: "/images/training/badge_bronze.png",
      bgColor: "bg-gradient-to-br from-amber-700 to-amber-50"
    },
    { 
      level: "Silver",
      org: "GIST AI대학원", 
      totalHours: "체험 및 집중 24h",
      image: "/images/training/badge_silver.png",
      bgColor: "bg-gradient-to-br from-gray-400 to-gray-50"
    },
    { 
      level: "Gold",
      org: "NVIDIA DLI", 
      totalHours: "체험 및 집중 32h, 심화 16h",
      image: "/images/training/badge_gold.png",
      bgColor: "bg-gradient-to-br from-yellow-500 to-yellow-50"
    }
  ];

  const bronzeCourses: { [key: string]: Course[] } = {
    체험: [  
      { title: "MobileX Station 기반 AI 서비스 구현 교육", duration: "4h", icon: "/images/training/icon_core.png", category: "Core AI", available: true },
      { title: "꿈꾸는아이(AI) Digital Twin 직무혁신", duration: "4h", icon: "/images/training/icon_DT.png", category: "DT&Robot", available: true },
      { title: "꿈꾸는아이(AI) 훈련 플랫폼을 활용한 초거대 생성형AI 실증", duration: "4h", icon: "/images/training/icon_Gen.png", category: "GenAI", available: true },
    ]
  };

  const silverCourses: { [key: string]: Course[] } = {
    체험: [
      { title: "꿈꾸는아이(AI) Digital Twin 직무혁신", duration: "4h", icon: "/images/training/icon_DT.png", category: "DT&Robot", available: true },
      { title: "꿈꾸는아이(AI) 훈련 플랫폼을 활용한 초거대 생성형AI 실증", duration: "4h", icon: "/images/training/icon_Gen.png", category: "GenAI", available: true },
    ],
    집중: [
      { title: "디지털트윈 환경 구축과 시뮬레이션 실습 과정", duration: "4h", icon: "/images/training/icon_DT.png", category: "DT&Robot", available: true },
      { title: "생성형 AI 기반 에이전트 아키텍처 이론과 응용 설계", duration: "4h", icon: "/images/training/icon_Gen.png", category: "GenAI", available: true },
      { title: "", duration: "4h", icon: "/images/training/icon_DT.png", category: "DT&Robot", available: false },
      { title: "", duration: "4h", icon: "/images/training/icon_Gen.png", category: "GenAI", available: false },
    ],
  };

  const goldCourses: { [key: string]: Course[] } = {
    체험: [
      { title: "꿈꾸는아이(AI) Digital Twin 직무혁신", duration: "4h", icon: "/images/training/icon_DT.png", category: "DT&Robot", available: true },
      { title: "꿈꾸는아이(AI) 훈련 플랫폼을 활용한 초거대 생성형AI 실증", duration: "4h", icon: "/images/training/icon_Gen.png", category: "GenAI", available: true },
    ],
    집중: [
      { title: "디지털트윈 환경 구축과 시뮬레이션 실습 과정", duration: "4h", icon: "/images/training/icon_DT.png", category: "DT&Robot", available: true },
      { title: "생성형 AI 기반 에이전트 아키텍처 이론과 응용 설계", duration: "4h", icon: "/images/training/icon_Gen.png", category: "GenAI", available: true },
      { title: "", duration: "4h", icon: "/images/training/icon_DT.png", category: "DT&Robot", available: false },
      { title: "", duration: "4h", icon: "/images/training/icon_Gen.png", category: "GenAI", available: false },
      { title: "", duration: "4h", icon: "/images/training/icon_DT.png", category: "DT&Robot", available: false },
      { title: "", duration: "4h", icon: "/images/training/icon_Gen.png", category: "GenAI", available: false },
    ],
    심화: [
      { title: "", duration: "4h", icon: "/images/training/icon_Gen.png", category: "GenAI", available: false },
      { title: "", duration: "4h", icon: "/images/training/icon_DT.png", category: "DT&Robot", available: false },
      { title: "", duration: "4h", icon: "/images/training/icon_Gen.png", category: "GenAI", available: false },
      { title: "", duration: "4h", icon: "/images/training/icon_DT.png", category: "DT&Robot", available: false },
    ],
  };

  // 카테고리별 색상 테두리
  const categoryColors = {
    "Core AI": { 
      border: "border-amber-200",
      hoverBorder: "hover:border-amber-300",
      iconBg: "bg-amber-50"
    },
    "GenAI": { 
      border: "border-green-200",
      hoverBorder: "hover:border-green-300",
      iconBg: "bg-green-50"
    },
    "DT&Robot": { 
      border: "border-blue-200",
      hoverBorder: "hover:border-blue-300",
      iconBg: "bg-blue-50"
    }
  };

  return (
    <div className="mb-20 max-w-6xl mx-auto px-4">
      
      {/* Header */}
      <div className="mb-16 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
            훈련 인증
          </h2>
          <p className="text-gray-600 tracking-wide">
            단계별 과정을 이수하고 공인 인증을 획득하세요.
          </p>
        </div>
      </div>

      {/* Certification Badges ) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {certifications.map((cert, idx) => (
          <div 
            key={idx} 
            className="group relative flex flex-col items-center bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-gray-200"
          >
            <div className="relative mb-4">
              <div className={`absolute inset-0 ${cert.bgColor} blur-2xl opacity-20 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500`}></div>
              <div className={`${cert.bgColor} relative w-24 h-24 flex items-center justify-center rounded-full shadow-lg ring-2 ring-white z-10`}>
                <img 
                  src={cert.image} 
                  alt={cert.level}
                  className={`${cert.level === 'Gold' ? 'w-16 h-16' : 'w-14 h-14'} object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110`}
                />
              </div>
            </div>

            <div className="text-center space-y-1 z-10">
              <h3 className="text-xl font-bold text-gray-800 tracking-tight group-hover:text-black transition-colors">
                {cert.level}
              </h3>
              <p className="text-sm font-medium text-gray-500">
                {cert.org}
              </p>
            </div>

            <div className="w-full mt-4 pt-4 border-t border-gray-100 flex justify-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-50 text-xs font-semibold text-gray-600 border border-gray-200 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {cert.totalHours}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bronze 추천 코스 */}
      <div className="mb-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-1 h-10 bg-gradient-to-b from-amber-600 to-amber-400 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
              <span className="bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">Bronze</span> 추천 코스
            </h3>
          </div>
          {/* 카테고리 라벨 색상 */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              Core AI
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
              GenAI AX
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              DT&Robot AX
            </span>
          </div>
        </div>
        
        {Object.entries(bronzeCourses).map(([level, courses]) => (
          <div key={level} className="mb-8">
            <div className="flex items-center gap-4 mb-6">
            <div className="px-5 py-2 rounded-full font-bold text-sm bg-white border border-gray-200 text-gray-800 shadow-[0_2px_8px_rgb(0,0,0,0.04)]">
              {level}
            </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">총 12h</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course, idx) => (
                <div
                  key={idx}
                  className={`group relative bg-white border ${categoryColors[course.category as keyof typeof categoryColors].border} ${categoryColors[course.category as keyof typeof categoryColors].hoverBorder} rounded-2xl p-6 transition-all duration-300 ${
                    course.available !== false 
                      ? 'hover:shadow-lg hover:-translate-y-1' 
                      : 'opacity-50'
                  }`}
                >
                  <div className="absolute top-4 right-4 text-xs font-semibold text-gray-500">
                    {course.duration}
                  </div>
                  
                  {course.available === false && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                      <span className="bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-semibold">
                        수강 준비중
                      </span>
                    </div>
                  )}
                  
                  <div className={`w-14 h-14 ${categoryColors[course.category as keyof typeof categoryColors].iconBg} rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <img src={course.icon} alt="" className="w-8 h-8 object-contain" />
                  </div>

                  <h4 className="text-base font-bold text-gray-900 leading-snug mb-0">
                    {course.title}
                  </h4>
                  
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Silver 추천 코스  */}
      <div className="mb-24">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-10 bg-gradient-to-b from-slate-500 to-slate-300 rounded-full"></div>
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
            <span className="bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-transparent">Silver</span> 추천 코스
          </h3>
        </div>
        
        {Object.entries(silverCourses).map(([level, courses]) => (
          <div key={level} className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              {/* Silver 라벨 뱃지  */}
            <div className="px-5 py-2 rounded-full font-bold text-sm bg-white border border-gray-200 text-gray-800 shadow-[0_2px_8px_rgb(0,0,0,0.04)]">
              {level}
            </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{level === '체험' ? '총 8h' : '총 16h'}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course, idx) => (
                <div
                  key={idx}
                  className={`group relative bg-white border ${categoryColors[course.category as keyof typeof categoryColors].border} ${categoryColors[course.category as keyof typeof categoryColors].hoverBorder} rounded-2xl p-6 transition-all duration-300 ${
                    course.available !== false 
                      ? 'hover:shadow-lg hover:-translate-y-1' 
                      : 'opacity-50'
                  }`}
                >
                  <div className="absolute top-4 right-4 text-xs font-semibold text-gray-500">
                    {course.duration}
                  </div>
                  
                  {course.available === false && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                      <span className="bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-semibold">
                        수강 준비중
                      </span>
                    </div>
                  )}
                  
                  <div className={`w-14 h-14 ${categoryColors[course.category as keyof typeof categoryColors].iconBg} rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <img src={course.icon} alt="" className="w-8 h-8 object-contain" />
                  </div>
                  
                  <h4 className="text-base font-bold text-gray-900 leading-snug mb-0">
                    {course.title}
                  </h4>
                  
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Gold 추천 코스 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-10 bg-gradient-to-b from-yellow-500 to-yellow-300 rounded-full"></div>
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
            <span className="bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">Gold</span> 추천 코스
          </h3>
        </div>
        
        {Object.entries(goldCourses).map(([level, courses]) => (
          <div key={level} className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              {/* Gold 라벨 뱃지  */}
            <div className="px-5 py-2 rounded-full font-bold text-sm bg-white border border-gray-200 text-gray-800 shadow-[0_2px_8px_rgb(0,0,0,0.04)]">
              {level}
            </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">
                  {level === '체험' ? '총 8h' : level === '집중' ? '총 24h' : '총 16h'}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course, idx) => (
                <div
                  key={idx}
                  className={`group relative bg-white border ${categoryColors[course.category as keyof typeof categoryColors].border} ${categoryColors[course.category as keyof typeof categoryColors].hoverBorder} rounded-2xl p-6 transition-all duration-300 ${
                    course.available !== false 
                      ? 'hover:shadow-lg hover:-translate-y-1' 
                      : 'opacity-50'
                  }`}
                >
                  <div className="absolute top-4 right-4 text-xs font-semibold text-gray-500">
                    {course.duration}
                  </div>
                  
                  {course.available === false && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                      <span className="bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-semibold">
                        수강 준비중
                      </span>
                    </div>
                  )}
                  
                  <div className={`w-14 h-14 ${categoryColors[course.category as keyof typeof categoryColors].iconBg} rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <img src={course.icon} alt="" className="w-8 h-8 object-contain" />
                  </div>
                  
                  <h4 className="text-base font-bold text-gray-900 leading-snug mb-0">
                    {course.title}
                  </h4>
                  
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
