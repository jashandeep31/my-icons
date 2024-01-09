"use client";
import { MainMenuConfig } from "@/config/navbarConfig";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DesktopNavMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex gap-4 font-medium text-sm">
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
      <button onClick={() => signOut()}>Logout</button>
    </nav>
  );
};

export default DesktopNavMenu;
