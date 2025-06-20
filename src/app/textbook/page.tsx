import Image from "next/image";
import Link from "next/link";

function drawCard(key: string, href: string) {
  return (
    <Link href={href} target="_blank">
      <Image
        className="mb-2"
        src={`/images/textbook/textbook_button_${key}.png`}
        alt={key}
        width={1e6}
        height={1e6}
      />
    </Link>
  );
}

function drawPage1() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <h1 className="text-3xl font-bold mb-2">
        꿈꾸는아이(AI) Textbook Download
      </h1>

      <p className="text-gray-500 mb-4">
        광주과학기술원(GIST) AI대학원은 고등학생들이 인공지능을 쉽고 재미있게
        배울 수 있도록, 총 12개 토픽으로 구성된 50차시 분량의 교육자료를
        기획·제작하였습니다.<br /> 빠르게 발전하는 인공지능을{" "}
        <b>Model ZOO & AI Playground</b>라는 콘셉트로 풀어내어, 교사는
        능동적으로 가르치고, 학생은 자연스럽게 이해하며 익힐 수 있도록
        구성하였습니다.<br /> 본 교육자료를 통해 학생들은 다가올 인공지능 사회에서
        자신의 꿈을 구체화할 수 있는 역량을 기르고, 교사에게는 인공지능 교육을
        위한 든든한 길잡이가 되기를 기대합니다.
      </p>

      <div className="flex flex-row justify-stretch gap-2">
        <div className="flex-5">
          <Image
            className=""
            src="/images/textbook/textbook_hero_1.png"
            alt="Model ZOO"
            width={1e6}
            height={1e6}
          />
        </div>
        <div className="flex flex-2 flex-col mt-1">
          {drawCard(
            "prologue",
            "https://drive.google.com/file/d/11-XtfF7jLeYZhUt1gijXpNNGFjGJGAAV/view?usp=drive_link"
          )}
          {drawCard("zoo", "about:blank")}
          {drawCard("dl", "about:blank")}
          {drawCard("data", "about:blank")}
          {drawCard("hyperai", "about:blank")}
          {drawCard("dna", "about:blank")}
          {drawCard("epilogue", "about:blank")}
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
          <Image
            className=""
            src="/images/textbook/textbook_hero_2.png"
            alt="AI Playground"
            width={1e6}
            height={1e6}
          />
        </div>
        <div className="flex flex-2 flex-col justify-center mt-1 gap-4">
          {drawCard("ml", "about:blank")}
          {drawCard("llm", "about:blank")}
          {drawCard("data_eng", "about:blank")}
          {drawCard("dt", "about:blank")}
          {drawCard("genai", "about:blank")}
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
        height={0}
      />

      <div className="grid grid-cols-3 pt-4 px-4 max-w-221 items-start gap-x-6">
        {drawCard("zoo", "about:blank")}
        {drawCard("ml", "about:blank")}
        {drawCard("dl", "about:blank")}
        {drawCard("dt", "about:blank")}
        {drawCard("data", "about:blank")}
        {drawCard("genai", "about:blank")}
      </div>
    </div>
  );
}

export default function TextbookPage() {
  return (
    <div className="pt-6">
      {drawPage1()}
      {drawPage2()}
      {drawPage3()}
    </div>
  );
}
