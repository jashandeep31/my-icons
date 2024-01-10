import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";
import DesktopNavMenu from "./desktop-navmenu";
import { getCurrentUser } from "@/lib/session";
import Image from "next/image";

const Navbar = async () => {
  const session = await getCurrentUser();
  return (
    <>
      <div className="py-3 border-b bg-white min-h-16  flex items-center">
        <div className="container flex justify-between items-center">
          <div className=" items-center flex gap-8">
            <Link href="/">
              <Icons.logo height={20} />
            </Link>
            <DesktopNavMenu />
          </div>

          <div className="md:flex hidden">
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
                  session.name // Remove the curly braces here
                )}
              </Link>
            ) : (
              <Link
                href="/login"
                className={cn(buttonVariants({ size: "sm" }))}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
