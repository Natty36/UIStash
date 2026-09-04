export type Resource = {
  id: number;
  title: string;
  desc: string;
  url: string;
  category: string;
  tags: string[];
  trending?: boolean;
  newRelease?: boolean;
  chefsChoice?: boolean;
};

export const categories = [
  "UI Components & Blocks",
  "Animations & 3D",
  "Design & Prototyping",
  "Frontend Skills for Agents",
  "Typography & Fonts",
  "Colors & Gradients",
  "Icons & Logos",
  "Images & Videos",
  "Testing & QA",
  "Hosting",
];

export const resourcesData: Resource[] = [
  // --- UI Components & Blocks ---
  { id: 1, title: "shadcn/ui", desc: "Beautifully designed components that you can copy and paste into your apps.", url: "https://ui.shadcn.com", category: "UI Components & Blocks", tags: ["UI", "React", "Tailwind"], trending: true, chefsChoice: true },
  { id: 134, title: "OriginKit", desc: "Beautiful, accessible components crafted with Tailwind CSS and Radix UI.", url: "https://www.originkit.dev/", category: "UI Components & Blocks", tags: ["Tailwind", "Radix", "Components"], newRelease: true },
  { id: 32, title: "Magic UI", desc: "UI Library for Design Engineers. Animated React components.", url: "https://magicui.design/", category: "UI Components & Blocks", tags: ["UI", "Animation", "React"], trending: true, chefsChoice: true },
  { id: 131, title: "React Bits", desc: "An open source collection of animated, interactive & fully customizable React components.", url: "https://www.reactbits.dev/", category: "UI Components & Blocks", tags: ["React", "Animation", "Tailwind"], trending: true, newRelease: true },
  { id: 133, title: "Hover.dev", desc: "Animated Tailwind CSS & Framer Motion components ready to copy and paste.", url: "https://www.hover.dev/", category: "UI Components & Blocks", tags: ["Animation", "Tailwind", "Framer Motion"], trending: true },
  { id: 135, title: "21st.dev", desc: "The npm for Design Engineers. Discover and share copy-paste UI components.", url: "https://21st.dev/", category: "UI Components & Blocks", tags: ["Marketplace", "React", "Tailwind"], trending: true, newRelease: true },
  { id: 132, title: "DaisyUI", desc: "The most popular, free and open-source Tailwind CSS component library.", url: "https://daisyui.com/", category: "UI Components & Blocks", tags: ["Tailwind", "CSS", "Components"] },
  { id: 139, title: "Cult UI", desc: "Curated components and interactive elements for modern design engineers.", url: "https://www.cult-ui.com/", category: "UI Components & Blocks", tags: ["React", "Tailwind", "Motion"] },
  { id: 33, title: "Aceternity UI", desc: "Copy paste the most trending components and use them in your websites.", url: "https://ui.aceternity.com/", category: "UI Components & Blocks", tags: ["UI", "Tailwind", "Components"], trending: true, chefsChoice: true },
  { id: 138, title: "Motion Primitives", desc: "Advanced interactive UI components crafted with Framer Motion and Tailwind.", url: "https://motion-primitives.com/", category: "UI Components & Blocks", tags: ["Motion", "React", "Tailwind"], trending: true, newRelease: true },
  { id: 140, title: "Animate UI", desc: "A collection of animated React components, buttons, and micro-interactions.", url: "https://animate-ui.com/", category: "UI Components & Blocks", tags: ["Animation", "React", "Tailwind"] },

  // --- Animations & 3D ---
  { id: 3, title: "Framer Motion", desc: "Production-ready declarative animations for React.", url: "https://framer.com/motion", category: "Animations & 3D", tags: ["Animation", "React"], chefsChoice: true },
  { id: 141, title: "Lenis", desc: "Smooth scroll library built for modern luxury & creative web builds.", url: "https://lenis.darkroom.engineering/", category: "Animations & 3D", tags: ["Scroll", "Smooth Scroll", "Creative"], trending: true, chefsChoice: true },
  { id: 145, title: "GSAP", desc: "Professional-grade JavaScript animation engine for high-performance motion.", url: "https://gsap.com/", category: "Animations & 3D", tags: ["GSAP", "Animation", "Performance"], trending: true },
  { id: 142, title: "Anime.js", desc: "Lightweight JavaScript animation engine with a simple, powerful API.", url: "https://animejs.com/", category: "Animations & 3D", tags: ["Animation", "JavaScript", "SVG"] },
  { id: 143, title: "Three.js", desc: "The standard JavaScript 3D library for WebGL rendering on the web.", url: "https://threejs.org/", category: "Animations & 3D", tags: ["3D", "WebGL", "JavaScript"], trending: true },
  { id: 146, title: "React Three Fiber", desc: "A React renderer for Three.js to build declarative 3D scenes.", url: "https://docs.pmnd.rs/react-three-fiber", category: "Animations & 3D", tags: ["React", "Three.js", "3D", "WebGL"], trending: true },
  { id: 123, title: "Spline", desc: "3D design tool in the browser with real-time collaboration.", url: "https://spline.design/", category: "Animations & 3D", tags: ["3D", "Design"], trending: true },
  { id: 124, title: "Rive", desc: "Build interactive animations that run anywhere.", url: "https://rive.app/", category: "Animations & 3D", tags: ["Animation", "Interactive"] },
  { id: 125, title: "LottieFiles", desc: "Lightweight, scalable animations for your websites and apps.", url: "https://lottiefiles.com/", category: "Animations & 3D", tags: ["Animation", "JSON"] },
  { id: 144, title: "Sketchfab", desc: "Publish, share, buy, and download interactive 3D models and assets.", url: "https://sketchfab.com/", category: "Animations & 3D", tags: ["3D", "Assets", "Models"] },
  { id: 147, title: "Poly Pizza", desc: "Free low-poly 3D models for games, creative websites, and interactive apps.", url: "https://poly.pizza/", category: "Animations & 3D", tags: ["3D", "Models", "Low-Poly"] },

  // --- Design & Prototyping ---
  { id: 15, title: "Figma", desc: "The collaborative interface design tool.", url: "https://figma.com", category: "Design & Prototyping", tags: ["Design", "Prototyping"], chefsChoice: true },
  { id: 148, title: "Framer", desc: "Design and publish responsive, animated websites visually with zero code.", url: "https://www.framer.com/", category: "Design & Prototyping", tags: ["Design", "Website Builder", "Interactive"], trending: true },
  { id: 106, title: "Relume Library", desc: "The world's largest Webflow and Figma component library.", url: "https://library.relume.io/", category: "Design & Prototyping", tags: ["Webflow", "Figma", "Wireframe"] },
  { id: 127, title: "Stitch by Google", desc: "A framework to build rich, connected user experiences across platforms.", url: "https://stitch.withgoogle.com/", category: "Design & Prototyping", tags: ["Design", "UI", "Google"] },
  { id: 178, title: "Refero Styles", desc: "Curated real-world design styles, patterns, and visual references from top digital products.", url: "https://styles.refero.design/", category: "Design & Prototyping", tags: ["Inspiration", "Design", "UI Patterns"], trending: true },
  { id: 151, title: "Claude Design", desc: "Generative UI design and rapid interactive artifact prototyping with Claude.", url: "https://claude.ai/", category: "Design & Prototyping", tags: ["AI", "Design", "Prototyping"], trending: true, newRelease: true },
  { id: 126, title: "Penpot", desc: "Open Source design and prototyping platform.", url: "https://penpot.app/", category: "Design & Prototyping", tags: ["Open Source", "Design"] },
  { id: 152, title: "OpenDesign", desc: "Open-source developer platform for Figma/sketch file inspection and design data APIs.", url: "https://opendesign.dev/", category: "Design & Prototyping", tags: ["Open Source", "Design", "API"], newRelease: true },

  // --- Frontend Skills for Agents ---
  { id: 149, title: "UI/UX Pro Max Skill", desc: "Design intelligence AI skill for agents to generate complete design systems and prevent bad UI.", url: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill", category: "Frontend Skills for Agents", tags: ["AI Agents", "Design System", "Skills"], trending: true, newRelease: true, chefsChoice: true },
  { id: 150, title: "Impeccable", desc: "Design language, commands, and detector rules giving AI coding agents frontend taste.", url: "https://github.com/pbakaus/impeccable", category: "Frontend Skills for Agents", tags: ["AI Agents", "Frontend", "Skills"], trending: true, newRelease: true },
  { id: 177, title: "Agent Skills by Jakub Krehel", desc: "Curated collection of practical skills and system prompts designed for coding agents.", url: "https://github.com/jakubkrehel/skills", category: "Frontend Skills for Agents", tags: ["AI Agents", "Prompts", "Skills"], trending: true, newRelease: true },

  // --- Typography & Fonts ---
  { id: 52, title: "Google Fonts", desc: "The #1 resource for free and easy-to-use webfonts.", url: "https://fonts.google.com/", category: "Typography & Fonts", tags: ["Fonts", "Free"] },
  { id: 154, title: "UNCUT.wtf", desc: "A curated contemporary catalogue of open-source and free typefaces.", url: "https://uncut.wtf/", category: "Typography & Fonts", tags: ["Fonts", "Typefaces", "Contemporary"], trending: true, newRelease: true },
  { id: 153, title: "Fontpair", desc: "Free font pairings, typography combinations, and design inspiration for creators.", url: "https://www.fontpair.co/", category: "Typography & Fonts", tags: ["Fonts", "Typography", "Pairings"], trending: true },
  { id: 155, title: "Fontshare", desc: "Free quality font service by the Indian Type Foundry featuring modern web typefaces.", url: "https://www.fontshare.com/", category: "Typography & Fonts", tags: ["Fonts", "Typography", "Free"], trending: true },
  { id: 156, title: "Velvetyne Type Foundry", desc: "Open-source foundry creating contemporary, brutalist, and experimental typefaces.", url: "https://velvetyne.fr/", category: "Typography & Fonts", tags: ["Open Source", "Experimental", "Fonts"] },
  { id: 157, title: "Open Foundry", desc: "Curated open-source type directory with real-time browser preview controls.", url: "https://open-foundry.com/", category: "Typography & Fonts", tags: ["Open Source", "Directory", "Fonts"] },
  { id: 53, title: "Fontsquirrel", desc: "The best, 100% free fonts for commercial use.", url: "https://www.fontsquirrel.com/", category: "Typography & Fonts", tags: ["Fonts", "Free"] },

  // --- Colors & Gradients ---
  { id: 137, title: "Colors by Robi", desc: "Curated aesthetic color palettes and gradient collections.", url: "https://colors.robi.work/", category: "Colors & Gradients", tags: ["Colors", "Curated", "Palettes"] },
  { id: 136, title: "Coolors", desc: "The super fast color palettes generator.", url: "https://coolors.co/", category: "Colors & Gradients", tags: ["Colors", "Palettes", "Generator"], trending: true },
  { id: 61, title: "Colorhunt", desc: "Curated collection of beautiful color palettes.", url: "https://www.colorhunt.co/", category: "Colors & Gradients", tags: ["Colors", "Palettes"] },
  { id: 57, title: "Open Color", desc: "An open-source color scheme optimized for UI.", url: "https://yeun.github.io/open-color/", category: "Colors & Gradients", tags: ["Colors", "UI"] },
  { id: 63, title: "UI Gradients", desc: "Collection of beautiful color gradients.", url: "https://uigradients.com/", category: "Colors & Gradients", tags: ["Colors", "Gradients"] },
  { id: 160, title: "Realtime Colors", desc: "Visualize and preview your color palettes on a live website in real time.", url: "https://realtimecolors.com/", category: "Colors & Gradients", tags: ["Colors", "Preview", "Contrast"], trending: true },
  { id: 161, title: "Huemint", desc: "AI-driven color palette generator built specifically for graphic and UI layouts.", url: "https://huemint.com/", category: "Colors & Gradients", tags: ["Colors", "AI", "Palettes"] },
  { id: 162, title: "Mesh Gradient", desc: "Generate smooth, multi-point fluid gradients with direct CSS/SVG exports.", url: "https://meshgradient.in/", category: "Colors & Gradients", tags: ["Gradients", "Mesh", "CSS"], trending: true },
  { id: 163, title: "Happy Hues", desc: "Curated color palettes presented with context on real UI component states.", url: "https://www.happyhues.co/", category: "Colors & Gradients", tags: ["Colors", "UI", "Palettes"] },

  // --- Icons & Logos ---
  { id: 112, title: "Lucide Icons", desc: "Beautiful & consistent icon toolkit made by the community.", url: "https://lucide.dev/", category: "Icons & Logos", tags: ["Icons", "SVG"], trending: true },
  { id: 79, title: "Phosphor Icons", desc: "Beautiful, boxy SVG icon set with customizable thickness.", url: "https://phosphoricons.com/", category: "Icons & Logos", tags: ["Icons", "SVG"] },
  { id: 179, title: "LogoGG", desc: "Curated archive of modern startup logos, wordmarks, and visual brands.", url: "https://logogg.com/", category: "Icons & Logos", tags: ["Logo", "Branding", "Inspiration"], trending: true, newRelease: true },
  { id: 180, title: "Brandfetch", desc: "Instant vector logos, brand palettes, and brand assets for millions of companies.", url: "https://brandfetch.com/", category: "Icons & Logos", tags: ["Brand", "Logos", "SVG", "Assets"], trending: true },
  { id: 181, title: "LogoArchive", desc: "A curated digital archive of mid-century minimalist logos and modernist symbols.", url: "https://www.logo-archive.org/", category: "Icons & Logos", tags: ["Logo", "Archive", "Minimalist"], trending: true },
  { id: 78, title: "Heroicons", desc: "A 230-pieces icon set by the makers of Tailwind CSS.", url: "https://heroicons.com/", category: "Icons & Logos", tags: ["Icons", "Tailwind"] },
  { id: 158, title: "Remix Icon", desc: "Open-source neutral style system symbols elaborately crafted for designers and developers.", url: "https://remixicon.com/", category: "Icons & Logos", tags: ["Icons", "SVG", "Open Source"], trending: true },
  { id: 159, title: "Iconoir", desc: "Open-source library with 1600+ unique SVG icons designed on a 24x24 grid.", url: "https://iconoir.com/", category: "Icons & Logos", tags: ["Icons", "SVG", "React"] },

  // --- Images & Videos ---
  { id: 68, title: "Unsplash", desc: "The internet’s source of freely-usable images.", url: "https://unsplash.com/", category: "Images & Videos", tags: ["Photos", "Free"] },
  { id: 72, title: "unDraw", desc: "Hundreds of free and open-source illustrations.", url: "https://undraw.co/illustrations", category: "Images & Videos", tags: ["Illustrations", "SVG"] },
  { id: 164, title: "Pexels", desc: "Free high-quality stock photos and royalty-free b-roll videos for creative web design.", url: "https://www.pexels.com/", category: "Images & Videos", tags: ["Photos", "Videos", "Free"] },
  { id: 165, title: "Mixkit", desc: "Free video clips, sound effects, and motion assets for website backdrops.", url: "https://mixkit.co/", category: "Images & Videos", tags: ["Video", "Assets", "Free"] },
  { id: 166, title: "DrawKit", desc: "Hand-drawn vector illustrations and modular 2D/3D illustration kits.", url: "https://www.drawkit.com/", category: "Images & Videos", tags: ["Illustrations", "Vector", "Design"] },
  { id: 167, title: "Open Peeps", desc: "Hand-drawn illustration library with customizable poses, hair, and clothing.", url: "https://www.openpeeps.com/", category: "Images & Videos", tags: ["Illustrations", "Modular", "Open Source"] },
  { id: 168, title: "Screenlane", desc: "Curated UI animations, interaction flows, and visual website screen patterns.", url: "https://screenlane.com/", category: "Images & Videos", tags: ["UI", "Inspiration", "Screens"] },
  { id: 169, title: "Higgsfield AI", desc: "Next-generation video creation and realistic motion models for creators.", url: "https://higgsfield.ai/", category: "Images & Videos", tags: ["AI", "Video", "Motion"], trending: true, newRelease: true },
  { id: 170, title: "Lummi", desc: "Curated free AI stock photos and digital art crafted by creators.", url: "https://www.lummi.ai/", category: "Images & Videos", tags: ["AI", "Photos", "Curated", "Free"], trending: true, newRelease: true },

  // --- Testing & QA ---
  { id: 102, title: "Storybook", desc: "Frontend workshop for UI component development and testing in isolation.", url: "https://storybook.js.org/", category: "Testing & QA", tags: ["UI", "Sandbox", "Components"], trending: true },
  { id: 103, title: "Playwright", desc: "Fast and reliable cross-browser end-to-end testing for modern web apps.", url: "https://playwright.dev/", category: "Testing & QA", tags: ["Testing", "E2E", "Automation"], trending: true },
  { id: 174, title: "Cypress", desc: "Developer-friendly browser automation tool for end-to-end and component tests.", url: "https://www.cypress.io/", category: "Testing & QA", tags: ["Testing", "E2E", "Browser"] },
  { id: 175, title: "Vitest", desc: "Blazing fast Vite-native unit and integration test framework.", url: "https://vitest.dev/", category: "Testing & QA", tags: ["Testing", "Vite", "Fast"], trending: true },
  { id: 176, title: "Chromatic", desc: "Automated visual regression testing and review tool built for Storybook.", url: "https://www.chromatic.com/", category: "Testing & QA", tags: ["Testing", "Visual QA", "Storybook"], newRelease: true },

  // --- Hosting ---
  { id: 171, title: "Cloudflare Pages", desc: "Fast, secure edge hosting and full-stack platform for frontend developers.", url: "https://pages.cloudflare.com/", category: "Hosting", tags: ["Hosting", "Edge", "Fast"], trending: true },
  { id: 173, title: "EthioDeploy", desc: "Push to GitHub, deploy instantly. Built for developers with local Birr billing.", url: "https://ethiodeploy.com/", category: "Hosting", tags: ["Hosting", "Deployment", "Local"], newRelease: true, trending: true },
  { id: 8, title: "Vercel", desc: "Develop. Preview. Ship. Optimized deployment platform for modern frontend teams.", url: "https://vercel.com", category: "Hosting", tags: ["Hosting", "Frontend", "Next.js"], trending: true },
  { id: 172, title: "Netlify", desc: "Platform to deploy, scale, and automate modern web applications and static sites.", url: "https://www.netlify.com/", category: "Hosting", tags: ["Hosting", "Static", "CI/CD"] },
];