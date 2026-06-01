import data from "./dream_ai_space.json";

type SpaceData = {
  hero: {
    label: string;
    title: string;
    subtitle: string;
  };
  overview: {
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
  };
  gallery: {
    title: string;
    description: string;
    images: string[];
  };
};

const spaceData = data as SpaceData;

export default function DreamAiSpacePage() {
  const { hero, overview, gallery } = spaceData;

  return (
    <>
      <style>{`
        .space-page {
          max-width: 1120px;
          margin: 0 auto;
          padding: 4rem 2rem 5rem;
          font-family: inherit;
          background: #fff;
        }

        .space-hero {
          margin-bottom: 3rem;
        }

        .space-label {
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

        .space-title {
          font-size: 42px;
          font-weight: 700;
          color: #111;
          margin: 0 0 0.75rem;
          letter-spacing: -0.04em;
        }

        .space-subtitle {
          font-size: 16px;
          color: #777;
          margin: 0;
          line-height: 1.6;
        }

        .space-section {
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: 22px;
          font-weight: 700;
          color: #111;
          margin: 0 0 0.5rem;
          letter-spacing: -0.03em;
        }

        .section-desc {
          font-size: 14px;
          color: #777;
          margin: 0 0 1.25rem;
          line-height: 1.7;
        }

        .overview-card {
          background: #FAFBFC;
          border: 1px solid #E3E5E8;
          border-radius: 18px;
          overflow: hidden;
        }

        .overview-text {
          padding: 1.5rem 1.75rem;
        }

        .overview-title {
          font-size: 20px;
          font-weight: 700;
          color: #111;
          margin: 0 0 0.4rem;
          letter-spacing: -0.03em;
        }

        .overview-subtitle {
          font-size: 14px;
          color: #174B8A;
          margin: 0 0 0.75rem;
          font-weight: 600;
        }

        .overview-desc {
          font-size: 14px;
          color: #777;
          margin: 0;
          line-height: 1.7;
        }

        .overview-image-wrap {
          width: 100%;
          background: #fff;
          border-top: 1px solid #E3E5E8;
        }

        .overview-image {
          display: block;
          width: 100%;
          height: auto;
        }

        .gallery-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .gallery-card {
          width: 100%;
          background: #FAFBFC;
          border: 1px solid #E3E5E8;
          border-radius: 16px;
          overflow: hidden;
        }

        .gallery-image {
          display: block;
          width: 100%;
          height: auto;
        }

        @media (max-width: 768px) {
          .space-page {
            padding: 3rem 1rem 4rem;
          }

          .space-title {
            font-size: 34px;
          }

          .gallery-list {
            gap: 1rem;
          }
        }
      `}</style>

      <main className="space-page">
        <section className="space-hero">
          <span className="space-label">{hero.label}</span>
          <h1 className="space-title">{hero.title}</h1>
          <p className="space-subtitle">{hero.subtitle}</p>
        </section>

        <section className="space-section">
          <div className="overview-card">
            <div className="overview-text">
              <h2 className="overview-title">{overview.title}</h2>
              <p className="overview-subtitle">{overview.subtitle}</p>
              <p className="overview-desc">{overview.description}</p>
            </div>

            <div className="overview-image-wrap">
              <img
                className="overview-image"
                src={overview.imageUrl}
                alt={overview.title}
              />
            </div>
          </div>
        </section>

        <section className="space-section">
          <h2 className="section-title">{gallery.title}</h2>
          <p className="section-desc">{gallery.description}</p>

          <div className="gallery-list">
            {gallery.images.map((imageUrl, index) => (
              <div className="gallery-card" key={imageUrl}>
                <img
                  className="gallery-image"
                  src={imageUrl}
                  alt={`Dream-AI SPACE 소개자료 ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}