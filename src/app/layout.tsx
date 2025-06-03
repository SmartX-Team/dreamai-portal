"use client";

import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import "../styles/styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50">
        <header className="bg-white border-b px-6 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Image
                  src="/images/GIST.png"
                  alt="GIST 로고"
                  width={50}
                  height={50}
                />
              </Link>

              <Link href="https://ai.gist.ac.kr/ai/" target="_blank">
                <Image
                  src="/images/AIGS.png"
                  alt="AIGS"
                  width={140}
                  height={40}
                />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="https://scent.gist.ac.kr/" target="_blank">
                <Image
                  src="/images/SCENT.png"
                  alt="슈퍼컴퓨팅센터"
                  width={140}
                  height={40}
                />
              </Link>

              <Link href="https://www.hrd4u.or.kr/hrd4u" target="_blank">
                <Image
                  src="/images/KHP.png"
                  alt="KHP"
                  width={160}
                  height={40}
                />
              </Link>
            </div>
          </div>
        </header>

        <main className="pb-12">{children}</main>
      </body>
    </html>
  );
}
