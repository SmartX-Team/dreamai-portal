import data from "./crosstraining.json";

type Status = "완료" | "진행중" | "예정";

type TrainingItem = {
  title: string;
  description: string;
  organization: string;
  date: string;
  status: Status;
};

type YearGroup = {
  year: number;
  items: TrainingItem[];
};

type RawTrainingItem = {
  title: string;
  description: string;
  organization: string;
  date: string;
  status: string;
};

type RawYearGroup = {
  year: number;
  items: RawTrainingItem[];
};

const CURRENT_YEAR = 2026;

const statusStyle: Record<Status, string> = {
  완료: "badge-done",
  "진행중": "badge-ongoing",
  예정: "badge-upcoming",
};

function isStatus(status: string): status is Status {
  return status === "완료" || status === "진행중" || status === "예정";
}

function StatusBadge({ status }: { status: Status }) {
  return <span className={`badge ${statusStyle[status]}`}>{status}</span>;
}

function TrainingCard({
  item,
  isCurrentYear,
}: {
  item: TrainingItem;
  isCurrentYear: boolean;
}) {
  return (
    <div className={`item ${isCurrentYear ? "item-current" : ""}`}>
      <div className="item-content">
        <p className="item-title">{item.title}</p>
        <p className="item-desc">{item.description}</p>
      </div>

      <div className="item-meta">
        <p className="item-org">{item.organization}</p>
        <p className="item-date">{item.date}</p>
        <StatusBadge status={item.status} />
      </div>
    </div>
  );
}

function YearBlock({ group }: { group: YearGroup }) {
  const isCurrentYear = group.year === CURRENT_YEAR;

  return (
    <section className={`year-block ${isCurrentYear ? "current-year" : ""}`}>
      <div className="year-header">
        <span className="year-label">{group.year}</span>
        <span className="year-count">{group.items.length}건</span>
        <div className="year-line" />
      </div>

      <div className="items">
        {group.items.map((item, i) => (
          <TrainingCard
            key={`${group.year}-${i}`}
            item={item}
            isCurrentYear={isCurrentYear}
          />
        ))}
      </div>
    </section>
  );
}

export default function CrossTrainingPage() {
  const years: YearGroup[] = (data.years as RawYearGroup[])
    .map((group) => ({
      year: group.year,
      items: group.items.map((item) => ({
        ...item,
        status: isStatus(item.status) ? item.status : "예정",
      })),
    }))
    .reverse();

  return (
    <>
      <style>{`
        .cross-training-page {
          max-width: 1240px;
          margin: 0 auto;
          padding: 2rem 2rem 4rem;
          font-family: inherit;
          background: #fff;
        }

        .page-title {
          font-size: 26px;
          font-weight: 500;
          color: #111;
          margin: 0 0 0.3rem;
        }

        .page-subtitle {
          font-size: 14px;
          color: #888;
          margin: 0 0 3rem;
        }

        .year-block {
          margin-bottom: 2.75rem;
        }

        .year-block.current-year {
          background: linear-gradient(180deg, #F5F8FF 0%, #FFFFFF 100%);
          border: 1px solid #E1E8F5;
          border-radius: 22px;
          padding: 1.5rem 1.5rem 1.75rem;
          margin-bottom: 3rem;
        }

        .year-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 1.5rem;
        }

        .year-label {
          font-size: 28px;
          font-weight: 500;
          color: #111;
          line-height: 1;
        }

        .current-year .year-label {
          color: #174B8A;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .year-count {
          font-size: 12px;
          color: #aaa;
          background: #f5f5f5;
          border: 0.5px solid #e5e5e5;
          border-radius: 99px;
          padding: 2px 10px;
        }

        .current-year .year-count {
          color: #174B8A;
          background: #fff;
          border-color: #C9D9EE;
        }

        .year-line {
          flex: 1;
          border-top: 0.5px solid #e0e0e0;
        }

        .current-year .year-line {
          border-top-color: #C9D9EE;
        }

        .items {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .item {
          background: #FAFBFC;
          border: 1px solid #E3E5E8;
          border-radius: 13px;
          padding: 1.25rem 1.5rem;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 170px;
          gap: 20px;
          align-items: start;
        }

        .item-current {
          background: #fff;
          border-color: #D8E2F0;
          box-shadow: 0 8px 20px rgba(23, 75, 138, 0.06);
        }

        .item-title {
          font-size: 16px;
          font-weight: 600;
          color: #111;
          margin: 0 0 8px;
          line-height: 1.45;
          letter-spacing: -0.02em;
        }

        .current-year .item-title {
          color: #0F2340;
        }

        .item-desc {
          font-size: 14px;
          color: #818892;
          margin: 0;
          line-height: 1.6;
          word-break: keep-all;
        }

        .item-meta {
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 7px;
          min-width: 0;
        }

        .item-org {
          font-size: 13px;
          color: #707783;
          margin: 0;
          white-space: nowrap;
          line-height: 1.4;
        }

        .item-date {
          font-size: 13px;
          color: #9299A3;
          margin: 0;
          white-space: nowrap;
          line-height: 1.4;
        }

        .badge {
          display: inline-block;
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 99px;
          white-space: nowrap;
          line-height: 1;
        }

        .badge-done {
          background: #f5f5f5;
          color: #777;
          border: 0.5px solid #dcdcdc;
        }

        .badge-ongoing {
          background: #E6F1FB;
          color: #185FA5;
          border: 0.5px solid #B5D4F4;
        }

        .badge-upcoming {
          background: #EAF3DE;
          color: #3B6D11;
          border: 0.5px solid #C0DD97;
        }

        @media (max-width: 768px) {
          .cross-training-page {
            padding: 2rem 1rem 3rem;
          }

          .year-block.current-year {
            padding: 1.25rem 1rem;
            border-radius: 18px;
          }

          .year-header {
            gap: 10px;
          }

          .year-label {
            font-size: 24px;
          }

          .item {
            grid-template-columns: 1fr;
            padding: 1.1rem 1.2rem;
          }

          .item-meta {
            text-align: left;
            align-items: flex-start;
          }

          .item-org,
          .item-date {
            white-space: normal;
          }
        }
      `}</style>

      <div className="cross-training-page">
        <h1 className="page-title">Cross Training</h1>
        <p className="page-subtitle">
          GIST AI 융합학과의 교육 협력 프로그램 이력입니다.
        </p>

        {years.map((group) => (
          <YearBlock key={group.year} group={group} />
        ))}
      </div>
    </>
  );
}