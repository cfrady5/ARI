import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Dynamically rendered, on-brand OpenGraph/Twitter image.
 * Avoids shipping a static asset and stays consistent with the ARI theme.
 */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#030605",
          backgroundImage:
            "radial-gradient(circle at 18% 8%, rgba(59,174,72,0.22), transparent 42%), radial-gradient(circle at 88% 18%, rgba(31,54,85,0.6), transparent 45%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              border: "2px solid rgba(59,174,72,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#3BAE48",
              fontSize: "40px",
              fontWeight: 800,
            }}
          >
            A
          </div>
          <div
            style={{
              color: "#F6F8F7",
              fontSize: "30px",
              fontWeight: 800,
              letterSpacing: "0.04em",
            }}
          >
            ARI
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              color: "#3BAE48",
              fontSize: "24px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Applied Research Institute
          </div>
          <div
            style={{
              color: "#F6F8F7",
              fontSize: "62px",
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: "1000px",
            }}
          >
            Catalyzing innovation for national security and economic prosperity.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "60px", height: "4px", background: "#3BAE48" }} />
          <div style={{ color: "#B9C0C4", fontSize: "26px" }}>{SITE.tagline}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
