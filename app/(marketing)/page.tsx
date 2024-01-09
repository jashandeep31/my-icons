import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import PopularIcons from "./components/popularIcons";

export default function page() {
  return (
    <div className="container md:mt-24 mt-6">
      <div className=" flex flex-col items-center">
        <p className="text-foreground p-2 text-sm rounded bg-muted ">
          Icons library by comunity, for comunity
        </p>
        <h1 className="text-6xl my-3 font-bold">My Icons</h1>
        <p className="text-lg font-medium text-foreground/60">
          Customize your icons according to your preferences. Your computer,
          your icons.
        </p>
        <div className="flex justify-center gap-6 mt-6">
          <Link
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "flex gap-2"
            )}
            href="/icons"
          >
            Explore
          </Link>

          <Link
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "flex gap-2"
            )}
            href="https://github.com/jashandeep31/my-icons"
          >
            <Icons.gitHub width={15} />
            Github
          </Link>
        </div>
      </div>

      <div className="md:mt-24 mt-12">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Popular Icons</h2>
          {/* <div>
                        <input
                            type="text"
                            className="border rounded p-1 bg-muted text-sm"
                        />
                    </div> */}
        </div>
        <PopularIcons />
      </div>
    </div>
  );
}
