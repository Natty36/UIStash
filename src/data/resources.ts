export type Resource = {
  id: number;
  title: string;
  desc: string;
  url: string;
  category: string;
  tags: string[];
  trending?: boolean;
  newRelease?: boolean;
};

export const categories = [
  "UI Components & Libraries",
  "Animations & 3D",
  "Design & Prototyping",
  "Typography & Fonts",
  "Colors & Gradients",
  "Icons",
  "Images & Videos",
  "Testing & QA",
  "Hosting",
];

export const resourcesData: Resource[] = [
  // --- UI Components & Libraries ---
  { id: 1, title: "shadcn/ui", desc: "Beautifully designed components that you can copy and paste.", url: "https://ui.shadcn.com", category: "UI Components & Libraries", tags: ["UI", "React", "Tailwind"], trending: true },
  { id: 32, title: "Magic UI", desc: "UI Library for Design Engineers. Animated React components.", url: "https://magicui.design/", category: "UI Components & Libraries", tags: ["UI", "Animation", "React"], trending: true },
  { id: 33, title: "Aceternity UI", desc: "Copy paste the most trending components and use them in your websites.", url: "https://ui.aceternity.com/", category: "UI Components & Libraries", tags: ["UI", "Tailwind", "Components"], trending: true },
  { id: 106, title: "Relume Library", desc: "The world's largest Webflow and Figma component library.", url: "https://library.relume.io/", category: "UI Components & Libraries", tags: ["Webflow", "Components"] },

  // --- Animations & 3D ---
  { id: 3, title: "Framer Motion", desc: "Production-ready declarative animations for React.", url: "https://framer.com/motion", category: "Animations & 3D", tags: ["Animation", "React"] },
  { id: 123, title: "Spline", desc: "3D design tool in the browser with real-time collaboration.", url: "https://spline.design/", category: "Animations & 3D", tags: ["3D", "Design"], trending: true },
  { id: 124, title: "Rive", desc: "Build interactive animations that run anywhere.", url: "https://rive.app/", category: "Animations & 3D", tags: ["Animation", "Interactive"] },
  { id: 125, title: "LottieFiles", desc: "Lightweight, scalable animations for your websites and apps.", url: "https://lottiefiles.com/", category: "Animations & 3D", tags: ["Animation", "JSON"] },

  // --- Design & Prototyping ---
  { id: 15, title: "Figma", desc: "The collaborative interface design tool.", url: "https://figma.com", category: "Design & Prototyping", tags: ["Design", "Prototyping"] },
  { id: 126, title: "Penpot", desc: "Open Source design and prototyping platform.", url: "https://penpot.app/", category: "Design & Prototyping", tags: ["Open Source", "Design"] },
  { id: 127, title: "Stitch", desc: "The rapid design tool for modern product teams.", url: "https://stitch.design/", category: "Design & Prototyping", tags: ["Design", "UI"] },
  { id: 109, title: "Locofy.ai", desc: "Convert Figma designs to React, Next.js, HTML, and more.", url: "https://www.locofy.ai/", category: "Design & Prototyping", tags: ["AI", "Code Generation"] },

  // --- Typography & Fonts ---
  { id: 52, title: "Google Fonts", desc: "The #1 resource for free and easy-to-use webfonts.", url: "https://fonts.google.com/", category: "Typography & Fonts", tags: ["Fonts", "Free"] },
  { id: 53, title: "Fontsquirrel", desc: "The best, 100% free fonts for commercial use.", url: "https://www.fontsquirrel.com/", category: "Typography & Fonts", tags: ["Fonts", "Free"] },

  // --- Colors & Gradients ---
  { id: 57, title: "Open Color", desc: "An open-source color scheme optimized for UI.", url: "https://yeun.github.io/open-color/", category: "Colors & Gradients", tags: ["Colors", "UI"] },
  { id: 61, title: "Colorhunt", desc: "Curated collection of beautiful color palettes.", url: "https://www.colorhunt.co/", category: "Colors & Gradients", tags: ["Colors", "Palettes"] },
  { id: 63, title: "UI Gradients", desc: "Collection of beautiful color gradients.", url: "https://uigradients.com/", category: "Colors & Gradients", tags: ["Colors", "Gradients"] },

  // --- Icons ---
  { id: 112, title: "Lucide Icons", desc: "Beautiful & consistent icon toolkit made by the community.", url: "https://lucide.dev/", category: "Icons", tags: ["Icons", "SVG"], trending: true },
  { id: 79, title: "Phosphor Icons", desc: "Beautiful, boxy SVG icon set with customizable thickness.", url: "https://phosphoricons.com/", category: "Icons", tags: ["Icons", "SVG"] },
  { id: 78, title: "Heroicons", desc: "A 230-pieces icon set by the makers of Tailwind CSS.", url: "https://heroicons.com/", category: "Icons", tags: ["Icons", "Tailwind"] },

  // --- Images & Videos ---
  { id: 68, title: "Unsplash", desc: "The internet’s source of freely-usable images.", url: "https://unsplash.com/", category: "Images & Videos", tags: ["Photos", "Free"] },
  { id: 72, title: "unDraw", desc: "Hundreds of free and open-source illustrations.", url: "https://undraw.co/illustrations", category: "Images & Videos", tags: ["Illustrations", "SVG"] },

  // --- Testing & QA ---
  { id: 102, title: "Storybook", desc: "Frontend workshop for UI component development and testing.", url: "https://storybook.js.org/", category: "Testing & QA", tags: ["UI", "Testing"] },
  { id: 103, title: "Playwright", desc: "Fast and reliable end-to-end testing for modern web apps.", url: "https://playwright.dev/", category: "Testing & QA", tags: ["Testing", "E2E"] },

  // --- Hosting ---
  { id: 8, title: "Vercel", desc: "Develop. Preview. Ship. For the best frontend teams.", url: "https://vercel.com", category: "Hosting", tags: ["Hosting", "CI/CD"] },
  { id: 9, title: "Docker", desc: "Empowering App Development for Developers.", url: "https://docker.com", category: "Hosting", tags: ["Containers", "Infrastructure"] },
  { id: 105, title: "Sentry", desc: "Application monitoring and error tracking software.", url: "https://sentry.io/", category: "Hosting", tags: ["Monitoring", "Errors"] },
];