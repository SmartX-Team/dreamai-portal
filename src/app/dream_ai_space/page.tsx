import spaceData from '@/data/dream_ai_space.json';

export default function TrainingPage() {
    const section = spaceData.sections[0];

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-2 ">{spaceData.title}</h1>

            {spaceData.breadcrumb && (
                <p className="text-sm text-gray-500 mb-[150px]">{spaceData.breadcrumb}</p>
            )}

            {section && (
                <div className="w-full mb-12 text-center">

                    {section.subtitle && (
                        <h2 className="text-xl font-bold mb-1 text-gray-700 text-center">{section.subtitle}</h2>
                    )}

                    <h3 className="text-3xl font-bold mb-4 text-space-blue text-center">{section.title}</h3>

                    {section.imageUrl && (
                        <div className="flex justify-center mb-[150px]">
                            <img
                                src={section.imageUrl}
                                alt={section.title}
                                className="max-w-5xl w-full object-contain block"
                            />
                        </div>
                    )}
                </div>
            )}

            {section.ppt_imageUrl && section.ppt_imageUrl.length > 0 && (
                <div>
                    {section.ppt_imageUrl.map((url, idx) => (
                        <div key={idx} className="flex justify-center">
                            <img
                                src={url}
                                alt={`PPT Slide ${idx + 1}`}
                                className="w-full max-w-5xl object-contain"
                            />
                        </div>
                    ))}
                </div>
            )}







        </div>
    );
}