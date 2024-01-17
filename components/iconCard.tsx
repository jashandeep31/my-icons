"use client"
import React from "react"
import Image from "next/image"
import { iconTypes } from "@/types"
import { useDispatch } from "react-redux"
import { updateIconModalWhole } from "@/store/features/playground/iconModalSlice"
const IconCard = ({ icon }: { icon: iconTypes }) => {
  const dispatch = useDispatch()
  return (
    <div
      className="w-full cursor-pointer rounded-md bg-muted p-4"
      onClick={() =>
        dispatch(updateIconModalWhole({ id: icon.id, active: true }))
      }
    >
      <Image src={icon.pngURL} width={250} height={250} alt="" />
      <p className="inline-block rounded-full bg-background px-2 py-1  text-xs text-foreground/60 ">
        {icon.name}
      </p>
    </div>
  )
}

export default IconCard
