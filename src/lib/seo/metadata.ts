// src/lib/seo/metadata.ts
import type { Metadata } from "next";

export const siteConfig = {
  name: "Saas Based CRM Admin Dashboard",
  shortName: "SBCRMAD",
  description: "Saas Based CRM Admin Dashboard",
  url: "https://fun-engagement-dashboard.vercel.app",
  ogImage: "/logo.png",
  logo: {
    default: "/logo.png",
    dark: "/logo.png",
    favicon: "/favicon.ico",
    apple: "/logo.png",
    external: "https://i.postimg.cc/g2SgRtQk/logo.png",
    altText: "Saas Based CRM Admin Dashboard",
  },
  creator: "@nrbnayon",
  author: "gabrielepassam",
  company: "Prime Flow",
  type: "website",
  version: "1.0.0",

  // Contact Information
  contact: {
    email: "admin@your-domain.com",
    support: "support@your-domain.com",
  },

  // Social Media Links
  links: {
    twitter: "https://twitter.com/nrbnayon",
    github: "https://github.com/nrbnayon",
  },

  // Legal Pages
  legal: {
    privacy: "/privacy-policy",
    terms: "/terms-of-service",
    cookies: "/cookie-policy",
  },

  // Features for documentation/marketing
  features: ["Saas Based CRM Admin Dashboard"],

  keywords: ["SaaS-Based CRM Platform"],

  locale: "en_US",
  languages: ["en"],

  // Theme
  theme: {
    // primary: "#your-primary-color",
    // secondary: "#your-secondary-color",
    // Add other theme colors if needed
  },

  // Analytics (if using)
  analytics: {
    // googleAnalytics: "GA_MEASUREMENT_ID",
    // googleTagManager: "GTM_ID",
  },
};

// Enhanced metadata for layout.tsx
export const layoutMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.creator,
  publisher: siteConfig.company || siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteConfig.url,
    // languages: {
    //   'en-US': '/en-US',
    //   'es-ES': '/es-ES',
    // },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.logo.altText,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.creator,
    site: siteConfig.creator,
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/logo.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/logo.svg", color: "#000000" }],
  },
  //   manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code",
    // bing: "your-bing-verification-code",
  },
  category: "saas",
  classification: "SaaS-Based CRM Platform Management Software",
  referrer: "origin-when-cross-origin",
  other: {
    // "theme-color": siteConfig.theme?.primary || "#000000",
    // "color-scheme": "light dark",
  },
};

// export const generateMatchMetadata = (): Metadata => ({
//   title: "Live Matches & Fixtures",
//   description:
//     "Track live football matches, upcoming fixtures, and match results. View team lineups, match statistics, and real-time updates for all your favorite teams.",
//   keywords: [
//     "live football matches",
//     "match fixtures",
//     "team lineups",
//     "match results",
//     "football statistics",
//     "live scores",
//   ],
//   openGraph: {
//     title: "Live Matches & Fixtures | Fan Engagement Dashboard",
//     description:
//       "Follow live football matches and upcoming fixtures with real-time updates and detailed statistics.",
//     images: ["/og-matches.jpg"], // Create specific OG images for different sections
//   },
// });

// export const generatePlayerMetadata = (): Metadata => ({
//   title: "Player Management & Statistics",
//   description:
//     "Comprehensive player database with detailed statistics, performance metrics, and team roster management. Track player status, jersey numbers, and career progress.",
//   keywords: [
//     "player management",
//     "football players",
//     "player statistics",
//     "team roster",
//     "player database",
//     "performance metrics",
//   ],
//   openGraph: {
//     title: "Player Management | Fan Engagement Dashboard",
//     description:
//       "Manage your team's players with comprehensive statistics and performance tracking.",
//     images: ["/og-players.jpg"],
//   },
// });

// export const generateNewsMetadata = (): Metadata => ({
//   title: "Football News & Updates",
//   description:
//     "Stay updated with the latest football news, transfer updates, match reports, and exclusive insights from the world of football.",
//   keywords: [
//     "football news",
//     "transfer updates",
//     "match reports",
//     "football insights",
//     "sports journalism",
//     "football updates",
//   ],
//   openGraph: {
//     title: "Football News & Updates | Fan Engagement Dashboard",
//     description:
//       "Get the latest football news and exclusive insights from around the world.",
//     images: ["/og-news.jpg"],
//   },
// });

// export const generateFanRankingMetadata = (): Metadata => ({
//   title: "Fan Engagement & Rankings",
//   description:
//     "Discover top fans, engagement statistics, and community rankings. See who are the most active supporters and track fan loyalty metrics.",
//   keywords: [
//     "fan engagement",
//     "fan rankings",
//     "supporter statistics",
//     "community engagement",
//     "fan loyalty",
//     "engagement metrics",
//   ],
//   openGraph: {
//     title: "Fan Rankings & Engagement | Fan Engagement Dashboard",
//     description:
//       "Track fan engagement and discover your most loyal supporters with detailed analytics.",
//     images: ["/og-fans.jpg"],
//   },
// });

// // JSON-LD structured data for better SEO
// export const organizationSchema = {
//   "@context": "https://schema.org",
//   "@type": "SoftwareApplication",
//   name: siteConfig.name,
//   description: siteConfig.description,
//   url: siteConfig.url,
//   applicationCategory: "Sports Management Software",
//   operatingSystem: "Web",
//   offers: {
//     "@type": "Offer",
//     price: "0",
//     priceCurrency: "USD",
//   },
//   creator: {
//     "@type": "Organization",
//     name: "Your Organization Name", // Update with your organization
//   },
//   featureList: [
//     "Live Match Tracking",
//     "Player Management",
//     "Fan Engagement Analytics",
//     "Real-time News Updates",
//     "Performance Statistics",
//     "Team Management Tools",
//   ],
// };

// // Article schema for news pages
// export const generateArticleSchema = (article: {
//   title: string;
//   description: string;
//   image: string;
//   createTime: string;
//   id: string;
// }) => ({
//   "@context": "https://schema.org",
//   "@type": "Article",
//   headline: article.title,
//   description: article.description,
//   image: `${siteConfig.url}${article.image}`,
//   datePublished: new Date(article.createTime).toISOString(),
//   author: {
//     "@type": "Organization",
//     name: siteConfig.name,
//   },
//   publisher: {
//     "@type": "Organization",
//     name: siteConfig.name,
//     logo: {
//       "@type": "ImageObject",
//       url: `${siteConfig.url}/logo.png`,
//     },
//   },
//   mainEntityOfPage: {
//     "@type": "WebPage",
//     "@id": `${siteConfig.url}/news/${article.id}`,
//   },
// });

// // Sports event schema for matches
// export const generateSportsEventSchema = (match: {
//   teamA: { name: string };
//   teamB: { name: string };
//   date: string;
//   time: string;
//   status?: string;
// }) => ({
//   "@context": "https://schema.org",
//   "@type": "SportsEvent",
//   name: `${match.teamA.name} vs ${match.teamB.name}`,
//   startDate: new Date(`${match.date} ${match.time}`).toISOString(),
//   eventStatus: match.status === "live" ? "EventScheduled" : "EventPostponed", // Adjust based on your status logic
//   competitor: [
//     {
//       "@type": "SportsTeam",
//       name: match.teamA.name,
//     },
//     {
//       "@type": "SportsTeam",
//       name: match.teamB.name,
//     },
//   ],
//   sport: "Football",
// });
