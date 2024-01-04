"use client";
import { toast } from "@/components/ui/use-toast";
import { selectBaseIconConfig } from "@/store/features/playground/baseIconSlice";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Image } from "react-konva";
import { useSelector } from "react-redux";
import useImage from "use-image";
const BaseIconRender = forwardRef(
  ({ baseImage }: { baseImage: string }, ref: any) => {
    // react redux configs
    const baseIconConfig = useSelector(selectBaseIconConfig);
    const [image] = useImage(baseImage);

    // TODO: add a message of locked on click
    // TODO: udpate position on drag and mouseclick
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
            : toast({
                title: "Base Icon is locked",
                description: "Unlock the base icon to move it around",
              })
        }
      />
    );
  }
);

BaseIconRender.displayName = "BaseIconRender";

export default BaseIconRender;
