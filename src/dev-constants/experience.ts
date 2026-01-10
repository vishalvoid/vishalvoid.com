import type { Experience } from "@/types";

export const ExperienceData: Experience[] = [
  {
    company: "Skillbud",
    logo: "/company/skillbud.png",
    designation: "Full Stack Developer",
    type: "Full-time",
    startDate: "11.2023",
    endDate: "Present",
    isCurrent: true,
    description: [
      "Developed a full-stack Project Management System using Node.js (TypeScript, Express), React, and Turborepo with JWT-based RBAC for secure and scalable deployment.",
      "Designed and optimized PostgreSQL database schemas using Prisma ORM with proper normalization, indexing, and audit trails.",
      "Built a high-performance API layer featuring Zod validation, pagination, filtering, caching, and request batching for scalable data access.",
      "Achieved 100% test coverage across unit, integration, and API tests using Vitest in a monorepo architecture.",
      "Led CI/CD pipeline integration and optimized frontend state management using Redux Toolkit and custom React hooks.",
      "Built AR-Magic, a web-based digital visiting card platform with AR features, QR/NFC integration, secure JWT/OTP authentication, and AWS S3 media storage using Next.js and MongoDB.",
    ],
    skills: [
      { name: "TypeScript", icon: "/tech-icon/typescript.svg" },
      { name: "Node.js", icon: "/tech-icon/nodejs.svg" },
      {
        name: "Express.js",
        icon: "/tech-icon/expressjs.svg",
        hasDarkIcon: true,
      },
      { name: "React", icon: "/tech-icon/react.svg" },
      { name: "Next.js", icon: "/tech-icon/nextjs.svg", hasDarkIcon: true },
      { name: "PostgreSQL", icon: "/tech-icon/postgresql.svg" },
      { name: "Prisma", icon: "/tech-icon/prisma.svg", hasDarkIcon: true },
      { name: "Redux Toolkit", icon: "/tech-icon/redux.svg" },
      { name: "Vitest", icon: "/tech-icon/vitest.svg" },
      { name: "AWS S3", icon: "/tech-icon/aws.svg", hasDarkIcon: true },
      { name: "MongoDB", icon: "/tech-icon/mongodb.svg" },
      {
        name: "Turborepo",
        icon: "/tech-icon/turborepo.svg",
        hasDarkIcon: true,
      },
    ],
  },

  {
    company: "Codemix",
    logo: "/company/codemix.jpg",
    designation: "MERN Stack Developer Intern",
    type: "Internship",
    startDate: "04.2023",
    endDate: "09.2023",
    isCurrent: false,
    description: [
      "Built a geolocation platform to convert and transmit client geocode data into human-readable addresses using Node.js, Express, React, and MongoDB (Mongoose).",
      "Engineered a role-based authentication and authorization system with real-time monitoring for HR and service management applications.",
      "Implemented secure mobile and email-based OTP authentication with hashed credentials, improving user experience and strengthening data protection.",
    ],
    skills: [
      { name: "JavaScript", icon: "/tech-icon/js.svg" },
      { name: "Node.js", icon: "/tech-icon/nodejs.svg" },
      {
        name: "Express.js",
        icon: "/tech-icon/expressjs.svg",
        hasDarkIcon: true,
      },
      { name: "React", icon: "/tech-icon/react.svg" },
      { name: "MongoDB with Mongoose", icon: "/tech-icon/mongodb.svg" },
      { name: "JWT", icon: "/tech-icon/jwt.svg" },
      { name: "Github", icon: "/tech-icon/github.svg", hasDarkIcon: true },
    ],
  },

  {
    company: "Capebyte",
    logo: "/company/capebyte.png",
    designation: "Full Stack Developer (Contract)",
    type: "Contract",
    startDate: "01.2024",
    endDate: "06.2024",
    isCurrent: false,
    description: [
      "Worked as a contract Full Stack Developer delivering multiple client-facing web applications across different domains.",
      "Designed and implemented scalable backend services and REST APIs using Node.js, Express, and MongoDB/PostgreSQL based on project requirements.",
    ],
    skills: [
      { name: "TypeScript", icon: "/tech-icon/typescript.svg" },
      { name: "Node.js", icon: "/tech-icon/nodejs.svg" },
      {
        name: "Express.js",
        icon: "/tech-icon/expressjs.svg",
        hasDarkIcon: true,
      },
      { name: "React", icon: "/tech-icon/react.svg" },
      { name: "Next.js", icon: "/tech-icon/nextjs.svg", hasDarkIcon: true },
      { name: "MongoDB", icon: "/tech-icon/mongodb.svg" },
      { name: "PostgreSQL", icon: "/tech-icon/postgresql.svg" },
      { name: "JWT", icon: "/tech-icon/jwt.svg" },
    ],
  },

  {
    company: "JP Foundation",
    logo: "/company/jai_prabha_foundation.png",
    designation: "Web Developer (Contract)",
    type: "Contract",
    startDate: "08.2022",
    endDate: "10.2022",
    isCurrent: false,
    description: [
      "Designed and developed the official informational website for Jai Prakash Narayan Foundation, a central government–undertaken NGO based in Sitab Diara.",
      "Built a lightweight, accessible, and responsive website using pure HTML and CSS to ensure compatibility across low-bandwidth and legacy devices.",
      "Structured content to clearly communicate the foundation’s mission, initiatives, and public information in a government-compliant and user-friendly format.",
      "Focused on clean UI, semantic markup, and performance optimization for fast load times and long-term maintainability.",
    ],
    skills: [
      { name: "React", icon: "/tech-icon/react.svg" },
      { name: "React Query", icon: "/tech-icon/reactquery.svg" },
      {
        name: "Express.js",
        icon: "/tech-icon/expressjs.svg",
        hasDarkIcon: true,
      },
    ],
  },
];
