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
  title: string | null;
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
  description: string;
  url: string;
}
