import type { Projects } from "@/types";

export const ProjectsData: Projects[] = [
  {
    icon: "/projects/orbit.svg",
    title: "Orbit",
    tagline: "Revolving Around Organized Workflow",
    description: [
      "Full-stack project management platform with TypeScript, Express.js, Prisma ORM, PostgreSQL, and JWT authentication",
      "Employee, project, and client management with role-based access control, RESTful API, and automated validation using Zod",
      "Turborepo monorepo with 100% test coverage via Vitest, production-ready security middleware (Helmet, rate limiting)",
      "Interactive dashboard with Chart.js, ApexCharts, Recharts analytics, geographic visualization, and AWS S3 integration",
    ],
    liveLink: "https://orbit-pms.vercel.app",
    repo: "https://github.com/vishalvoid/pms",
    techStack: [
      { name: "NextJs", icon: "/tech-icon/nextjs.svg" },
      { name: "TypeScript", icon: "/tech-icon/typescript.svg" },
      { name: "Node.js", icon: "/tech-icon/nodejs.svg" },
      {
        name: "Express.js",
        icon: "/tech-icon/expressjs.svg",
        hasDarkIcon: true,
      },
      { name: "PostgreSQL", icon: "/tech-icon/postgresql.svg" },
      { name: "Prisma", icon: "/tech-icon/prisma.svg", hasDarkIcon: true },
      {
        name: "Turborepo",
        icon: "/tech-icon/turborepo.svg",
        hasDarkIcon: true,
      },
      { name: "Vitest", icon: "/tech-icon/vitest.svg" },
      { name: "Zod", icon: "/tech-icon/zod.svg" },
      { name: "pnpm", icon: "/tech-icon/pnpm.svg" },
      { name: "Swagger", icon: "/tech-icon/swagger.svg" },
    ],
  },
  {
    icon: "/projects/rabrees.png",
    title: "Rabrees",
    tagline: "A Complete eCommerce with Admin Dashboard",
    description: [
      "A full-stack e-commerce platform built with Next.js 14 and React with secure JWT authentication and MongoDB integration",
      "Seamless payment processing with Razorpay, automated email notifications, and AWS S3 cloud storage for product images",
      "Modern responsive UI with Tailwind CSS, Flowbite components, interactive carousels, and animated transitions",
      "Admin dashboard with Chart.js analytics for product management, order tracking, and business insights",
    ],
    liveLink: "https://rabrees.vercel.app",
    techStack: [
      { name: "Next.js", icon: "/tech-icon/nextjs.svg", hasDarkIcon: true },
      { name: "React", icon: "/tech-icon/react.svg" },
      { name: "MongoDB", icon: "/tech-icon/mongodb.svg" },
      { name: "Tailwind CSS", icon: "/tech-icon/tailwindcss.svg" },
      { name: "Redux Toolkit", icon: "/tech-icon/redux.svg" },
      { name: "AWS S3", icon: "/tech-icon/aws.svg", hasDarkIcon: true },
      { name: "Razorpay", icon: "/tech-icon/razorpay.svg" },
      { name: "JWT", icon: "/tech-icon/jwt.svg" },
      { name: "Chart.js", icon: "/tech-icon/chartjs.svg" },
    ],
  },
  {
    icon: "/projects/react-map-india.svg",
    title: "React India Map",
    tagline: "Interactive SVG India Map Component for React",
    description: [
      "Open-source NPM package with 1500+ downloads",
      "Interactive map with clickable state regions, custom tooltips, dynamic styling",
      "Dual build system (ESM + CommonJS) using Rollup bundler",
      "Published as @vishalvoid/react-india-map with TypeScript and React",
    ],

    liveLink: "https://www.npmjs.com/package/@vishalvoid/react-india-map",
    repo: "https://github.com/vishalvoid/react-india-map",
    techStack: [
      { name: "TypeScript", icon: "/tech-icon/typescript.svg" },
      { name: "React", icon: "/tech-icon/react.svg" },
      { name: "Vite", icon: "/tech-icon/vitejs.svg" },
      { name: "Rollup", icon: "/tech-icon/rollup.svg" },
    ],
  },
  {
    icon: "/projects/focushya.svg",
    title: "Focushya",
    tagline: "Time's messy, Focushya isn't",
    description: [
      "Full-stack productivity and habit tracking application built with Turborepo monorepo architecture",
      "RESTful API with JWT authentication, refresh tokens, and secure password hashing using bcrypt",
      "Task management with daily/upcoming views, timer functionality, and pomodoro focus sessions",
      "Habit tracking system with custom templates and progress monitoring",
      "Built with Express.js server, Prisma ORM database layer, and shared TypeScript configurations",
    ],

    liveLink: "https://focushya.in", // Based on CNAME file in your repo
    repo: "https://github.com/vishalvoid/focushya",
    techStack: [
      { name: "TypeScript", icon: "/tech-icon/typescript.svg" },
      { name: "Express", icon: "/tech-icon/expressjs.svg", hasDarkIcon: true },
      { name: "Prisma", icon: "/tech-icon/prisma.svg" },
      { name: "Turborepo", icon: "/tech-icon/turborepo.svg" },
      { name: "Node.js", icon: "/tech-icon/nodejs.svg" },
    ],
  },
  {
    icon: "/projects/dark-void-theme.png",
    title: "Dark Void Theme",
    tagline: "Perfect vs-code dark theme.",
    description: [
      "A minimal, high-contrast dark theme for Visual Studio Code inspired by void-like aesthetics",
      "Carefully tuned color palette for reduced eye strain during long coding sessions",
      "Consistent syntax highlighting across JavaScript, TypeScript, JSON, HTML, and CSS",
      "Semantic token colors optimized for readability and visual hierarchy",
      "Designed for developers who prefer distraction-free, text-first coding environments",
    ],

    liveLink:
      "https://marketplace.visualstudio.com/items?itemName=vishalvoid.dark-void-theme",
    repo: "https://github.com/vishalvoid/dark-void-theme",
    techStack: [
      { name: "JSON", icon: "/tech-icon/json.svg" },
      { name: "VS Code API", icon: "/tech-icon/vscode.svg" },
    ],
  },
];
