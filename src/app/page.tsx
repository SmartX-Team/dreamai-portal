"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

function buildHeader(config: AppConfig, header: AppHeader) {
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <p className="fixed left-0 top-0 flex w-full justify-center lg:static lg:w-auto">
        &nbsp;
        <code className="font-mono font-bold">
          <Image
            src={`${config.minio.baseUrl}/images${header.imageUrl}`}
            alt={header.name}
            className="dark:invert"
            width={120}
            height={32}
            priority
          />
        </code>
      </p>
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href={header.secondary.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={`${config.minio.baseUrl}/images${header.secondary.imageUrl}`}
            alt={header.name}
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
        </a>
      </div>
    </div>
  );
}

function buildHero(config: AppConfig, hero: Hero) {
  return (
    <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src={`${config.minio.baseUrl}/images${hero.imageUrl}`}
        alt={hero.name}
        width={600}
        height={200}
        priority
      />
    </div>
  );
}

function buildCatalogCategory(config: AppConfig, category: CatalogCategory) {
  return (
    <a
      key={`catalog/${category.name}`}
      href={category.url}
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 className={`mb-3 text-2xl font-semibold`}>
        {category.title}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
        {category.description}
      </p>
    </a>
  );
}

function buildCatalog(config: AppConfig, catalog: Catalog) {
  return (
    <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
      {catalog.categories.map((category) =>
        buildCatalogCategory(config, category)
      )}
    </div>
  );
}

export default function Home() {
  const [data, setData] = useState<App | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load app data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://api.minio.mobilex.kr/seoin/public/app.json"
        );

        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }

        const appData: App = await response.json();
        setData(appData);
      } catch (error) {
        console.error("Error fetching JSON:", error);
        setError(error instanceof Error ? error.message : "Unexpected Error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return;

  const header = buildHeader(data.config, data.header);
  const hero = buildHero(data.config, data.hero);
  const catalog = buildCatalog(data.config, data.catalog);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {header}
      {hero}
      {catalog}
    </main>
  );
}
