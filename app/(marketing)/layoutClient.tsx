"use client"
import IconViewModal from "@/components/iconViewModal"
import { selectIconModalConfig } from "@/store/features/playground/iconModalSlice"
import React from "react"
import { useSelector } from "react-redux"

const LayoutClient = () => {
  const iconModalConfig = useSelector(selectIconModalConfig)

  return iconModalConfig.active ? <IconViewModal /> : null
}

export default LayoutClient
