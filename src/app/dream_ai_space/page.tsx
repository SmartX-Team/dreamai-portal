import data from "./dream_ai_space.json";

type SpaceData = {
  hero: {
    label: string;
    title: string;
    subtitle: string;
  };
  video: {
    title: string;
    description: string;
    url: string;
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

function getYoutubeEmbedUrl(url: string) {
  try {
    const parsedUrl = new URL(url);

    // https://youtu.be/VIDEO_ID
    if (parsedUrl.hostname === "youtu.be") {
      const videoId = parsedUrl.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // https://www.youtube.com/watch?v=VIDEO_ID
    if (
      parsedUrl.hostname === "www.youtube.com" ||
      parsedUrl.hostname === "youtube.com"
    ) {
      const videoId = parsedUrl.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    return url;
  } catch {
    return url;
  }
}

export default function DreamAiSpacePage() {
  const { hero, video, overview, gallery } = spaceData;

  const youtubeEmbedUrl = getYoutubeEmbedUrl(video.url);

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
          margin-bottom: 2.5rem;
        }

        .space-label {
          display: inline-block;
          font-size: 13px;
          font-weight: 700;
          color: #174B8A;
          background: #E6F1FB;
          border: 1px solid #B9D7F3;
          border-radius: 999px;
          padding: 6px 13px;
          margin-bottom: 1rem;
        }

        .space-title {
          font-size: 44px;
          font-weight: 700;
          color: #111;
          margin: 0 0 0.85rem;
          letter-spacing: -0.04em;
          line-height: 1.2;
        }

        .space-subtitle {
          font-size: 18px;
          color: #666;
          margin: 0;
          line-height: 1.7;
        }

        .space-section {
          margin-bottom: 3.5rem;
        }

        .section-title {
          font-size: 25px;
          font-weight: 700;
          color: #111;
          margin: 0 0 0.65rem;
          letter-spacing: -0.03em;
          line-height: 1.4;
        }

        .section-desc {
          font-size: 16px;
          color: #666;
          margin: 0 0 1.5rem;
          line-height: 1.75;
        }

        .video-card {
          width: 100%;
          background: #000;
          border: 1px solid #E3E5E8;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.06);
        }

        .video-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #000;
        }

        .video-frame {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .overview-card {
          background: #FAFBFC;
          border: 1px solid #E3E5E8;
          border-radius: 18px;
          overflow: hidden;
        }

        .overview-text {
          padding: 1.75rem 2rem;
        }

        .overview-title {
          font-size: 24px;
          font-weight: 700;
          color: #111;
          margin: 0 0 0.5rem;
          letter-spacing: -0.03em;
          line-height: 1.4;
        }

        .overview-subtitle {
          font-size: 16px;
          color: #174B8A;
          margin: 0 0 0.85rem;
          font-weight: 600;
          line-height: 1.6;
        }

        .overview-desc {
          font-size: 16px;
          color: #666;
          margin: 0;
          line-height: 1.8;
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

          .space-hero {
            margin-bottom: 2rem;
          }

          .space-title {
            font-size: 36px;
          }

          .space-subtitle {
            font-size: 16px;
          }

          .section-title {
            font-size: 22px;
          }

          .section-desc {
            font-size: 15px;
          }

          .overview-text {
            padding: 1.5rem;
          }

          .overview-title {
            font-size: 21px;
          }

          .overview-subtitle {
            font-size: 15px;
          }

          .overview-desc {
            font-size: 15px;
          }

          .space-section {
            margin-bottom: 3rem;
          }

          .gallery-list {
            gap: 1rem;
          }

          .video-card {
            border-radius: 14px;
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
          <h2 className="section-title">{video.title}</h2>
          <p className="section-desc">{video.description}</p>

          <div className="video-card">
            <div className="video-wrap">
              <iframe
                className="video-frame"
                src={youtubeEmbedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
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