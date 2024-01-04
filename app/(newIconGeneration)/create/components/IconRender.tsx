"use client";
import React, { forwardRef } from "react";
import { Image } from "react-konva";
import useImage from "use-image";
import { useDispatch } from "react-redux";
import {
  Icon,
  updateIconsArrayIconPosition,
  updateIconsArrayIconSize,
} from "@/store/features/playground/iconsArraySlice";
import { toast } from "@/components/ui/use-toast";

const IconRender = forwardRef(
  (
    {
      icon,
      stageWidthHeight,
    }: {
      icon: Icon;
      stageWidthHeight: { width: number; height: number };
    },
    ref: any
  ) => {
    const [image] = useImage(icon.base64);
    const dispatch = useDispatch();

    if (icon.visible === false) {
      return <Image width={0} height={0} alt="" image={image} />;
    }
    return (
      <Image
        alt="Image"
        draggable={!icon.locked}
        x={icon.position ? icon.position.x : 0}
        y={icon.position ? icon.position.y : 0}
        image={image}
        onMouseDown={(e) => {
          !icon.locked
            ? ref.current.nodes([e.currentTarget])
            : toast({ title: `Layer ${icon.id} is locked` });
        }}
        // TODO: fix get the better size when someone insert the new image
        width={icon.size ? icon.size.width : image?.width}
        height={icon?.size ? icon.size.height : image?.height}
        onDragEnd={(e) => {
          dispatch(
            updateIconsArrayIconPosition({
              id: icon.id,
              position: {
                x: e.target.x(),
                y: e.target.y(),
              },
            })
          );
          // TODO: Fix this hack - if we drag and change the position of the icon, we need to reset the selection if we aren't doing it and imdeiately we start changin size of icon it throughts the error
          ref.current.nodes([]);
        }}
        onTransformEnd={(e) => {
          dispatch(
            updateIconsArrayIconSize({
              id: icon.id,
              size: {
                width: e.target.width() * e.target.scaleX(),
                height: e.target.height() * e.target.scaleY(),
              },
            })
          );
          // TODO: Fix this hack - something similar to the dragEnd
          ref.current.nodes([]);
        }}
      />
    );
  }
);

IconRender.displayName = "IconRender";
export default IconRender;
