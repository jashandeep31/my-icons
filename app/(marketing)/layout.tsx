import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import React from "react"
import LayoutClient from "./layoutClient"

export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Just to the icon view moodal with controll FIXME:  better solution can remove this*/}
      <LayoutClient />
      <header className="sticky  top-0 z-10">
        <Navbar />
      </header>

      <main className="mb-6 flex-1">{children}</main>
      <Footer />
    </div>
  )
}
