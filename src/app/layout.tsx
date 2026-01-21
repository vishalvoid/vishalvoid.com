import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import SiteHeader from "@/components/layouts/site-header";
import SiteFooter from "@/components/layouts/site-footer";
import { DeveloperDetails } from "@/dev-constants/details";
import { Metadata } from "next";
import { SidebarProvider } from "@/lib/sidebar-provider";
import SidebarWrapper from "@/components/layouts/sidebar-wrapper";
import PageTransition from "@/components/ui/extended/page-transition";

export const metadata: Metadata = {
  title: DeveloperDetails.seo.title,
  description: DeveloperDetails.seo.description,
  keywords: DeveloperDetails.seo.keywords,
  authors: [{ name: DeveloperDetails.name }],
  creator: DeveloperDetails.name,
};

const siteUrl = DeveloperDetails.portfolio.replace(/\/$/, "");
metadata.metadataBase = new URL(siteUrl);

// og image
const ogImage = `${siteUrl}/og-image.png`;

metadata.openGraph = {
  title: DeveloperDetails.seo.title,
  description: DeveloperDetails.seo.description,
  url: siteUrl,
  siteName: DeveloperDetails.name,
  images: [
    {
      url: ogImage,
      width: 1200,
      height: 630,
      alt: `${DeveloperDetails.name} | Open Graph Image`,
    },
  ],
  locale: "en_US",
  type: "website",
};

metadata.twitter = {
  card: "summary_large_image",
  title: DeveloperDetails.seo.title,
  description: DeveloperDetails.seo.description,
  images: [ogImage],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: DeveloperDetails.name,
  url: siteUrl,
  image: `${siteUrl}${DeveloperDetails.avatar}`,
  jobTitle: DeveloperDetails.designation,
  description: DeveloperDetails.bio,
  email: `mailto:${DeveloperDetails.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: DeveloperDetails.location.city,
    addressCountry: DeveloperDetails.location.country,
  },
  sameAs: DeveloperDetails.socialLinks.map((link) => link.url),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: DeveloperDetails.name,
  url: siteUrl,
  description: DeveloperDetails.seo.description,
  author: {
    "@type": "Person",
    name: DeveloperDetails.name,
  },
};

const font = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={font.className} suppressHydrationWarning>
        <SidebarProvider>
          <SidebarWrapper>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:ring-2 focus:ring-ring focus:rounded-md"
              >
                Skip to main content
              </a>

              <SiteHeader />
              <main id="main-content" className="min-h-[70vh]">
                <PageTransition>{children}</PageTransition>
              </main>
              <SiteFooter />
            </ThemeProvider>
          </SidebarWrapper>
        </SidebarProvider>
      </body>
    </html>
  );
}
