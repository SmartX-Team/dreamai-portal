'use client';

import React, { useRef } from 'react';

/* ─────────────────────────────────────────────
   Types – matches dream_ai_training.json exactly
───────────────────────────────────────────── */

interface ContentBlock {
  label: string;
  link: string;
  description: string;
}

interface CheckinSection {
  title: string;
  title2?: string;
  imageUrl?: string | string[];
  imageUrl2?: string | string[];
  /** 레거시 단일 content (하위 호환용) */
  content?: string;
  /** 신규 분리 구조 */
  content1?: ContentBlock;
  content2?: ContentBlock;
  subtitle?: string;
  item?: Array<{ main: string; sub: string }>;
  ppt_imageUrl?: string[];
}

interface TrainingCheckinSectionProps {
  data: CheckinSection;
}

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */

/** "<꿈꾸는아이 / 26.01.19 14:00~>"  →  { title, date } */
function parseCourseEntry(raw: string): { title: string; date: string } {
  const cleaned = raw.replace(/^<|>$/g, '').trim();
  const slashIdx = cleaned.lastIndexOf('/');
  if (slashIdx === -1) return { title: cleaned, date: '' };
  return {
    title: cleaned.slice(0, slashIdx).trim(),
    date: cleaned.slice(slashIdx + 1).trim(),
  };
}

/** "과정명 : 광주..." → { label: "과정명", value: "광주..." } */
function parseDetailLine(line: string): { label: string; value: string } {
  const colonIdx = line.indexOf(':');
  if (colonIdx === -1) return { label: '', value: line.trim() };
  return {
    label: line.slice(0, colonIdx).trim(),
    value: line.slice(colonIdx + 1).trim(),
  };
}

function parseDescription(description: string) {
  const lines = description.split('\n').filter((l) => l.trim());

  const courseCards: Array<{ title: string; date: string }> = [];
  const details: Array<{ label: string; value: string }> = [];
  const notices: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
      courseCards.push(parseCourseEntry(trimmed));
    } else if (trimmed.includes(' : ') || / :\S/.test(trimmed)) {
      details.push(parseDetailLine(trimmed));
    } else {
      notices.push(trimmed);
    }
  }

  return { courseCards, details, notices };
}

function getFirstImage(src?: string | string[]): string | undefined {
  if (!src) return undefined;
  return Array.isArray(src) ? src[0] : src;
}

/* ─────────────────────────────────────────────
   Schedule table data
───────────────────────────────────────────── */
type SectionTarget = 'digital-twin' | 'agent-ai';

interface ScheduleRow {
  name: string;
  target: SectionTarget;
  cells: Array<{ label: string; past?: boolean; pending?: boolean } | null>;
  /** 그룹 첫 행에만 설정. rowspan 수만큼 셀을 병합합니다. */
  groupLabel?: string;
  groupRowspan?: number;
}

const MONTHS = ['3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

const SCHEDULE_ROWS: ScheduleRow[] = [
  {
    name: '꿈꾸는아이(AI) Digital Twin 직무혁신',
    target: 'digital-twin',
    groupLabel: 'DT & Robot',
    groupRowspan: 6,
    cells: [
      { label: '26일', past: true },  // 3월 — 불가
      null,                           // 4월
      { label: '28일', past: true },              // 5월 — 신청 가능
      null,                           // 6월
      { label: '22일(수)' },  // 7월 — 불가
      null,                           // 8월
      { label: '17일', past: true },  // 9월 — 불가
      null,                           // 10월
      { label: '25일', past: true },  // 11월 — 불가
      null,                           // 12월
    ],
  },
  {
    name: '디지털트윈 환경 구축과 시뮬레이션 실습 과정',
    target: 'digital-twin',
    cells: [
      { label: '27일', past: true },  // 3월 — 불가
      null,                           // 4월
      { label: '29일', past: true },              // 5월 — 신청 가능
      null,                           // 6월
      { label: '23일(목)' },  // 7월 — 불가
      null,                           // 8월
      { label: '18일', past: true },  // 9월 — 불가
      null,                           // 10월
      { label: '26일', past: true },  // 11월 — 불가
      null,                           // 12월
    ],
  },
  {
    name: 'Omniverse 기반 Sim2Real Digital Twin 실습',
    target: 'digital-twin',
    cells: [
      null,                             // 3월
      { label: '23-24일', past: true }, // 4월 — 불가
      null,
      null,                             
      null,                             // 7월
      { label: '20-21일', past: true }, // 8월 — 불가
      null,                             // 9월
      { label: '22-23일', past: true }, // 10월 — 불가
      { label: '27일', past: true },    // 11월 — 불가
      null,                             // 12월
    ],
  },
  {
    name: 'Omniverse·Cosmos·Isaac Sim 통합으로 디지털트윈 시작하기',
    target: 'digital-twin',
    cells: [
      null, null, null,
      { label: '23일', past: true }, // 6월
      null, null, null, null, null, null,
    ],
  },
  {
    name: 'SimReady Digital Twin 구축과 활용을 위한 3D Asset 생성과 가상통합',
    target: 'digital-twin',
    cells: [
      null, null, null,
      { label: '24일', past: true }, // 6월
      null, null, null, null, null, null,
    ],
  },
  {
    name: 'Pysital Digital Twin 기반 로봇 자율시스템 Sim2Real 실증 실습',
    target: 'digital-twin',
    cells: [
      null, null, null,
      { label: '25일', past: true }, // 6월
      null, null, null, null, null, null,
    ],
  },
  {
    name: '에이전트 아키텍처 이론과 응용 설계',
    target: 'agent-ai',
    groupLabel: 'Agentic AI',
    groupRowspan: 1,
    cells: [
      null,                             // 3월
      { label: '17일', past: true },    // 4월 — 불가(회색)
      { label: '28일', past: true },                // 5월 — 신청 가능(보라)
      { label: '23일', past: true },     // 6월 
      { label: '28일(화)' },
      { label: '12일', pending: true },     // 8월
      { label: '', pending: true },
      { label: '2일', pending: true },     // 10월 
      { label: '', pending: true },
      { label: '4일', pending: true },     // 12월 
    ],
  },
];

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

function PosterImage({ src, alt }: { src?: string; alt: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className="w-full max-w-lg h-auto object-contain rounded-xl shadow-lg border border-gray-100 sticky top-8"
      />
    );
  }
  return (
    <div className="w-full max-w-lg aspect-[3/4] rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-400 text-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 opacity-40"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <span>포스터 이미지</span>
    </div>
  );
}

interface SectionPanelProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  title: string;
  imageSrc?: string;
  courseCards: Array<{ title: string; date: string }>;
  details: Array<{ label: string; value: string }>;
  notices: string[];
  applyHref: string;
  downloadHref: string;
}

function SectionPanel({
  sectionRef,
  title,
  imageSrc,
  courseCards,
  details,
  notices,
  applyHref,
  downloadHref,
}: SectionPanelProps) {
  return (
    <div
      ref={sectionRef}
      className="mb-20 mt-20 bg-white rounded-3xl p-8 md:p-12 scroll-mt-8 transition-[outline] duration-300"
    >
      <h2 className="text-3xl font-bold mb-10 pb-4 border-b border-gray-200 text-gray-900">
        {title}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left */}
        <div className="flex flex-col gap-6">
          {/* 교육 과정 안내 */}
          {details.length > 0 && (
            <div className="rounded-xl p-2">
              <h3 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b-2 border-blue-500 inline-block">
                교육 과정 안내
              </h3>
              <div className="flex flex-col gap-4">
                {details.map((d, idx) => (
                  <div key={idx} className="flex gap-3 leading-relaxed">
                    <div className="text-gray-700 font-semibold text-sm min-w-[110px] flex-shrink-0">
                      {d.label}:
                    </div>
                    <div className="text-gray-900 text-sm flex-1">{d.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 진행 예정 과정 */}
          {courseCards.length > 0 && (
            <div className="rounded-xl p-2">
              <h4 className="text-gray-900 font-bold text-base mb-3">진행 예정 과정</h4>
              <div className="text-gray-700 text-sm leading-relaxed space-y-4">
                {courseCards.map((c, idx) => (
                  <div
                    key={idx}
                    className="bg-blue-50/50 border border-blue-100 rounded-lg p-4"
                  >
                    <p className="text-gray-900 font-bold mb-2">
                      {idx + 1}. {c.title}
                    </p>
                    {c.date && <p className="text-gray-600 text-sm">{c.date}</p>}
                  </div>
                ))}

                {notices.map((n, idx) => (
                  <p key={idx} className={idx === 0 ? 'pt-3 border-t border-gray-100 mt-4' : ''}>
                    {n}
                  </p>
                ))}

                <p>
                  훈련 교안은 하단의{' '}
                  <span className="text-blue-600 font-bold mx-1">훈련 교안 다운로드</span>
                  버튼을 통해 언제든지 내려받으실 수 있습니다.
                </p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-3 mt-4">
            <a
              href={applyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center px-6 py-4 rounded-xl text-sm font-semibold bg-[#1F92DF] text-white hover:brightness-105 transition-all duration-200 shadow-md hover:bg-cyan-600"
            >
              과정 신청 바로가기
            </a>
            <a
              href={downloadHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center px-6 py-4 rounded-xl text-sm font-semibold bg-white text-[#1F92DF] border-2 border-[#1F92DF] hover:bg-[#E8F1F6] transition-all duration-200"
            >
              훈련 교안 다운로드
            </a>
          </div>
        </div>

        {/* Right – poster */}
        <div className="flex items-start justify-center lg:justify-end">
          <PosterImage src={imageSrc} alt={`${title} 포스터`} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function TrainingCheckinSection({ data }: TrainingCheckinSectionProps) {
  const digitalTwinRef = useRef<HTMLDivElement | null>(null);
  const agentAiRef = useRef<HTMLDivElement | null>(null);

  const DTDOWNLOAD_HREF =
    'https://drive.google.com/drive/folders/1SuZvyfbeNI7bmXlBc0LRJhwUErZlqdg6';
    const AADOWNLOAD_HREF =
    'https://drive.google.com/drive/folders/1ZFf79z1MvwM9szbJK_Ej0kIFiopq2Ss_';

  /* ── content1 파싱 (Digital Twin) ─────────────────────────────────── */
  const dtRaw = data.content1?.description ?? data.content ?? '';
  const dt = parseDescription(dtRaw);
  const dtApplyHref = data.content1?.link ??
    '';

  /* ── content2 파싱 (Agent AI) ─────────────────────────────────────── */
  const aaRaw = data.content2?.description ?? '';
  const aa = aaRaw
    ? parseDescription(aaRaw)
    : { courseCards: dt.courseCards, details: dt.details, notices: dt.notices };
  const aaApplyHref = data.content2?.link ??
    '';

  const firstImageSrc = getFirstImage(data.imageUrl);
  const secondImageSrc = getFirstImage(data.imageUrl2);

  /* Scroll helpers */
  function scrollToRef(ref: React.RefObject<HTMLDivElement | null>) {
    if (!ref.current) return;
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    ref.current.style.outline = '2px solid #1F92DF';
    ref.current.style.outlineOffset = '4px';
    setTimeout(() => {
      if (ref.current) {
        ref.current.style.outline = '';
        ref.current.style.outlineOffset = '';
      }
    }, 1400);
  }

  function handleBadgeClick(target: SectionTarget) {
    if (target === 'digital-twin') scrollToRef(digitalTwinRef);
    else scrollToRef(agentAiRef);
  }

  return (
    <div>
      {/* ── 수강 신청 안내 ── */}
      <div className="rounded-lg px-5 py-4 mb-7">
        <p className="text-sm font-bold text-amber-600 mb-2 flex items-center gap-1">
          💡 수강 신청 안내
        </p>
        <ul className="space-y-1">
          <li className="text-sm text-gray-700 flex gap-2">
            <span className="text-amber-500 font-bold flex-shrink-0">•</span>
            모든 교육 과정은 개강 3주 전 월요일부터 신청이 가능합니다.
          </li>
          <li className="text-sm text-gray-700 flex gap-2">
            <span className="text-amber-500 font-bold flex-shrink-0">•</span>
            원하시는 과정의 날짜 버튼을 클릭하시면 해당 신청 페이지로 바로 이동합니다.
          </li>
        </ul>
      </div>

      {/* ── 수강 일정표 ── */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#1E3A5F]">
                <th className="px-3 py-3 text-sm font-semibold text-white text-center whitespace-nowrap w-24">
                  분류
                </th>
                <th className="text-left pl-5 pr-4 py-3 text-sm font-semibold text-white w-64">
                  교육 과정명
                </th>
                {MONTHS.map((m) => (
                  <th
                    key={m}
                    className="px-2 py-3 text-sm font-semibold text-white text-center whitespace-nowrap"
                  >
                    {m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SCHEDULE_ROWS.map((row) => (
                <tr
                  key={row.name}
                  className="border-b border-gray-100 last:border-0 group transition-colors duration-150"
                >
                  {/* 그룹 셀: 첫 행에만 rowspan으로 렌더링 — hover 제외 */}
                  {row.groupLabel !== undefined && (
                    <td
                      rowSpan={row.groupRowspan}
                      className="px-2 py-3 text-center align-middle border-r border-gray-100 bg-white"
                    >
                      <div
                        className={`
                          inline-flex flex-col items-center justify-center gap-1
                          rounded-xl px-2 py-2 text-[11px] font-bold leading-tight
                          ${row.target === 'digital-twin'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-purple-50 text-purple-700 border border-purple-200'}
                        `}
                      >
                        {row.groupLabel.split(' & ').map((part, i, arr) => (
                          <span key={i}>
                            {part}{i < arr.length - 1 ? ' &' : ''}
                          </span>
                        ))}
                      </div>
                    </td>
                  )}
                  <td className="pl-5 pr-4 py-3 w-64 group-hover:bg-blue-50 transition-colors duration-150">
                    <p className="text-[13px] font-semibold text-gray-800 leading-snug break-keep">
                      {row.name}
                    </p>
                  </td>
                  {row.cells.map((cell, ci) => (
                    <td key={ci} className="px-2 py-3 text-center group-hover:bg-blue-50 transition-colors duration-150">
                      {cell === null ? (
                        <span className="text-gray-300 text-sm font-light">–</span>
                      ) : cell.pending ? (
                        /* 미정 — 짧은 컬러 바 */
                        <span className={`inline-block w-8 h-1.5 rounded-full ${
                          row.target === 'agent-ai'
                            ? 'bg-purple-200'   // Agent AI 미정 — 연한 보라
                            : 'bg-blue-200'     // DT 미정 — 연한 파랑
                        }`} />
                      ) : cell.past ? (
                        /* 신청 불가 — 회색 pill (target 무관하게 동일) */
                        <span className="inline-flex items-center justify-center min-w-[46px] px-2.5 py-1 rounded-full text-[12px] font-semibold cursor-default whitespace-nowrap bg-gray-100 text-gray-400">
                          {cell.label}
                        </span>
                      ) : (
                        /* 신청 가능 — 컬러 버튼 */
                        <button
                          type="button"
                          onClick={() => handleBadgeClick(row.target)}
                          className={`inline-flex items-center justify-center min-w-[46px] px-2.5 py-1 rounded-full text-[12px] font-semibold text-white whitespace-nowrap hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ${
                            row.target === 'agent-ai'
                              ? 'bg-[#7C3AED]'   // Agent AI — 보라
                              : 'bg-[#1F92DF]'   // DT & Robot — 파랑
                          }`}
                        >
                          {cell.label}
                        </button>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 px-5 py-3 border-t border-gray-100 bg-gray-50 flex-wrap">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1F92DF] flex-shrink-0" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] flex-shrink-0" />
            신청 가능 일정
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="w-8 h-1.5 rounded-full bg-blue-200 flex-shrink-0" />
            <span className="w-8 h-1.5 rounded-full bg-purple-200 flex-shrink-0" />
            신청 일정 미정
          </div>
        </div>
      </div>

      {/* ── Digital Twin 신청 섹션 ── */}
      {data.title && (
        <SectionPanel
          sectionRef={digitalTwinRef}
          title={data.title}
          imageSrc={firstImageSrc}
          courseCards={dt.courseCards}
          details={dt.details}
          notices={dt.notices}
          applyHref={dtApplyHref}
          downloadHref={DTDOWNLOAD_HREF}
        />
      )}

      {/* ── Agent AI 신청 섹션 ── */}
      {data.title2 && (
        <SectionPanel
          sectionRef={agentAiRef}
          title={data.title2}
          imageSrc={secondImageSrc}
          courseCards={aa.courseCards}
          details={aa.details}
          notices={aa.notices}
          applyHref={aaApplyHref}
          downloadHref={AADOWNLOAD_HREF}
        />
      )}
    </div>
  );
}