"use client";
import { MainMenuConfig } from "@/config/navbarConfig";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DesktopNavMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex gap-4 font-medium text-sm">
      {MainMenuConfig.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className={cn(
            `${
              pathname === item.path
                ? "text-foreground underline "
                : "text-foreground/60"
            } hover:text-foreground/90 duration-300`
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNavMenu;
