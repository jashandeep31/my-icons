import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import IconCard from "@/components/iconCard";
import { db } from "@/lib/db";

async function getPopularIcons() {
  const res = await db.icon.findMany({
    where: {
      public: true,
    },
    orderBy: {
      downloads: "desc",
    },
    skip: 0,
    take: 12,
  });

  return res;
}

export default async function page() {
  const icons = await getPopularIcons();
  return (
    <div className="container md:mt-24 mt-6">
      <div className=" flex flex-col items-center">
        <p className="text-foreground p-2 text-sm rounded bg-muted ">
          Icon library by the community
        </p>
        <h1 className="md:text-6xl text-5xl my-3 font-bold">My Icons</h1>
        <p className="md:text-lg text-base text-center font-medium text-foreground/60">
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
              "flex gap-2 relative"
            )}
            href="/create"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full  w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Create Custom Icon
          </Link>
        </div>
      </div>

      <div className="md:mt-24 mt-12">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Popular Icons</h2>
        </div>
        <div className="mt-6 grid grid-cols-2  md:grid-cols-4 lg:grid-cols-6 gap-6 mb-6">
          {icons.map((icon, index) => (
            <IconCard icon={icon} key={index} />
          ))}
        </div>
        <div>
          <Link className={"text-sm underline"} href={"/icons"}>
            See more
          </Link>
        </div>
      </div>
    </div>
  );
}
