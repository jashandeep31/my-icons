import { buttonVariants } from "@/components/ui/button"
import { baseUrl } from "@/lib/axiosConfig"
import { cn } from "@/lib/utils"
import { iconTypes } from "@/types"
import { ArrowLeft, Download } from "lucide-react"
import React from "react"
import Link from "next/link"
import CopyComponent from "./components/copyComponent"
import ImagesComponent from "./components/imagesComponent"

async function getIcon({ id }: { id: string }) {
  const res = await fetch(`${baseUrl}/icons/get/${id}`)

  const data = await res.json()
  return data.data.icon
}

const page = async ({ params }: { params: { id: string } }) => {
  const icon: iconTypes = await getIcon(params)
  return (
    <div className="container mt-6 pb-12">
      <div>
        <button
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "flex items-center gap-2 text-foreground/60"
          )}
        >
          <ArrowLeft width={15} height={15} />
          Back
        </button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <ImagesComponent pngURL={icon.pngURL} icoURL={icon.icoURL} />
        <div className="flex flex-col justify-between gap-6 py-4">
          <div>
            <h1 className="text-2xl font-bold">{icon.name}</h1>
            <Link
              href={"/"}
              className="text-sm text-foreground/60 underline duration-300 hover:text-foreground"
            >
              {icon.platform}
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 ">
            <Link
              href={icon.pngURL}
              className={cn(
                buttonVariants({ variant: "default" }),
                "flex w-full items-center  gap-2"
              )}
            >
              PNG <Download width={15} height={15} />
            </Link>
            <Link
              href={icon.icoURL}
              className={cn(
                buttonVariants({ variant: "default" }),
                "flex w-full items-center  gap-2"
              )}
            >
              ICO <Download width={15} height={15} />
            </Link>
          </div>
          <CopyComponent url={icon.icoURL} />
        </div>
      </div>
    </div>
  )
}

export default page
