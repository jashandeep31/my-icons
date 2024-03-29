"use client"
import IconCard from "@/components/iconCard"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { baseUrl } from "@/lib/axiosConfig"
import { cn } from "@/lib/utils"
import { iconTypes } from "@/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { Search } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"

const IconsRenderer = () => {
  const searchParams = useSearchParams()

  const [platform, setPlatform] = useState<
    "ALL" | "WINDOWS" | "MACOS" | "OTHER" | ""
  >(
    (searchParams.get("platform") as
      | "ALL"
      | "WINDOWS"
      | "MACOS"
      | "OTHER"
      | "") ?? ""
  )
  const [query, setQuery] = useState<string>("")
  const initialQueryHandler = useRef<boolean>(true)

  const { ref, inView } = useInView({
    triggerOnce: true,
  })
  const fetchIcons = async (pageParams: any) => {
    try {
      let verifiedPlatform: string = ""

      if (
        ["ALL", "WINDOWS", "MACOS", "OTHER", ""].includes(
          platform.toUpperCase()
        )
      ) {
        verifiedPlatform = platform.toUpperCase()
      }

      const res = await axios.get(
        `${baseUrl}/icons?page=${pageParams}&platform=${verifiedPlatform}&q=${query}`
      )
      return res.data.icons
    } catch (e) {}
  }

  const {
    data,
    isFetched,
    isFetching,
    hasNextPage,
    isError,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    queryKey: ["allIconsQuery"],
    queryFn: async ({ pageParam }) => {
      return await fetchIcons(pageParam)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages) => {
      if (lastPage) {
        return lastPage.length >= 24 ? pages.length + 1 : undefined
      }
      return undefined
    },
  })
  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
    return () => {}
  }, [inView])

  useEffect(() => {
    if (platform !== "") {
      refetch()
    }
  }, [platform])

  useEffect(() => {
    if (!initialQueryHandler.current) {
      const delayDebounceFn = setTimeout(() => {
        refetch()
      }, 300)

      return () => clearTimeout(delayDebounceFn)
    } else if (query !== "") {
      initialQueryHandler.current = false
      refetch()
    }
  }, [query])

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="hidden text-lg font-bold md:block">Icons</h1>
        <div className="flex gap-2">
          <Input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Photoshop"
          />
          <Button size={"sm"} variant={"secondary"}>
            <Search width={15} height={15} onClick={() => refetch()} />
          </Button>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => {
            setPlatform("ALL")
          }}
          className={` text-sm  duration-300 hover:text-foreground ${
            platform === "ALL" || platform === ""
              ? "text-foreground underline"
              : "text-foreground/60"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setPlatform("WINDOWS")}
          className={` ${
            platform === "WINDOWS"
              ? "text-foreground underline"
              : "text-foreground/60"
          } text-sm  duration-300 hover:text-foreground`}
        >
          Windows
        </button>
        <button
          onClick={() => setPlatform("MACOS")}
          className={` ${
            platform === "MACOS"
              ? "text-foreground underline"
              : "text-foreground/60"
          } text-sm  duration-300 hover:text-foreground`}
        >
          Mac Os
        </button>
      </div>
      <div className="mt-3">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
          {data
            ? data.pages.map((page: iconTypes[], index: number) => (
                <React.Fragment key={index}>
                  {page &&
                    page.map((icon, index) => {
                      if (page.length === index + 1) {
                        return (
                          <div key={icon.id} ref={ref}>
                            <IconCard icon={icon} />
                          </div>
                        )
                      } else {
                        return (
                          <div key={icon.id}>
                            <IconCard icon={icon} />
                          </div>
                        )
                      }
                    })}
                </React.Fragment>
              ))
            : null}
          {isFetching
            ? [...Array(12)].map((item, index) => (
                <div
                  key={index}
                  className="min-h-48 w-full animate-pulse rounded-md bg-muted"
                ></div>
              ))
            : null}
        </div>
        {!isFetching && data?.pages[0].length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center py-12">
            <h1 className="text-3xl font-bold">No Icons Found</h1>
            <p className="mt-3 text-lg text-primary/50">
              Don&apos;t worry create your own icon.{" "}
            </p>
            <Link
              className={cn(buttonVariants({ variant: "secondary" }), "mt-8")}
              href={"/create"}
            >
              Create Custom Icon
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default IconsRenderer
