import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const alt = "UI Stash - Developer UI & Resource Directory";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  let logoDataUrl = "";
  try {
    const logoPath = path.join(process.cwd(), "public", "logo.png");
    const logoBuffer = fs.readFileSync(logoPath);
    logoDataUrl = `data:image/png;base64,${logoBuffer.toString("base64")}`;
  } catch (e) {
    console.error("Failed to load logo for OG image:", e);
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          backgroundColor: "#09090b",
          color: "#fafafa",
          fontFamily: "monospace",
          position: "relative",
          overflow: "hidden",
          padding: "48px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Ambient background glows */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            backgroundColor: "rgba(24, 24, 27, 0.8)",
            borderRadius: "250px",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            right: "-100px",
            width: "600px",
            height: "600px",
            backgroundColor: "rgba(39, 39, 42, 0.6)",
            borderRadius: "300px",
          }}
        />

        {/* Left Column: Brand & Info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "540px",
          }}
        >
          {/* Category Top Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "20px",
              alignSelf: "flex-start",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: "#22c55e",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                letterSpacing: "0.08em",
                color: "#a1a1aa",
                textTransform: "uppercase",
              }}
            >
              Curated Directory
            </span>
          </div>

          {/* Logo & Brand Name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            {logoDataUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoDataUrl}
                alt="UI Stash Logo"
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "12px",
                  objectFit: "contain",
                }}
              />
            )}
            <span
              style={{
                fontSize: "46px",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#ffffff",
                fontFamily: "sans-serif",
              }}
            >
              UI Stash
            </span>
          </div>

          {/* Main Title */}
          <div
            style={{
              fontSize: "32px",
              fontWeight: 700,
              lineHeight: 1.25,
              color: "#f4f4f5",
              marginBottom: "16px",
              fontFamily: "sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            The Ultimate Resource Stash for Developers &amp; Designers
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "16px",
              lineHeight: 1.6,
              color: "#a1a1aa",
              marginBottom: "32px",
              fontFamily: "monospace",
            }}
          >
            Handpicked React UI libraries, animation engines, 3D tools, color palettes, &amp; hosting platforms.
          </div>

          {/* Stats / Metrics Badge Row */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {[
              "⚡ 50+ Curated Tools",
              "👨‍🍳 Chef's Choice Picks",
              "🎨 10 Categories",
            ].map((stat) => (
              <div
                key={stat}
                style={{
                  padding: "8px 14px",
                  backgroundColor: "#121215",
                  border: "1px solid #27272a",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "#d4d4d8",
                  fontFamily: "monospace",
                }}
              >
                {stat}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Visual Mock Cards Stack */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "520px",
            zIndex: 10,
          }}
        >
          {/* Mock Card 1: shadcn/ui */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "rgba(18, 18, 20, 0.95)",
              border: "1px solid #3f3f46",
              borderRadius: "14px",
              padding: "20px 24px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  color: "#a1a1aa",
                  backgroundColor: "#09090b",
                  border: "1px solid #27272a",
                  padding: "3px 10px",
                  borderRadius: "6px",
                }}
              >
                UI Components &amp; Blocks
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "#f59e0b",
                  backgroundColor: "rgba(245, 158, 11, 0.1)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  padding: "3px 10px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                }}
              >
                👨‍🍳 Chef&apos;s Pick
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  backgroundColor: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#000000",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                cn
              </div>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#ffffff",
                  fontFamily: "sans-serif",
                }}
              >
                shadcn/ui
              </span>
            </div>

            <div
              style={{
                fontSize: "13px",
                color: "#a1a1aa",
                marginBottom: "14px",
                lineHeight: 1.4,
              }}
            >
              Beautifully designed components that you can copy and paste into your apps.
            </div>

            <div style={{ display: "flex", gap: "6px" }}>
              {["React", "Tailwind", "Radix"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "10px",
                    color: "#71717a",
                    border: "1px solid #27272a",
                    borderRadius: "4px",
                    padding: "2px 8px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Mock Card 2: Framer Motion */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "rgba(18, 18, 20, 0.75)",
              border: "1px solid #27272a",
              borderRadius: "14px",
              padding: "18px 24px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  color: "#a1a1aa",
                  backgroundColor: "#09090b",
                  border: "1px solid #27272a",
                  padding: "3px 10px",
                  borderRadius: "6px",
                }}
              >
                Animations &amp; 3D
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "#3b82f6",
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  padding: "3px 10px",
                  borderRadius: "6px",
                }}
              >
                🔥 Trending
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "6px",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  backgroundColor: "#0055FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                F
              </div>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#ffffff",
                  fontFamily: "sans-serif",
                }}
              >
                Framer Motion
              </span>
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#71717a",
                lineHeight: 1.4,
              }}
            >
              Production-ready declarative animations engine for React applications.
            </div>
          </div>

          {/* Mock Card 3: Magic UI */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "rgba(18, 18, 20, 0.55)",
              border: "1px solid #1f1f23",
              borderRadius: "14px",
              padding: "16px 24px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "6px",
                    backgroundColor: "#a855f7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                >
                  M
                </div>
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#e4e4e7",
                    fontFamily: "sans-serif",
                  }}
                >
                  Magic UI
                </span>
              </div>
              <span
                style={{
                  fontSize: "11px",
                  color: "#a1a1aa",
                }}
              >
                Animated React Components
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
