'use client';

import { useState, useEffect } from 'react';

const curriculumImages = [
  { id: 1, image: '/images/training/course1.jpg', alt: '중등 인공지능 교육 전문가 과정 직무연수 1기' },
  { id: 2, image: '/images/training/course2.jpg', alt: '중등 인공지능 교육 전문가 과정 직무연수 2기' },
  { id: 3, image: '/images/training/course3.jpg', alt: 'NVIDIA와 함께하는 GIST 슈퍼컴퓨팅센터 DLI Day' },
  { id: 4, image: '/images/training/course4.jpg', alt: 'GIST 슈퍼 컴퓨팅센터 HPC-AI 교육과정' },
  { id: 5, image: '/images/training/course5.jpg', alt: 'MobileX Station 기반 AI 서비스 구현 교육' },
  { id: 6, image: '/images/training/course6.jpg', alt: 'MobileX Station 기반의 AI 이해 및 체험 교육 1회차' },
  { id: 7, image: '/images/training/course7.jpg', alt: 'MobileX Station 기반의 AI 이해 및 체험 교육 2회차' },
];

const galleryImages = [
  { id: 1, image: '/images/training/gallery1.jpg', title: '중등 인공지능 교육 전문가 과정 직무연수 1기' },
  { id: 2, image: '/images/training/gallery2.jpg', title: '중등 인공지능 교육 전문가 과정 직무연수 2기' },
  { id: 3, image: '/images/training/gallery3.jpg', title: 'NVIDIA와 함께하는 GIST 슈퍼컴퓨팅센터 DLI Day' },
  { id: 4, image: '/images/training/gallery4.jpg', title: 'GIST 슈퍼 컴퓨팅센터 HPC-AI 교육과정' },
  { id: 5, image: '/images/training/gallery6.jpg', title: 'MobileX Station 기반 AI 서비스 구현 교육' },
  { id: 6, image: '/images/training/gallery5.jpg', title: 'MobileX Station 기반의 AI 이해 및 체험 교육 1회차' },
  { id: 7, image: '/images/training/gallery7.jpg', title: 'MobileX Station 기반의 AI 이해 및 체험 교육 2회차' },
];

const Training2025 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % curriculumImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? curriculumImages.length - 1 : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const duplicatedGallery = [...galleryImages, ...galleryImages];

  return (
    <div className="mb-20 bg-white rounded-3xl p-8 md:p-12">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-10 pb-4 border-b border-gray-200 text-gray-900">
      꿈꾸는아이(AI) Training ~2025
      </h2>

      <div className="w-full mx-auto mb-16">
        <div className="relative bg-gray-50 rounded-xl overflow-hidden">
          <div className="relative aspect-[16/9] overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {curriculumImages.map((item) => (
                <div key={item.id} className="min-w-full h-full flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-600 w-12 h-12 rounded-full shadow transition-all duration-200 flex items-center justify-center text-xl"
            aria-label="이전 슬라이드"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-600 w-12 h-12 rounded-full shadow transition-all duration-200 flex items-center justify-center text-xl"
            aria-label="다음 슬라이드"
          >
            →
          </button>

          <div className="absolute bottom-5 right-5 bg-gray-800/70 text-white px-4 py-2 rounded-full text-sm font-medium">
            {currentSlide + 1} / {curriculumImages.length}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {curriculumImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'bg-blue-600 w-6 h-1.5'
                  : 'bg-gray-300 hover:bg-gray-400 w-1.5 h-1.5'
              }`}
              aria-label={`${index + 1}번 슬라이드로 이동`}
            />
          ))}
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p></p>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="mb-6">
        </div>

        <div className="overflow-hidden">
          <div className="animate-scroll flex gap-4">
            {duplicatedGallery.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex-shrink-0 w-64">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Training2025;