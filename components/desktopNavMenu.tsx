"use client"
import { MainMenuConfig } from "@/config/navbarConfig"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const DesktopNavMenu = () => {
  const pathname = usePathname()

  return (
    <nav className="hidden gap-4 text-sm font-medium lg:flex">
      {MainMenuConfig.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className={cn(
            `${
              pathname === item.path
                ? "text-foreground underline "
                : "text-foreground/60"
            } duration-300 hover:text-foreground/90`
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}

export default DesktopNavMenu
