"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { MainMenuConfig } from "@/config/navbarConfig";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";
const Navbar = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="py-3 border-b bg-white">
        <div className="container flex justify-between items-center">
          <div className=" items-center flex gap-8">
            <Link href="/">
              <Icons.logo height={20} />
              {/* <Image
                                alt="Logo"
                                src={"/logo.svg"}
                                width={90}
                                height={90}
                            /> */}
            </Link>
            <nav className="flex gap-4 font-medium text-sm">
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
          </div>
          <div>
            <Link href="/login" className={cn(buttonVariants({ size: "sm" }))}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
