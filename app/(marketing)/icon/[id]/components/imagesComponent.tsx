"use client"
import React, { useState } from "react"

const ImagesComponent = ({
  pngURL,
  icoURL,
}: {
  pngURL: string
  icoURL: string
}) => {
  const [viewOf, setViewOf] = useState<"png" | "ico">("png")

  return (
    <div className="flex flex-col items-center">
      <div className="w-full rounded-md bg-muted p-6 md:w-2/4">
        {/* Not optimized so that drag drop should possible */}
        {viewOf === "png" ? (
          <img src={pngURL} className="w-full" alt="" />
        ) : (
          <img src={icoURL} className="w-full" alt="" />
        )}
      </div>
      <p className="text-xs "> Drag and drop {viewOf} file.</p>
      <div className="mt-4 grid w-full grid-cols-2 gap-2 rounded-md bg-muted p-1 md:w-2/4 ">
        <button
          onClick={() => setViewOf("png")}
          className={`${
            viewOf === "png" ? "bg-background text-foreground shadow" : ""
          } w-full rounded p-2 text-sm text-foreground/60 `}
        >
          PNG
        </button>
        <button
          onClick={() => setViewOf("ico")}
          className={`${
            viewOf === "ico" ? "bg-background text-foreground shadow" : ""
          } w-full rounded p-2 text-sm text-foreground/60 `}
        >
          ICO
        </button>
      </div>
    </div>
  )
}

export default ImagesComponent
