import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";
import LayoutClient from "./layoutClient";

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

      <main className="flex-1 mb-6">{children}</main>
      <Footer />
    </div>
  );
}
