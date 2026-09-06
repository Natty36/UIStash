import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const alt = "UI Stash - Developer UI & Resource Directory";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function fetchFaviconDataUrl(domainUrl: string) {
  try {
    const res = await fetch(`https://www.google.com/s2/favicons?domain=${domainUrl}&sz=128`);
    if (res.ok) {
      const arrayBuffer = await res.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      const contentType = res.headers.get("content-type") || "image/png";
      return `data:${contentType};base64,${base64}`;
    }
  } catch (e) {
    console.error("Failed to fetch favicon for", domainUrl, e);
  }
  return "";
}

export default async function Image() {
  let logoDataUrl = "";
  try {
    const logoPath = path.join(process.cwd(), "public", "logo.png");
    const logoBuffer = fs.readFileSync(logoPath);
    logoDataUrl = `data:image/png;base64,${logoBuffer.toString("base64")}`;
  } catch (e) {
    console.error("Failed to load logo for OG image:", e);
  }

  // Fetch actual resource favicons in parallel
  const [shadcnFavicon, framerFavicon, magicFavicon] = await Promise.all([
    fetchFaviconDataUrl("https://ui.shadcn.com"),
    fetchFaviconDataUrl("https://framer.com/motion"),
    fetchFaviconDataUrl("https://magicui.design/"),
  ]);

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

          {/* Stats / Metrics Badge Row with Vector Icons */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {/* Stat 1: 50+ Curated Tools */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d4d4d8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              <span>50+ Curated Tools</span>
            </div>

            {/* Stat 2: Chef's Choice */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z"/>
                <line x1="6" y1="17" x2="18" y2="17"/>
              </svg>
              <span>Chef&apos;s Choice Picks</span>
            </div>

            {/* Stat 3: 10 Categories */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d4d4d8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="9" y1="21" x2="9" y2="9"/>
              </svg>
              <span>10 Categories</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Mock Cards Stack */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "520px",
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  color: "#f59e0b",
                  backgroundColor: "rgba(245, 158, 11, 0.1)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  padding: "3px 10px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z"/>
                  <line x1="6" y1="17" x2="18" y2="17"/>
                </svg>
                <span>Chef&apos;s Pick</span>
              </div>
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
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  backgroundColor: "#09090b",
                  border: "1px solid #27272a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  padding: "4px",
                }}
              >
                {shadcnFavicon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={shadcnFavicon}
                    alt="shadcn/ui icon"
                    style={{ width: "22px", height: "22px", objectFit: "contain" }}
                  />
                ) : (
                  <span style={{ fontSize: "14px", fontWeight: "bold", color: "#ffffff" }}>cn</span>
                )}
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  color: "#3b82f6",
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  padding: "3px 10px",
                  borderRadius: "6px",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z"/>
                </svg>
                <span>Trending</span>
              </div>
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
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  backgroundColor: "#09090b",
                  border: "1px solid #27272a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  padding: "4px",
                }}
              >
                {framerFavicon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={framerFavicon}
                    alt="Framer Motion icon"
                    style={{ width: "22px", height: "22px", objectFit: "contain" }}
                  />
                ) : (
                  <span style={{ fontSize: "14px", fontWeight: "bold", color: "#0055FF" }}>F</span>
                )}
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
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    backgroundColor: "#09090b",
                    border: "1px solid #27272a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    padding: "4px",
                  }}
                >
                  {magicFavicon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={magicFavicon}
                      alt="Magic UI icon"
                      style={{ width: "22px", height: "22px", objectFit: "contain" }}
                    />
                  ) : (
                    <span style={{ fontSize: "14px", fontWeight: "bold", color: "#a855f7" }}>M</span>
                  )}
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
