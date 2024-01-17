"use client"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const config = [
  {
    name: "Profile",
    href: "/profile",
  },
  {
    name: "My Icons",
    href: "/profile/my-icons",
  },
  {
    name: "Account Settings",
    href: "/profile/settings",
  },
]

const SideBar = () => {
  const pathname = usePathname()

  return (
    <ul className="hidden gap-2  text-sm  md:flex md:flex-col">
      {config.map((item, index) => (
        <li key={index}>
          <Link
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              `flex justify-start  text-foreground/60 ${
                pathname === item.href ? "bg-muted text-foreground" : ""
              }`
            )}
            href={item.href}
          >
            {item.name}
          </Link>
        </li>
      ))}
      <li>
        <button
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "flex w-full items-center justify-start gap-2 text-red-500 hover:text-red-600 "
          )}
          onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
        >
          Logout <LogOut width={15} height={15} />
        </button>
      </li>
    </ul>
  )
}

export default SideBar
