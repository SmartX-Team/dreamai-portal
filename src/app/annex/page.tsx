import { LegacyPage } from "@/lib/portal-content/legacy-page";
import { readPortalPage } from "@/lib/portal-content/server";
import layout from "@/lib/portal-content/annex-legacy.json";

export default async function AnnexPage() {
  const { content } = await readPortalPage("/annex");
  return <LegacyPage layout={layout} zone="annex.page" content={content.display} />;
}
