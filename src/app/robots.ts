import { generateRobots } from "@/lib/seo-utils";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return generateRobots();
}
