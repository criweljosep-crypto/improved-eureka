import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
        }}
      >
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: 9999,
            background: "#d4af37",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 96,
            fontWeight: 700,
            color: "#000000",
          }}
        >
          4
        </div>
      </div>
    ),
    { ...size }
  );
}
