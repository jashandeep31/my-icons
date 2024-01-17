import { buttonVariants } from "@/components/ui/button"
import { baseUrl } from "@/lib/axiosConfig"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { useClickAway } from "@uidotdev/usehooks"
import axios from "axios"
import { X } from "lucide-react"
import React from "react"
import Image from "next/image"
import { useDispatch } from "react-redux"
import { updateBaseIconUrl } from "@/store/features/playground/baseIconSlice"

const BaseIconChoiceModal = ({
  setBaseIconModalState,
}: {
  setBaseIconModalState: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const ref = useClickAway<HTMLDivElement>(() => {
    setBaseIconModalState(false)
  })

  const dispatch = useDispatch()
  // code to fetch the icons from the api
  const getBaseIcons = async () => {
    try {
      const res = await axios.get(`${baseUrl}/baseicons`)
      return res.data.data.baseIcons ? res.data.data.baseIcons : []
    } catch (e) {
      return null
    }
  }
  const baseIconsQuery = useQuery({
    queryKey: ["baseIconsAll"],
    queryFn: async () => await getBaseIcons(),
  })
  return (
    <div className=" fixed left-0  top-0 z-10 flex h-screen w-full items-center justify-center bg-[#000000df]">
      <div
        className="flex h-3/4 w-3/4 flex-col rounded-md border bg-background p-4 shadow"
        ref={ref}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">Choose Base Icon</h1>
          <div className="hidden ">
            <button
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                }),
                "text-sm font-light"
              )}
            >
              All
            </button>
            <button
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                }),
                "text-sm font-light text-foreground/60"
              )}
            >
              Windows
            </button>

            <button
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                }),
                "text-sm font-light text-foreground/60"
              )}
            >
              Mac OS
            </button>
          </div>
          <div>
            <button
              onClick={() => setBaseIconModalState(false)}
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              <X width={15} height={15} />
            </button>
          </div>
        </div>
        <div className="mt-3 flex-1  ">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-6 lg:grid-cols-8  ">
            {baseIconsQuery.isFetched && baseIconsQuery.data
              ? baseIconsQuery.data.map((icon: any, index: number) => (
                  <div
                    className=" flex items-center justify-center rounded bg-muted p-4 duration-300 hover:bg-muted-foreground/15"
                    onClick={() => {
                      // TODO: update the OS along with the icon so that it could  be easy at the end of submiting the
                      dispatch(updateBaseIconUrl(icon.iconUrl) as any)
                      setBaseIconModalState(false)
                    }}
                    key={index}
                  >
                    <Image
                      src={icon.iconUrl}
                      width={250}
                      height={250}
                      alt="Folder icon"
                    />
                  </div>
                ))
              : null}

            {baseIconsQuery.isFetching && (
              <div className="min-h-24 w-full animate-pulse rounded-md bg-muted">
                {" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BaseIconChoiceModal
