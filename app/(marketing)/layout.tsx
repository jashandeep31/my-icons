import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";
import LayoutClient from "./layout.client";

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

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Just to the icon view moodal with controll FIXME:  better solution can remove this*/}
      <LayoutClient />
      <header className="sticky top-0">
        <Navbar />
      </header>
      <div dangerouslySetInnerHTML={{ __html: button }} />

      <main className="flex-1 mb-6">{children}</main>
      <Footer />
    </div>
  );
}
