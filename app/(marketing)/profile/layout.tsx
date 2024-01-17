import React from "react"
import SideBar from "./components/sideBar"

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mt-6">
      <div className="grid gap-8 md:grid-cols-5">
        <div className="">
          <SideBar />
        </div>
        <div className="md:col-span-4">{children}</div>
      </div>
    </div>
  )
}
