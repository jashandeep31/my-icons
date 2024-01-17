import React from "react"
import CreateIcon from "./page.client"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default async function page() {
  const session = await getCurrentUser()
  if (!session) [redirect("/login")]
  return (
    <div className="">
      <div className="hidden md:block">
        <CreateIcon />
      </div>
      <div className="container flex h-screen w-full flex-col items-center  justify-center gap-6 md:hidden">
        <p>
          We currently not serving mobile device. Although in mobile you
          download are pre uploaded icons .
        </p>
        <Link
          className={cn(buttonVariants({ variant: "secondary" }))}
          href={"/"}
        >
          Home
        </Link>
      </div>
    </div>
  )
}
