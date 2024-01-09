"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

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
    name: "Account Setting",
    href: "/profile/settings",
  },
];

const SideBar = () => {
  const pathname = usePathname();

  return (
    <ul className="text-sm flex flex-col gap-2">
      {config.map((item, index) => (
        <li key={index}>
          <Link
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              `flex justify-start  text-foreground/60 ${
                pathname === item.href ? "bg-accent text-foreground" : ""
              }`
            )}
            href={item.href}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SideBar;
