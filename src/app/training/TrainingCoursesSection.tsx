"use client";

import { widgetTarget } from "@/lib/portal-content/widgets";
import { usePortalPage } from "@/lib/portal-content/provider";
import { PageWidgets } from "@/lib/portal-content/page-widgets";
import React, { useState, useEffect } from "react"; // useEffect
import { createPortal } from "react-dom"; // createPortal

import type { Category, Course } from "@/lib/portal-content/courses";
import { portalFieldId } from "@/lib/portal-content/registry";

export default function TrainingCoursesSection({ courses }: { courses: Course[] }) {
  const editableCopy = usePortalPage("/training").display;
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR 하이드레이션 가드로 마운트 후 1회만 실행됨
    setMounted(true);
  }, []);

  const categories: Category[] = ["All", "Core", "AgenticAI", "DT&Robot"];

  const categoryStyles: Record<
    Category,
    { bg: string; text: string; badge: string }
  > = {
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
    AgenticAI: {
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
          className="absolute top-75 left-1/2 -translate-x-1/2 w-[1800px] h-50 rounded-full opacity-20 blur-[200px]"
          style={{
            background:
              "radial-gradient(circle, #00C896 0%, #00A47C 30%, #E6F7F2 50%, transparent 80%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <PageWidgets zone="training.catalog" nodes={{
          title: (
            <div {...widgetTarget("training.catalog", "title")} className="mb-12 text-center">
              <h2
                className="text-4xl font-bold text-gray-900 mb-3"
                style={{ fontFamily: "Pretendard, sans-serif" }}
              >
                {editableCopy["TrainingCoursesSection 문구 1"]}</h2>
              <p className="text-gray-600 text-lg mb-6">
                총 {courses.length}개 과정 · 3개 트랙
              </p>
            </div>
          ),
          filters: (
            <div {...widgetTarget("training.catalog", "filters")} className="flex flex-wrap justify-center gap-3 mb-12">
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
          ),
          cards: (
            <div {...widgetTarget("training.catalog", "cards")} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {/* 카드 디자인 영역 */}
              {filteredCourses.map((course) => {
                const style = categoryStyles[course.category];
                const contentIndex = courses.indexOf(course);
                return (
                  <div
                    key={course.id}
                    className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-gray-200 flex flex-col group"
                  >
                    <div data-portal-field={portalFieldId("courses", contentIndex, "imageUrl")}
                      className="relative w-full h-40 bg-linear-to-br from-gray-50 to-gray-100">
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
                        {/* 카테고리 뱃지 */}
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white ${style.text}`}
                        >
                          {course.category}
                        </span>
                        {/* 레벨 뱃지  */}
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white ${style.text}`}
                        >
                          {course.level}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col grow">
                      <h3 data-portal-field={portalFieldId("courses", contentIndex, "title")}
                        className="text-base font-bold text-gray-900 mb-3 leading-tight grow line-clamp-2">
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
                          "mt-3 w-full py-2 rounded-lg font-semibold text-sm transition-all duration-300 opacity-0 group-hover:opacity-70 " +
                          style.bg +
                          " " +
                          style.text
                        }
                      >
                        자세히 보기
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ),
          empty: (
            filteredCourses.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                  {editableCopy["TrainingCoursesSection 문구 2"]}</p>
              </div>
            )
          ),
          dialog: (
            selectedCourse &&
              mounted &&
              createPortal(
                <div
                  className="fixed inset-0 bg-black/70 flex items-center justify-center z-9999 p-4"
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
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    {/* --- 모달 끝 --- */}

                    <div className="px-8 py-6">
                      <div className="flex items-center text-cyan-600 mb-6">
                        <svg
                          className="w-5 h-5 mr-2"
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
                        <span className="font-semibold">
                          {selectedCourse.duration}
                        </span>
                      </div>

                      {selectedCourse.description && (
                        <div className="mb-6">
                          <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                            {editableCopy["TrainingCoursesSection 문구 3"]}</h4>
                          <p className="text-gray-700 leading-relaxed">
                            {selectedCourse.description}
                          </p>
                        </div>
                      )}

                      {selectedCourse.curriculum &&
                        selectedCourse.curriculum.length > 0 && (
                          <div className="mb-6">
                            <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                              {editableCopy["TrainingCoursesSection 문구 4"]}</h4>
                            <div className="space-y-2">
                              {selectedCourse.curriculum.map((item, idx) => (
                                <div key={idx} className="flex items-start">
                                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mr-3 shrink-0 mt-0.5">
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
                            {editableCopy["TrainingCoursesSection 문구 5"]}</h4>
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
                            alert(
                              "아직 수강신청 기간이 아닙니다.\n곧 오픈 예정이니 조금만 기다려주세요!",
                            );
                            return;
                          }
                          if (selectedCourse.formUrl) {
                            window.open(selectedCourse.formUrl, "_blank");
                          }
                        }}
                        className={`w-full font-bold py-4 rounded-xl transition-colors duration-200 mt-8 ${
                          selectedCourse.isRegistrationOpen
                            ? "bg-[#1F92DF] hover:bg-cyan-600 text-white cursor-pointer"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {selectedCourse.isRegistrationOpen
                          ? "수강 신청하기"
                          : "수강 신청 준비중"}
                      </button>
                    </div>
                  </div>
                </div>,
                document.body,
              )
          ),
        }} />
      </div>
    </section>
  );
}
