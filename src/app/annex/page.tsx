import data from "./annex.json";

type OpeningStatus = "예정" | "진행 중" | "완료";

type AnnexData = {
  hero: {
    title: string;
    subtitle: string;
  };
  opening: {
    title: string;
    description: string;
    date: string;
    day: string;
    time: string;
    status: OpeningStatus;
  };
  space: {
    title: string;
    description: string;
  };
};

const annexData = data as AnnexData;

const statusClass: Record<OpeningStatus, string> = {
  예정: "badge-upcoming",
  "진행 중": "badge-ongoing",
  완료: "badge-done",
};

export default function AnnexPage() {
  const { hero, opening, space } = annexData;

  return (
    <>
      <style>{`
        .annex-page {
          max-width: 1120px;
          margin: 0 auto;
          padding: 4rem 2rem 5rem;
          font-family: inherit;
          background: #fff;
        }

        .annex-hero {
          margin-bottom: 3rem;
        }

        .annex-label {
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          color: #174B8A;
          background: #E6F1FB;
          border: 1px solid #B9D7F3;
          border-radius: 999px;
          padding: 5px 12px;
          margin-bottom: 1rem;
        }

        .annex-title {
          font-size: 42px;
          font-weight: 700;
          color: #111;
          margin: 0 0 0.75rem;
          letter-spacing: -0.04em;
        }

        .annex-subtitle {
          font-size: 16px;
          color: #777;
          margin: 0;
          line-height: 1.6;
        }

        .annex-section {
          margin-bottom: 1.5rem;
        }

        .section-title {
          font-size: 22px;
          font-weight: 700;
          color: #111;
          margin: 0 0 1rem;
          letter-spacing: -0.03em;
        }

        .opening-card {
          background: #FAFBFC;
          border: 1px solid #E3E5E8;
          border-radius: 18px;
          padding: 1.5rem 1.75rem;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 1.5rem;
          align-items: center;
        }

        .opening-title {
          font-size: 18px;
          font-weight: 700;
          color: #111;
          margin: 0 0 0.5rem;
          letter-spacing: -0.03em;
        }

        .opening-desc {
          font-size: 14px;
          color: #777;
          margin: 0;
          line-height: 1.6;
        }

        .opening-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          text-align: right;
        }

        .opening-date {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin: 0;
          white-space: nowrap;
        }

        .opening-time {
          font-size: 13px;
          color: #777;
          margin: 0;
          white-space: nowrap;
        }

        .badge {
          display: inline-block;
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 999px;
          line-height: 1;
          white-space: nowrap;
        }

        .badge-upcoming {
          background: #EAF3DE;
          color: #3B6D11;
          border: 0.5px solid #C0DD97;
        }

        .badge-ongoing {
          background: #E6F1FB;
          color: #185FA5;
          border: 0.5px solid #B5D4F4;
        }

        .badge-done {
          background: #f5f5f5;
          color: #777;
          border: 0.5px solid #dcdcdc;
        }

        .space-card {
          background: #fff;
          border: 1px solid #E3E5E8;
          border-radius: 18px;
          padding: 1.5rem 1.75rem;
        }

        .space-desc {
          font-size: 14px;
          color: #777;
          margin: 0;
          line-height: 1.7;
        }

        @media (max-width: 768px) {
          .annex-page {
            padding: 3rem 1rem 4rem;
          }

          .annex-title {
            font-size: 34px;
          }

          .opening-card {
            grid-template-columns: 1fr;
          }

          .opening-meta {
            align-items: flex-start;
            text-align: left;
          }
        }
      `}</style>

      <main className="annex-page">
        <section className="annex-hero">
          <span className="annex-label">ANNEX</span>
          <h1 className="annex-title">{hero.title}</h1>
          <p className="annex-subtitle">{hero.subtitle}</p>
        </section>

        <section className="annex-section">
          <h2 className="section-title">Opening</h2>

          <div className="opening-card">
            <div>
              <h3 className="opening-title">{opening.title}</h3>
              <p className="opening-desc">{opening.description}</p>
            </div>

            <div className="opening-meta">
              <p className="opening-date">
                {opening.date}({opening.day})
              </p>
              <p className="opening-time">{opening.time}</p>
              <span className={`badge ${statusClass[opening.status]}`}>
                {opening.status}
              </span>
            </div>
          </div>
        </section>

        <section className="annex-section">
          <h2 className="section-title">{space.title}</h2>

          <div className="space-card">
            <p className="space-desc">{space.description}</p>
          </div>
        </section>
      </main>
    </>
  );
}