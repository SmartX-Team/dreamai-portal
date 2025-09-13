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
          src="/images/Korea_GJ.png"
          alt="광주광역시"
          width={36}
          height={1e6}
        />
        <h1 className="text-3xl font-bold mb-2">꿈꾸는아이(AI) Textbook</h1>
      </div>

      <p className="text-gray-500 mb-4">
        광주광역시교육청의 지원으로 광주과학기술원(GIST) AI대학원은 교육 현장의
        여러 선생님들과 협력하여 광주 지역 고등학생들이 인공지능 교육을 흥미롭게
        접할 수 있도록 꿈꾸는 아이(AI) 교육자료를 개발했다. 이 교육자료는
        급변하는 디지털전환 시대를 살아갈 학생들이 다가오는 인공지능 사회를
        주도적으로 준비하도록, 글로벌 시각에서 기획된 AI 교육 콘텐츠이다. 꿈꾸는
        아이(AI)는 &apos;Model ZOO(모델 동물원)&apos; 24차시와 &apos;AI
        Playground(인공지능 놀이터)&apos; 26차시로 구성된 총 50차시 분량의
        인공지능 교육자료로, 생성되는 데이터를 이해하여 인공지능에 접목시키는
        원리를 습득하는 것으로 부터 선별된 AI 모델들을 학습시키고 추론으로
        검증하기까지를 포함하는 인공지능 전체 과정을 체험적으로 공부하도록
        준비되었다.
      </p>

      <div className="flex flex-row justify-stretch gap-2">
        <div className="flex-5">
          <h1 className="text-2xl font-bold">
            Model ZOO: 동물에 비유된 개념으로 흥미롭게 배우는 인공지능 기본 개념
            및 모델 교육
          </h1>

          <Image
            className=""
            src="/images/textbook/textbook_hero_1.png"
            alt="Model ZOO"
            width={1e6}
            height={1e6}
          />
        </div>
        <div className="flex flex-2 flex-col mt-1">
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
            src="/images/textbook/textbook_hero_2.png"
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

export default function TextbookPage() {
  return (
    <div className="pt-6">
      {drawPage1()}
      {drawPage2()}
      {/* {drawPage3()} */}
    </div>
  );
}
