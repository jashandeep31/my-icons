"use client"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import React, { useState } from "react"
// import PlayGround from "./components/PlayGround";
import BaseIconChoiceModal from "./components/BaseIconChoiceModal"
import Link from "next/link"
import SidebarTopControls from "./components/SidebarTopControls"
import ExportButton from "./components/ExportButton"
import FinalIconDetailForm from "./components/FinalIconDetailForm"
import dynamic from "next/dynamic"

// TODO: we can implement the resizable from the shadcn ui here for the left bar and right playground
const PlayGround = dynamic(() => import("./components/PlayGround"), {
  ssr: false,
})

const CreateIcon = () => {
  const [baseIconModalState, setBaseIconModalState] = useState(false)
  const [finalFormModalState, setFinalFormModalState] = useState(false)

  return (
    <>
      {finalFormModalState && (
        <FinalIconDetailForm setFinalFormModalState={setFinalFormModalState} />
      )}
      {baseIconModalState && (
        <BaseIconChoiceModal setBaseIconModalState={setBaseIconModalState} />
      )}
      <div className="flex h-screen flex-col">
        <header className="border-b px-3 py-3">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "inline-flex gap-2 text-foreground/60  "
            )}
          >
            <ArrowLeft size={15} /> Back
          </Link>
        </header>
        <div className="grid h-full flex-1 grid-cols-5 ">
          <div className="flex flex-col border-r p-3 ">
            <SidebarTopControls setBaseIconModalState={setBaseIconModalState} />
            <ExportButton setFinalFormModalState={setFinalFormModalState} />
          </div>
          <div className="col-span-4 flex items-center justify-center bg-muted">
            <div>
              <div className="bg-background">
                <PlayGround />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateIcon
