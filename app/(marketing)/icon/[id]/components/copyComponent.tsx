"use client"
import { toast } from "sonner"
import { Check, Copy } from "lucide-react"
import Link from "next/link"
import React, { useState } from "react"

const CopyComponent = ({ url }: { url: string }) => {
  const [messageCopied, setMessageCopied] = useState(false)

  const copyCommand = () => {
    const id = toast.loading("Getting command")
    try {
      navigator.clipboard.writeText(`
attrib -h -s "%cd%\\desktop.ini"
del /q /f "%cd%\\desktop.ini"
attrib -h "%cd%\\icon.ico"
del /q /f "%cd%\\icon.ico"
echo [.ShellClassInfo] > desktop.ini
curl -o icon.ico ${url}
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

  return (
    <div>
      <div className="flex items-center justify-between rounded-md border bg-muted/60 p-2 text-xs">
        <p className="font-medium text-foreground/60">cmd for windows</p>
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
  )
}

export default CopyComponent
