export interface DeveloperConfig {
  name: string;
  initials: string;
  designation: string;
  portfolio: string;
  email: string;
  phone?: string;
  bio: string;
  avatar: string;
  resume: string;
  socialLinks: {
    name: string;
    url: string;
    icon: string;
    hasDarkIcon: boolean;
    handle: string;
  }[];
  location: {
    city: string;
    country: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  education: Array<{
    degree: string;
    institution: string;
    startDate: string;
    logo: string;
    endDate: string;
    location: string;
  }>;
}

export interface Projects {
  icon: string;
  title: string;
  tagline: string;
  description: Array<string>;
  liveLink?: string;
  repo?: string;
  techStack: Array<TechStack>;
}

export interface TechStack {
  name: string;
  icon: string;
  hasDarkIcon?: boolean;
  link?: string;
}
