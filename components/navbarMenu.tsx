"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";
import DesktopNavMenu from "./desktopNavMenu";
import Image from "next/image";
import { Menu, MoonIcon, SunIcon, X } from "lucide-react";
import { MainMenuConfig } from "@/config/navbarConfig";
import { useClickAway } from "@uidotdev/usehooks";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavbarMenu = ({
  session,
}: {
  session: {
    image?: string;
    name?: string;
  };
}) => {
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const ref = useClickAway<HTMLDivElement>((e) => {
    setMobileMenuStatus(false);
  });
  const { setTheme } = useTheme();

  const pathname = usePathname();
  useEffect(() => {
    setMobileMenuStatus(false);

    return () => {};
  }, [pathname]);

  return (
    <div
      className={` ${
        !mobileMenuStatus ? "border-b" : null
      }  bg-background   relative flex-col flex items-center`}
      ref={ref}
    >
      <div className="container min-h-16  flex justify-between items-center">
        <div className=" items-center flex gap-8">
          <Link href="/">
            <Icons.logoDark className="dark:block hidden" height={20} />
            <Icons.logo className="dark:hidden" height={20} />
          </Link>
          <DesktopNavMenu />
        </div>

        <div className="md:flex hidden gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {session ? (
            <Link
              href="/profile"
              className={cn(buttonVariants({ variant: "link", size: "sm" }))}
            >
              {session.image ? (
                <Image
                  className="border rounded-full "
                  src={session.image}
                  alt=""
                  width={30}
                  height={30}
                />
              ) : (
                session.name
              )}
            </Link>
          ) : (
            <Link
              href="/login"
              className={cn(
                buttonVariants({ size: "sm", variant: "secondary" })
              )}
            >
              Login
            </Link>
          )}
        </div>
        <div className="flex md:hidden items-center">
          <button
            className="hover:bg-accent duration-300 p-1 rounded"
            onClick={(e) => setMobileMenuStatus(!mobileMenuStatus)}
          >
            {!mobileMenuStatus ? (
              <Menu width={18} height={18} />
            ) : (
              <X width={18} height={18} />
            )}
          </button>
        </div>
      </div>
      <div
        className={`w-full ${
          mobileMenuStatus ? "block absolute top-16 border-b pb-3" : "hidden"
        } container mt-3  bg-background`}
      >
        <nav>
          {MainMenuConfig.map((link, index) => (
            <Link
              className="py-2 block w-full text-sm text-foreground/60"
              href={link.path}
              key={index}
            >
              {link.name}
            </Link>
          ))}
          {session ? (
            <>
              <Link
                className="py-2 block w-full text-sm text-foreground/60"
                href="/profile"
              >
                My Profile
              </Link>
              <Link
                className="py-2 block w-full text-sm text-foreground/60"
                href="/profile/my-icons"
              >
                My Icons
              </Link>
              <Link
                className="py-2 block w-full text-sm text-foreground/60"
                href="/profile/settings"
              >
                Account Settings
              </Link>
            </>
          ) : (
            <Link href="/login" className={cn(buttonVariants({ size: "sm" }))}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default NavbarMenu;
