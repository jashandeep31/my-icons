import Navbar from "@/components/navbar";
import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0">
        <Navbar />
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
