import type { DeveloperConfig } from "@/types";

export const DeveloperDetails: DeveloperConfig = {
  name: "Vishal Kr. Singh",
  initials: "VKS",
  designation: "Fullstack Developer",
  portfolio: "https://vishalvoid.com",
  email: "tech.vishalkrsingh@gmail.com",
  bio: "Hello People, I'm Vishal Kumar Singh, a fullstack developer from Noida, India with 2+ years of experience building performant, accessible web applications. I specialize in React, Next.js and TypeScript, and I focus on creating maintainable code, thoughtful UX, and reliable backends.",
  avatar: "/vishal_kumar_singh.jpeg",
  resume: "https://vishalvoid.com/vishal_resume.pdf",
  github: "vishalvoid",
  socialLinks: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/vishalvoid/",
      icon: "/social/linkedin.svg",
      hasDarkIcon: false,
      handle: "@vishalvoid",
    },
    {
      name: "GitHub",
      url: "https://github.com/vishalvoid",
      icon: "/social/github.svg",
      hasDarkIcon: true,
      handle: "@vishalvoid",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/vishalvoid",
      icon: "/social/twitter.svg",
      hasDarkIcon: false,
      handle: "@vishalvoid",
    },
    {
      name: "Medium",
      url: "https://medium.com/@vishalvoid",
      icon: "/social/medium.svg",
      hasDarkIcon: true,
      handle: "@vishalvoid",
    },
  ],
  location: {
    city: "Noida",
    country: "India",
  },
  seo: {
    title: "Vishal Kumar Singh - Fullstack Developer",
    description:
      "Vishal Kumar Singh is a Fullstack Developer from Noida, India with 2+ years of experience in building performant web applications.",
    keywords: [
      "FullStack",
      "developer",
      "react",
      "nextjs",
      "typescript",
      "web development",
      "portfolio",
      "vishalvoid",
      "vishaldev",
    ],
  },
  education: [
    {
      degree: "Master's of Computer Applications",
      institution: "GLA University",
      logo: "/education/GLA_University_logo.png",
      startDate: "2024",
      endDate: "2026",
      location: "Mathura, Uttar Pradesh, India",
    },
    {
      degree: "Bachelor's of Computer Applications",
      institution: "Glocal University",
      logo: "/education/Glocal_University_logo.webp",
      startDate: "2020",
      endDate: "2023",
      location: "Saharanpur, Uttar Pradesh, India",
    },
  ],
};
