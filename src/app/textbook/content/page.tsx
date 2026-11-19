"use client";

import { PageWidgets } from "@/lib/portal-content/page-widgets";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { usePortalPage } from "@/lib/portal-content/provider";

function Content() {
  const editableCopy = usePortalPage("/textbook").display;
  const data = usePortalPage("/textbook");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  if (id === null) {
    return <div>Content not found</div>;
  }

  const content = data.contents[0].find((e) => e.id == id);
  if (content === undefined) {
    return null;
  }

  const links = [];
  if (content.hrefPdf !== undefined) {
    links.push(
      <Link key="pdf" href={content.hrefPdf} target="_blank">
        <Image
          src={editableCopy["Content 이미지 1"]}
          alt="Download as .pdf"
          width={62}
          height={1e6}
        />
      </Link>
    );
  }
  if (content.hrefExp !== undefined) {
    links.push(
      <Link key="exp" href={content.hrefExp} target="_blank">
        <Image
          src={editableCopy["Content 이미지 2"]}
          alt="Show exp"
          width={80}
          height={1e6}
        />
      </Link>
    );
  }
 
  if (content["hrefLink"] !== undefined) {
    links.push(
      <Link key="link" href={content["hrefLink"]} target="_blank">
        <Image
          src={editableCopy["Content 이미지 3"]} 
          alt="New Link"
          width={80}
          height={1e6}
        />
      </Link>
    );
  }

  return (
    <div className="grid justify-center pt-8">
      <PageWidgets zone="textbook.detail" nodes={{
        links: (
          <div className="flex justify-end gap-4 pe-8">{links}</div>
        ),
        cover: (
          <div className="flex justify-center max-w-330">
        <Image
          src={`/images/textbook/contents/${content.id}.png`}
          alt={`${content.id}`}
          width={1e6}
          height={1e6}
        />
      </div>
        ),
      }} />
    </div>
  );
}

export default function TextbookContentPage() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}
