import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="container md:mt-24 mt-6">
      <div className=" flex flex-col items-center">
        <p className="text-foreground p-2 text-sm rounded bg-muted ">
          Library by comunity, for comunity
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
            href="/"
          >
            Explore
          </Link>

          <Link
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "flex gap-2"
            )}
            href="/"
          >
            <Icons.gitHub width={15} />
            Github
          </Link>
        </div>
      </div>

      <div className="mt-24">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Popular Icons</h2>
          {/* <div>
                        <input
                            type="text"
                            className="border rounded p-1 bg-muted text-sm"
                        />
                    </div> */}
        </div>

        <div className="mt-6 grid grid-cols-6 gap-6 mb-6">
          {[1, 2, 3, 4, 5, 5, 6, 7, 78, 8, 89, 6756, 75, 6, 5].map(
            (item, index) => (
              <div
                key={index}
                className="bg-muted w-full rounded-md h-48"
              ></div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
