import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import { Toaster } from "@/components/ui/toaster";
import LayoutClient from "./layout.client";
import Script from "next/script";
import { siteConfig } from "@/config/siteConfig";
const inter = Inter({ subsets: ["latin"] });

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
  // TODO: pending to add for twitter and favicon icon
};

const button = `
<script src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'></script>

<script>
  kofiWidgetOverlay.draw('myicons', {
    'type': 'floating-chat',
    'floating-chat.donateButton.text': 'Support Us',
    'floating-chat.donateButton.background-color': '#00b9fe',
    'floating-chat.donateButton.text-color': '#fff',
  });
</script>`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutClient>
          <StoreProvider>
            <Toaster />
            {children}
          </StoreProvider>
        </LayoutClient>
        <div dangerouslySetInnerHTML={{ __html: button }} />
      </body>
    </html>
  );
}
