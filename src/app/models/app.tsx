interface App {
  config: AppConfig;
  header: AppHeader;
  hero: Hero;
  catalog: Catalog;
}

interface AppConfig {
  minio: AppConfigMinIO;
}

interface AppConfigMinIO {
  baseUrl: string;
}

interface AppHeader {
  name: string;
  title: string | undefined;
  description: string;
  imageUrl: string;
  secondary: AppHeaderSecondary;
}

interface AppHeaderSecondary {
  imageUrl: string;
  url: string;
}

interface Hero {
  name: string;
  imageUrl: string;
}

interface Catalog {
  categories: CatalogCategory[];
}

interface CatalogCategory {
  name: string;
  title: string;
  description: string | undefined;
  url: string | undefined;
  alignment: string | undefined;
  items: CatalogCategoryItem[] | undefined;
}

interface CatalogCategoryItem {
  name: string;
  title: string;
  url: string | undefined;
}
