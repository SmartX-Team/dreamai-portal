import contentData from "@/data/contents.json";

export default function ContentsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-[30px] text-center">
        {contentData.title}
      </h1>

      <h1 className="text-3xl font-bold mt-[200px] mb-6 pl-4 border-l-4 border-blue-500">
        {contentData.breadcrumb}
      </h1>

      {contentData.heroImageUrl && (
        <div className="w-full mb-12">
          <img
            src={contentData.heroImageUrl}
            alt="GIST K-하이테크 플랫폼 로드맵"
            className="w-full max-w-5xl mx-auto mb-[150px]"
          />
        </div>
      )}

      {contentData.sections
        .filter((section) => section.layout)
        .map((section, idx) => (
          <section key={idx} className="mb-[150px]">
            <h2 className="text-3xl font-bold mt-[200px] mb-6 pl-4 border-l-4 border-blue-500">
              {section.title}
            </h2>

            <div className="flex justify-center w-full">
              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)] max-w-6xl w-full items-start gap-14">
                <div className="flex justify-end">
                  <img
                    src={section.imageUrl}
                    alt={section.title}
                    className="w-full max-w-[400px] object-contain"
                  />
                </div>

                <div className="flex flex-col justify-start space-y-6">
                  {section.descriptionBlocks?.map((block, i) => (
                    <div key={i} className="flex items-start gap-8">
                      <span
                        className={`text-[88px] leading-[1] font-extrabold w-24 flex-shrink-0 ${block.numberColor}`}
                      >
                        {block.number}
                      </span>
                      <div>
                        <p
                          className={`font-semibold text-[22px] ${block.highlightColor}`}
                        >
                          {block.highlight}
                        </p>
                        <p className="text-[16px] text-gray-700 whitespace-pre-line">
                          {block.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
    </div>
  );
}
