import React from "react";
import SideBar from "./components/sideBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mt-6">
      <div className="grid grid-cols-6 gap-8">
        <div className="">
          <SideBar />
        </div>
        <div className="col-span-5">{children}</div>
      </div>
    </div>
  );
}
