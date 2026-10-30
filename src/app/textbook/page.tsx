import Image from "next/image";
import Link from "next/link";

import data from "./contents.json";

function drawCard(item: string) {
  return (
    <Link
      key={item}
      href={{
        pathname: "/textbook/content",
        query: {
          id: item,
        },
      }}
      target="_blank"
    >
      <Image
        className="mb-2"
        src={`/images/textbook/textbook_button_${item}.png`}
        alt={item}
        width={400}
        height={1e6}
      />
    </Link>
  );
}

function drawPage1() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-row">
        <Image
          className="mb-2 mr-2"
          src="/images/DREAMAI_LOGO.png"
          alt="광주광역시"
          width={36}
          height={1e6}
        />
        <h1 className="text-3xl font-bold mb-2">꿈꾸는아이(AI) Textbook</h1>
      </div>

      <p className="text-gray-500 mb-4">
        전남광주통합특별시교육청(구 광주광역시교육청)의 지원으로 GIST AI대학원이 개발한 AI교육자료
        『꿈꾸는 AI』 v1.0을 GIST '꿈꾸는 아이(AI) AX 교육·훈련센터'에서 최신 AI 기술과 트렌트를
        반영해 v1.1로 업데이트하였습니다. AI를 배우고 싶은 사람이라면 누구나 자유롭게 활용할 수
        있습니다.
      </p>

      <h1 className="text-2xl font-bold mb-2">
        Model ZOO: 동물에 비유된 개념으로 흥미롭게 배우는 인공지능 기본 개념
        및 모델 교육
      </h1>

      <div className="flex flex-row items-stretch gap-2">
        <div className="flex-5">
          <Image
            src="/images/textbook/modelzoo_v2.png"
            alt="Model ZOO"
            width={1e6}
            height={1e6}
          />
        </div>

        <div className="flex flex-2 flex-col justify-between">
          {data.catalog.find((e) => e.id == "page1")?.items.map(drawCard)}
        </div>
      </div>
    </div>
  );
}

function drawPage2() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-6">
      <div className="flex flex-row justify-stretch gap-2">
        <div className="flex-5">
          <h1 className="text-2xl font-bold">
            AI Playground: 인공지능 놀이터에서 심화 체험으로 배우는 실증형
            인공지능 교육
          </h1>

          <Image
            className=""
            src="/images/textbook/playground_v2.png"
            alt="AI Playground"
            width={1e6}
            height={1e6}
          />
        </div>
        <div className="flex flex-2 flex-col justify-center mt-1 gap-4">
          {data.catalog.find((e) => e.id == "page2")?.items.map(drawCard)}
        </div>
      </div>
    </div>
  );
}

/*
function drawPage3() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <Image
        className="ps-2"
        src="/images/textbook/textbook_header_3.png"
        alt="AI Playground"
        width={700}
        height={1e6}
      />

      <div className="grid grid-cols-3 pt-4 px-4 max-w-221 items-start gap-x-6">
        {data.catalog.find((e) => e.id == "page3")?.items.map(drawCard)}
      </div>
    </div>
  );
}
*/

export default function TextbookPage() {
  return (
    <div className="pt-6">
      {drawPage1()}
      {drawPage2()}
      {/* {drawPage3()} */}
    </div>
  );
}