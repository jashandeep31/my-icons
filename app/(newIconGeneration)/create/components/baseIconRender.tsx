"use client";
import { selectBaseIconConfig } from "@/store/features/playground/baseIconSlice";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Image } from "react-konva";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import useImage from "use-image";
const BaseIconRender = forwardRef(
  (
    {
      baseImage,
    }: {
      baseImage: string;
    },
    ref: any
  ) => {
    // react redux configs
    const baseIconConfig = useSelector(selectBaseIconConfig);
    const [image] = useImage(baseImage);

    if (!baseIconConfig.visible) {
      return null;
    }
    return (
      <Image
        width={512}
        alt=""
        height={512}
        draggable={!baseIconConfig.locked}
        image={image}
        onMouseDown={(e) =>
          !baseIconConfig.locked
            ? ref.current.nodes([e.currentTarget])
            : toast.warning("Base icon layer is locked", {
                description: "Unlock the base Icon layer to move around.",
              })
        }
      />
    );
  }
);

BaseIconRender.displayName = "BaseIconRender";

export default BaseIconRender;
