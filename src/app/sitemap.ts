import { generateSitemap } from "@/lib/seo-utils";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return generateSitemap();
}
