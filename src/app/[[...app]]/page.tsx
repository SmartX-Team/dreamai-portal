"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function handleEmptyArray<T>(input: T[] | undefined): T[] | undefined {
  return input === undefined || input.length == 0 ? undefined : input;
}

function handleEmptyString(input: string | undefined): string | undefined {
  return input === undefined || input === "" ? undefined : input.trim();
}

function buildHeaderSuffix(config: AppConfig, suffix: AppHeaderSuffix) {
  var body: JSX.Element = (
    <Image
      src={`${config.minio.baseUrl}/images${suffix.imageUrl}`}
      alt={suffix.name}
      className="dark:invert h-12 object-contain"
      width={256}
      height={256}
      priority
    />
  );

  const url = handleEmptyString(suffix.url);
  if (url !== undefined) {
    body = (
      <a
        className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
        href={suffix.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {body}
      </a>
    );
  }

  return (
    <p
      key={suffix.name}
      className="fixed bottom-0 left-0 flex w-full justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none h-32"
    >
      {body}
    </p>
  );
}

function buildHeader(config: AppConfig, header: AppHeader) {
  const suffixes = header.suffixes?.map((suffix) =>
    buildHeaderSuffix(config, suffix)
  );

  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <p className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <Image
          src={`${config.minio.baseUrl}/images${header.imageUrl}`}
          alt={header.name}
          className="dark:invert h-12 object-contain"
          width={64}
          height={64}
          priority
        />
        {suffixes}
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
            className="dark:invert h-12 object-contain"
            width={64}
            height={64}
            priority
          />
        </a>
      </div>
    </div>
  );
}

function buildHero(config: AppConfig, hero: Hero) {
  return (
    <div className="relative mt-8 mb-6 flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
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

function buildCatalogCategoryItem(item: CatalogCategoryItem) {
  var body: JSX.Element = (
    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{item.title}</p>
  );

  const url = handleEmptyString(item.url);
  if (url !== undefined) {
    const target = url.startsWith('/') ? '' : '_blank';
    body = (
      <a href={url} target={target} rel="noopener noreferrer">
        {body}
      </a>
    );
  }

  return (
    <div
      key={item.name}
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      {body}
    </div>
  );
}

function buildCatalogCategory(category: CatalogCategory | undefined) {
  if (category === undefined) {
    return <div />;
  }

  const name = handleEmptyString(category.name);
  const title = handleEmptyString(category.title);
  if (name === undefined || title === undefined) {
    return <div />;
  }

  var body: JSX.Element = <h2 className={`text-2xl font-semibold`}>{title}</h2>;

  const description = handleEmptyString(category.description);
  if (description !== undefined) {
    body = (
      <>
        {body}
        <p className={`m-0 mt-3 max-w-[30ch] text-sm opacity-50`}>
          {category.description}
        </p>
      </>
    );
  }

  body = (
    <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
      {body}
    </div>
  );

  const url = handleEmptyString(category.url);
  if (url !== undefined) {
    const target = url.startsWith('/') ? '' : '_blank';
    body = (
      <a href={url} target={target} rel="noopener noreferrer">
        {body}
      </a>
    );
  }

  const items = handleEmptyArray(category.items);
  if (items !== undefined) {
    body = (
      <div className="flex flex-col">
        {body}
        {items.map(buildCatalogCategoryItem)}
      </div>
    );
  }

  const alignment = handleEmptyString(category.alignment);
  var className: string = "";
  if (alignment === "bottom") {
    className = "self-end";
  }

  return (
    <div key={`catalog/${name}`} className={className}>
      {body}
    </div>
  );
}

function buildCatalog(catalog: Catalog) {
  return (
    <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
      {catalog.categories.map(buildCatalogCategory)}
    </div>
  );
}

export default function Home() {
  const [data, setData] = useState<App | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const path = usePathname();

  // Load app data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const appUri = path === '/'
          ? '/app.json'
          : `${path}.json`;
        // Use local app data if debug mode
        const url =
          process.env.NODE_ENV === "production"
            ? `https://api.minio.mobilex.kr/seoin/public${appUri}`
            : appUri;
        const response = await fetch(url);

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
  }, [path]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return;

  const header = buildHeader(data.config, data.header);
  const hero = buildHero(data.config, data.hero);
  const catalog = buildCatalog(data.catalog);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {header}
      {hero}
      {catalog}
    </main>
  );
}
