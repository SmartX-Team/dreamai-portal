import { LegacyPage } from "@/lib/portal-content/legacy-page";
import { readPortalPage } from "@/lib/portal-content/server";
import layout from "@/lib/portal-content/crosstraining-legacy.json";

export default async function EventPage() {
  const { content } = await readPortalPage("/crosstraining");
  return <LegacyPage layout={layout} zone="cross.page" content={content.display} />;
}
