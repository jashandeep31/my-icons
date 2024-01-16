import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import LayoutClient from "./layoutClient";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/config/siteConfig";
import { ThemeProvider } from "./theme.provider";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Bug } from "lucide-react";
const inter = Inter({ subsets: ["latin"] });
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "Custom Folder Icons",
    "Windows Desktop Icons",
    "MacOS Icon Personalization",
    "Desktop Icon Customization",
    "Personalized Desktop Experience",
  ],
  authors: [
    {
      name: "jashandeep",
      url: "https://twitter.com/jashandeep31",
    },
  ],
  creator: "Jashandeep Singh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: `/og.jpg`,
    creator: "@jashandeep31",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutClient>
            <StoreProvider>
              <Toaster />
              {children}
              <Link
                className={cn(
                  buttonVariants(),
                  "fixed right-10 bottom-10 flex gap-2 items-center"
                )}
                href={"/report-bug"}
              >
                <Bug width={15} height={15} />
                Report Bug
              </Link>
              <Analytics />
              <SpeedInsights />
            </StoreProvider>
          </LayoutClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
