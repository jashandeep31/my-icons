"use client";
import React from "react";
import Image from "next/image";
import { iconTypes } from "@/types";
import { useDispatch } from "react-redux";
import { updateIconModalWhole } from "@/store/features/playground/iconModalSlice";
const IconCard = ({ icon }: { icon: iconTypes }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="bg-muted w-full rounded-md p-4 cursor-pointer"
      onClick={() =>
        dispatch(updateIconModalWhole({ id: icon.id, active: true }))
      }
    >
      <Image src={icon.pngURL} width={250} height={250} alt="" />
      <p className="text-xs text-foreground/60 bg-background rounded-full px-2  py-1 inline-block ">
        {icon.name}
      </p>
    </div>
  );
};

export default IconCard;
