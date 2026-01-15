import { DeveloperDetails } from "@/dev-constants/details";
import type { MetadataRoute } from "next";

const normalizeSiteUrl = (url: string) => {
  return url.replace(/\/$/, "");
};

export const generateSitemap = (): MetadataRoute.Sitemap => {
  const siteUrl = normalizeSiteUrl(DeveloperDetails.portfolio);

  const staticRoutes = ["/", "/blog"];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...staticEntries];
};

export const generateRobots = (): MetadataRoute.Robots => {
  const siteUrl = normalizeSiteUrl(DeveloperDetails.portfolio);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
};

export const blogMetadata = () => {
  return {
    title: "Blog | vishalvoid",
    description:
      "Something worth reading during your free time to improve your skills and knowledge",
    keywords: ["Blog", "vishalvoid", "Developer Blog", "vishal kumar singh"],
  };
};
