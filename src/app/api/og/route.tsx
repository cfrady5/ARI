import { renderOgImage } from "@/lib/ogImage";

// Stable URL (/api/og) for the branded social image, referenced explicitly
// by page metadata so every route gets a consistent OpenGraph/Twitter card.
export const dynamic = "force-static";

export function GET() {
  return renderOgImage();
}
