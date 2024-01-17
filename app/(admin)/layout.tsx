import Navbar from "@/components/navbar"
import React from "react"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <Navbar />
      </header>
      <main className="grid flex-1">{children}</main>
    </div>
  )
}

export default layout
