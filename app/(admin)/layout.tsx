import Navbar from "@/components/navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Navbar />
      </header>
      <main className="flex-1 grid">{children}</main>
    </div>
  );
};

export default layout;
