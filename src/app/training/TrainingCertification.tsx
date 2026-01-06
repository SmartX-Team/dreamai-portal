'use client';

import React from 'react';

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

  const bronzeCourses = {
    체험: [  
      { title: "MobileX Station 기반 AI 서비스 구현 교육", duration: "4h", icon: "/images/training/icon_core.png", category: "Core AI", available: true },
      { title: "꿈꾸는아이(AI) Digital Twin 직무혁신", duration: "4h", icon: "/images/training/icon_DT.png", category: "DT&Robot", available: true },
      { title: "꿈꾸는아이(AI) 훈련 플랫폼을 활용한 초거대 생성형AI 실증", duration: "4h", icon: "/images/training/icon_Gen.png", category: "GenAI", available: true },
    ]
  };

  const silverCourses = {
    체험: [
      { title: "꿈꾸는아이(AI) Digital Twin 직무혁신", duration: "4h", icon: "/images/training/icon_DT.png", category: "DT&Robot", available: true },
      { title: "꿈꾸는아이(AI) 훈련 플랫폼을 활용한 초거대 생성형AI 실증", duration: "4h", icon: "/images/training/icon_Gen.png", category: "GenAI", available: true },
    ],
    집중: [
      { title: "디지털트윈 환경 구축과 시뮬레이션 실습 과정", duration: "4h", icon: "/images/training/icon_DT.png", category: "DT&Robot", available:true },
      { title: "생성형 AI 기반 에이전트 아키텍처 이론과 응용 설계", duration: "4h", icon: "/images/training/icon_Gen.png", category: "GenAI", available: true },
      { title: "", duration: "4h", icon: "/images/training/icon_DT.png", category: "DT&Robot", available: false },
      { title: "", duration: "4h", icon: "/images/training/icon_Gen.png", category: "GenAI", available: false },
    ],
  };

  const goldCourses = {
    체험: [
      { title: "꿈꾸는아이(AI) Digital Twin 직무혁신", duration: "4h", icon: "/images/training/icon_DT.png", category: "DT&Robot", available: true },
      { title: "꿈꾸는아이(AI) 훈련 플랫폼을 활용한 초거대 생성형AI 실증", duration: "4h", icon: "/images/training/icon_Gen.png", category: "GenAI", available: true },
    ],
    집중: [
      { title: "디지털트윈 환경 구축과 시뮬레이션 실습 과정", duration: "4h", icon: "/images/training/icon_DT.png", category: "DT&Robot", available:true },
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

  const levelColors = {
    체험: { badge: "bg-white", duration: "bg-white", border: "border-gray-200" },
    집중: { badge: "bg-white", duration: "bg-white", border: "border-gray-200" },
    심화: { badge: "bg-white", duration: "bg-white", border: "border-gray-200" }
  };

  const categoryColors = {
    "Core AI": { card: "bg-[#C8A102]/10", border: "border-[#C8A102]" },
    "GenAI": { card: "bg-[#36822C]/10", border: "border-[#36822C]" },
    "DT&Robot": { card: "bg-[#4681DA]/10", border: "border-[#4681DA]" }
  };

  return (
    <div className="mb-20 max-w-6xl mx-auto px-4">
      
      {/* 상단 헤더 */}
      <div className="mb-12 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            훈련 인증
          </h2>
          <p className="text-gray-500">
            단계별 과정을 이수하고 공인 인증을 획득하세요.
          </p>
        </div>
      </div>

      {/* 인증 뱃지 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {certifications.map((cert, idx) => (
          <div 
            key={idx} 
            className="group relative flex flex-col items-center bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-gray-200"
          >
            <div className="relative mb-4">
              <div className={`absolute inset-0 ${cert.bgColor} blur-2xl opacity-20 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500`}></div>
              <div className={`${cert.bgColor} relative w-24 h-24 flex items-center justify-center rounded-full shadow-lg ring-4 ring-white z-10`}>
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

      {/* Bronze 추천 코스 + 카테고리 칩  */}
      <div className="mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b-2 border-amber-100">
          {/* 제목 */}
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-amber-700 rounded-r-md"></div>
            <h3 className="text-2xl font-bold text-gray-800">
              <span className="text-amber-700">Bronze</span> 추천 코스
            </h3>
          </div>

          {/* 카테고리 칩  */}
          <div className="flex flex-wrap gap-2">
            <span className="bg-[#C8A102]/10 border border-[#C8A102] text-[#C8A102] px-3 py-1.5 rounded-lg text-xs font-bold">
              Core AI
            </span>
            <span className="bg-[#36822C]/10 border border-[#36822C] text-[#36822C] px-3 py-1.5 rounded-lg text-xs font-bold">
              GenAI AX
            </span>
            <span className="bg-[#4681DA]/10 border border-[#4681DA] text-[#4681DA] px-3 py-1.5 rounded-lg text-xs font-bold">
              DT&Robot AX
            </span>
          </div>
        </div>
        
        {Object.entries(bronzeCourses).map(([level, courses]) => (
          <div key={level} className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className={`${levelColors[level as keyof typeof levelColors].badge} ${levelColors[level as keyof typeof levelColors].border} border text-gray-600 px-6 py-2 rounded-full font-semibold shadow-sm`}>
                {level}
              </div>
              <div className="text-gray-600 text-sm font-semibold">총 12h</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {courses.map((course, idx) => (
                <div
                  key={idx}
                  className={`${categoryColors[course.category as keyof typeof categoryColors].card} border-2 ${categoryColors[course.category as keyof typeof categoryColors].border} rounded-2xl p-5 relative ${course.available !== false ? 'hover:scale-[1.02]' : 'opacity-60'} transition-transform duration-200 flex flex-col justify-between min-h-[180px]`}
                >
                  <div className={`absolute -top-3 -right-3 ${levelColors[level as keyof typeof levelColors].duration} text-gray-600 px-3 py-1 rounded-full text-xs font-bold shadow-md border border-gray-100`}>
                    ⏱ {course.duration}
                  </div>
                  {course.available === false && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 text-white px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap z-10">
                      수강 준비중
                    </div>
                  )}
                  <div className={course.available === false ? 'blur-[2px]' : ''}>
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                      <img 
                        src={course.icon} 
                        alt="" 
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 leading-snug break-keep">
                      {course.title}
                    </h4>
                  </div>
                  <div className="h-2"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/*  Silver 추천 코스 */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-gray-200">
          <div className="w-1.5 h-8 bg-gray-400 rounded-r-md"></div>
          <h3 className="text-2xl font-bold text-gray-800">
            <span className="text-gray-500">Silver</span> 추천 코스
          </h3>
        </div>
        
        {Object.entries(silverCourses).map(([level, courses]) => (
          <div key={level} className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className={`${levelColors[level as keyof typeof levelColors].badge} text-gray-600 px-6 py-2 rounded-full font-semibold shadow-sm border border-gray-200`}>
                {level}
              </div>
              <div className="text-gray-600 text-sm font-semibold">
                {level === '체험' ? '총 8h' : '총 16h'}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {courses.map((course, idx) => (
                <div
                  key={idx}
                  className={`${categoryColors[course.category as keyof typeof categoryColors].card} border-2 ${categoryColors[course.category as keyof typeof categoryColors].border} rounded-2xl p-5 relative ${course.available !== false ? 'hover:scale-[1.02]' : 'opacity-60'} transition-transform duration-200 flex flex-col justify-between min-h-[180px]`}
                >
                  <div className={`absolute -top-3 -right-3 ${levelColors[level as keyof typeof levelColors].duration} text-gray-600 px-3 py-1 rounded-full text-xs font-bold shadow-md border border-gray-100`}>
                    ⏱ {course.duration}
                  </div>
                  {course.available === false && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 text-white px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap z-10">
                      수강 준비중
                    </div>
                  )}
                  <div className={course.available === false ? 'blur-[2px]' : ''}>
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                      <img 
                        src={course.icon} 
                        alt="" 
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 leading-snug break-keep">
                      {course.title}
                    </h4>
                  </div>
                  <div className="h-2"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/*  Gold 추천 코스 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-yellow-100">
          <div className="w-1.5 h-8 bg-yellow-500 rounded-r-md"></div>
          <h3 className="text-2xl font-bold text-gray-800">
            <span className="text-yellow-600">Gold</span> 추천 코스
          </h3>
        </div>
        
        {Object.entries(goldCourses).map(([level, courses]) => (
          <div key={level} className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className={`${levelColors[level as keyof typeof levelColors].badge} text-gray-600 px-6 py-2 rounded-full font-semibold shadow-sm border border-gray-200`}>
                {level}
              </div>
              <div className="text-gray-700 text-sm font-semibold">
                {level === '체험' ? '총 8h' : level === '집중' ? '총 24h' : '총 16h'}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {courses.map((course, idx) => (
                <div
                  key={idx}
                  className={`${categoryColors[course.category as keyof typeof categoryColors].card} border-2 ${categoryColors[course.category as keyof typeof categoryColors].border} rounded-2xl p-5 relative ${course.available !== false ? 'hover:scale-[1.02]' : 'opacity-60'} transition-transform duration-200 flex flex-col justify-between min-h-[180px]`}
                >
                  <div className={`absolute -top-3 -right-3 ${levelColors[level as keyof typeof levelColors].duration} text-gray-600 px-3 py-1 rounded-full text-xs font-bold shadow-md border border-gray-100`}>
                    ⏱ {course.duration}
                  </div>
                  {course.available === false && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 text-white px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap z-10">
                      수강 준비중
                    </div>
                  )}
                  <div className={course.available === false ? 'blur-[2px]' : ''}>
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                      <img 
                        src={course.icon} 
                        alt="" 
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 leading-snug break-keep">
                      {course.title}
                    </h4>
                  </div>
                  <div className="h-2"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}