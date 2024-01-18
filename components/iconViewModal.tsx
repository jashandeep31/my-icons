"use client"
import { cn } from "@/lib/utils"
import { Check, Copy, Download, X } from "lucide-react"
import React, { useEffect, useState } from "react"
import { buttonVariants } from "./ui/button"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import {
  selectIconModalConfig,
  updateIconModalState,
} from "@/store/features/playground/iconModalSlice"
import axios from "axios"
import { baseUrl } from "@/lib/axiosConfig"
import { iconTypes } from "@/types"
import { useClickAway } from "@uidotdev/usehooks"
import { platform } from "os"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const IconViewModal = () => {
  const iconModalConfig = useSelector(selectIconModalConfig)
  const [iconData, setIconData] = useState<null | iconTypes>(null)
  const [loading, setLoading] = useState(true)
  const [viewOf, setViewOf] = useState<"png" | "ico">("png")
  const [messageCopied, setMessageCopied] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const ref = useClickAway<HTMLDivElement>(() => {
    dispatch(updateIconModalState(false))
  })

  const redirectFunction = (platform: string) => {
    dispatch(updateIconModalState(false))
    router.push(`/icons?platform=${platform}`)
  }

  const copyCommand = () => {
    const id = toast.loading("Getting command")

    try {
      navigator.clipboard.writeText(`
attrib -h -s "%cd%\\desktop.ini"
del /q /f "%cd%\\desktop.ini"
attrib -h "%cd%\\icon.ico"
del /q /f "%cd%\\icon.ico"
echo [.ShellClassInfo] > desktop.ini
curl -o icon.ico ${iconData?.icoURL}
attrib +h "%cd%\\icon.ico"
echo IconResource="%cd%\\icon.ico",0 >> desktop.ini
attrib +h  desktop.ini
attrib +r "%cd%"
      `)

      setMessageCopied(true)
      toast.success("Copied 🎉", { id })
      setTimeout(() => {
        setMessageCopied(false)
      }, 2000)
    } catch (e) {
      toast.error("Coping failed", { id })
    }
  }

  useEffect(() => {
    if (iconModalConfig.active) {
      axios
        .get(`${baseUrl}/icons/get/${iconModalConfig.id}`)
        .then((res) => {
          if (res.status === 200) {
            setIconData(res.data.data.icon)
          }
          setLoading(false)
        })
        .catch((e) => {
          toast.error("Failed to get Icon details")
        })
      return () => {
        setLoading(true)
        setIconData(null)
      }
    }
  }, [iconModalConfig])

  if (!iconData) {
    return (
      // Just a loading state so be carefull while editing may confuse refactor is needed here
      <div className=" fixed left-0  top-0 z-20 flex h-screen w-full items-center justify-center bg-[#000000B3] px-4 py-12   md:p-4 ">
        <div
          className="grid h-3/4 w-full gap-6 rounded-md bg-background p-12 md:w-3/4 md:grid-cols-2"
          ref={ref}
        >
          <div className="h-full w-full animate-pulse rounded-md bg-muted "></div>
          <div className="flex flex-col justify-between py-12">
            <div>
              <div className="h-6 rounded bg-muted"></div>
              <div className="mt-3 h-2  w-1/3 rounded bg-muted"></div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-12 w-full rounded bg-muted"></div>
              <div className="h-12 w-full rounded bg-muted"></div>
            </div>
            <div>
              <div className="h-3 rounded bg-muted"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed left-0  top-0  z-20 flex h-screen w-full items-center justify-center bg-black/80  px-4 py-12 md:px-4 md:py-4 ">
      <div
        className=" h-full w-full overflow-y-auto rounded-md border-2 bg-background md:h-auto md:w-3/4"
        ref={ref}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            Get Your Icon{" "}
          </h3>
          <button
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-foreground/60 "
            )}
            onClick={() => {
              dispatch(updateIconModalState(false))
            }}
          >
            <X width={15} height={15} />
          </button>
        </div>
        <div className="grid items-center gap-6 px-4  py-8 md:grid-cols-2">
          <div className="flex flex-col items-center">
            <div className="h-64 w-64 rounded-md bg-muted p-6">
              {/* Not optimized so that drag drop should possible */}
              {viewOf === "png" ? (
                <img src={iconData.pngURL} alt="" />
              ) : (
                <img src={iconData.icoURL} alt="" />
              )}
            </div>
            <p className="text-xs "> Drag and drop your {viewOf} file.</p>
            <div className="mt-4 grid w-64 grid-cols-2 gap-2 rounded-md bg-muted p-1 ">
              <button
                onClick={() => setViewOf("png")}
                className={`${
                  viewOf === "png"
                    ? "bg-primary text-primary-foreground shadow"
                    : ""
                } w-full rounded p-2 text-sm text-foreground/60 `}
              >
                PNG
              </button>
              <button
                onClick={() => setViewOf("ico")}
                className={`${
                  viewOf === "ico"
                    ? "bg-primary text-primary-foreground shadow"
                    : ""
                } w-full rounded p-2 text-sm text-foreground/60 `}
              >
                ICO
              </button>
            </div>
          </div>
          <div className="flex h-full flex-col  justify-between gap-6 py-12">
            <div>
              <h1 className="text-xl  font-bold">{iconData.name}</h1>
              <p className="text-sm text-foreground underline ">
                <button
                  className="underline"
                  onClick={() => redirectFunction(iconData.platform)}
                >
                  {iconData.platform}
                </button>
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 ">
              <Link
                href={iconData.pngURL}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "flex w-full items-center  gap-2"
                )}
              >
                PNG <Download width={15} height={15} />
              </Link>
              <Link
                href={iconData.icoURL}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "flex w-full items-center  gap-2"
                )}
              >
                ICO <Download width={15} height={15} />
              </Link>
            </div>

            <div>
              <div className="flex items-center justify-between rounded-md border bg-muted/60 p-2 text-xs">
                <p className="font-medium text-foreground/60">
                  cmd for windows
                </p>
                <button
                  onClick={copyCommand}
                  className="rounded p-1 duration-300 hover:bg-primary hover:text-black"
                >
                  {!messageCopied ? (
                    <Copy width={12} height={12} />
                  ) : (
                    <Check width={12} height={12} />
                  )}
                </button>
              </div>
              <Link
                href="https://github.com/jashandeep31/my-icons/blob/main/howCMDWork.md"
                className="text-xs font-medium text-foreground/60 underline"
              >
                Learn how to use?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IconViewModal
