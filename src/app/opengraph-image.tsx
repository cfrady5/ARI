import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogImage";

// Build-time static OpenGraph/Twitter image (works with `output: export`).
export const alt =
  "Applied Research Institute — Catalyzing innovation for national security and economic prosperity.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = "force-static";

export default function OpengraphImage() {
  return renderOgImage();
}
