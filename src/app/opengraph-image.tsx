import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "dAte nIght - AI Dating Concierge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0f",
          position: "relative",
        }}
      >
        {/* Gradient orbs */}
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)",
            top: 50,
            left: 200,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 70%)",
            bottom: 50,
            right: 200,
          }}
        />

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: 80,
            fontWeight: 900,
            letterSpacing: -2,
            marginBottom: 16,
          }}
        >
          <span style={{ color: "#a855f7" }}>d</span>
          <span style={{ color: "#f1f5f9" }}>A</span>
          <span style={{ color: "#a855f7" }}>te</span>
          <span style={{ color: "#f1f5f9" }}>&nbsp;</span>
          <span style={{ color: "#f97316" }}>n</span>
          <span style={{ color: "#f1f5f9" }}>I</span>
          <span style={{ color: "#f97316" }}>ght</span>
        </div>

        {/* Gradient line */}
        <div
          style={{
            width: 120,
            height: 3,
            borderRadius: 2,
            background: "linear-gradient(90deg, #a855f7, #f97316)",
            marginBottom: 24,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: "#94a3b8",
            letterSpacing: 4,
            textTransform: "uppercase" as const,
          }}
        >
          Less scrolling. More dressing up.
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 18,
            color: "#64748b",
            marginTop: 16,
          }}
        >
          Your AI Avatar does the dirty work of dating.
        </div>
      </div>
    ),
    { ...size }
  );
}
