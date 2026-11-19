import { LegacyPage } from "@/lib/portal-content/legacy-page";
import { readPortalPage } from "@/lib/portal-content/server";
import layout from "@/lib/portal-content/nputraining-legacy.json";

export default async function NpuTrainingPage() {
  const { content } = await readPortalPage("/nputraining");
  return <LegacyPage layout={layout} zone="npu.page" content={content.display} />;
}
