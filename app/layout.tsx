import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/shared/whatsapp-button";
import { Toaster } from "@/components/ui/sonner";

// NOTE: next/font/google (Inter, Playfair Display) requires network access to
// fonts.googleapis.com at build time, which is unavailable in this sandbox.
// In a normal deployment, swap this block back to:
//   import { Inter, Playfair_Display } from "next/font/google";
//   const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
//   const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });
// and apply `${inter.variable} ${playfair.variable}` on <html> below.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rsmotors.pk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RS Motors — Premium New & Used Cars in Pakistan",
    template: "%s | RS Motors",
  },
  description:
    "RS Motors is Pakistan's trusted dealership for premium new and used cars. Browse verified Toyota, Honda, Suzuki, Kia, Hyundai, MG, Changan and Proton vehicles with transparent PKR pricing, financing, and inspection reports.",
  keywords: [
    "used cars Pakistan", "car dealership Lahore", "buy cars Pakistan", "Toyota Corolla for sale",
    "Honda Civic for sale", "car financing Pakistan", "RS Motors", "PakWheels alternative",
  ],
  authors: [{ name: "RS Motors" }],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE_URL,
    siteName: "RS Motors",
    title: "RS Motors — Premium New & Used Cars in Pakistan",
    description:
      "Browse verified, inspected vehicles with transparent PKR pricing and easy financing at RS Motors.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "RS Motors" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RS Motors — Premium New & Used Cars in Pakistan",
    description: "Pakistan's trusted destination for premium new and used vehicles.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: "RS Motors",
    image: `${SITE_URL}/og-image.jpg`,
    "@id": SITE_URL,
    url: SITE_URL,
    telephone: "+92-300-1234567",
    priceRange: "PKR",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Main Boulevard, Gulberg",
      addressLocality: "Lahore",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.5204,
      longitude: 74.3587,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "20:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/rsmotors",
      "https://www.instagram.com/rsmotors",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">

      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
