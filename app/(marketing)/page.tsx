import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import React from "react"
import IconCard from "@/components/iconCard"
import { db } from "@/lib/db"
import { unstable_cache } from "next/cache"

const getPopularIcons = unstable_cache(
  async () =>
    await db.icon.findMany({
      where: {
        public: true,
      },
      orderBy: {
        downloads: "desc",
      },
      skip: 0,
      take: 12,
    }),
  ["popular_icons"],
  {
    revalidate: 3600,
  }
)

export default async function page() {
  const icons = await getPopularIcons()
  return (
    <div className="container mt-6 md:mt-24">
      <div className=" flex flex-col items-center">
        <p className="rounded bg-muted p-2 text-sm text-foreground ">
          Icon library by the community
        </p>
        <h1 className="my-3 text-5xl font-bold md:text-6xl">My Icons</h1>
        <p className="text-center text-base font-medium text-foreground/60 md:text-lg">
          Customize your icons according to your preferences. Your computer,
          your icons.
        </p>
        <div className="mt-6 flex justify-center gap-6">
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
              "relative flex gap-2"
            )}
            href="/create"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full  animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            Create Custom Icon
          </Link>
        </div>
      </div>

      <div className="mt-12 md:mt-24">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Popular Icons</h2>
        </div>
        <div className="mb-6 mt-6 grid  grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
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
  )
}
