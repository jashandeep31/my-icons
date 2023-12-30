"use client";
import React, { forwardRef, useEffect, useState } from "react";
import { Image } from "react-konva";
import useImage from "use-image";
import { iconFull } from "./PlayGround";
import { icons } from "lucide-react";

const IconRender = forwardRef(
  (
    {
      icon,
      stageWidthHeight,
      updateIcon,
    }: {
      icon: iconFull;
      stageWidthHeight: { width: number; height: number };
      updateIcon: Function;
    },
    ref: any
  ) => {
    const [image] = useImage(icon.base64);
    if (icon.visible === false) {
      return <Image width={0} height={0} alt="" image={image} />;
    }
    return (
      <Image
        alt="Image"
        draggable
        x={icon.position ? icon.position.x : 0}
        y={icon.position ? icon.position.y : 0}
        image={image}
        onMouseDown={(e) => {
          ref.current.nodes([e.currentTarget]);
        }}
        // TODO: fix get the better size when someone insert the new image
        width={icon.size ? icon.size.width : image?.width}
        height={icon?.size ? icon.size.height : image?.height}
        onDragEnd={(e) => {
          updateIcon({
            ...icon,
            position: {
              x: e.target.x(),
              y: e.target.y(),
            },
          });
          // TODO: Fix this hack - if we drag and change the position of the icon, we need to reset the selection if we aren't doing it and imdeiately we start changin size of icon it throughts the error
          ref.current.nodes([]);
        }}
        onTransformEnd={(e) => {
          updateIcon({
            ...icon,
            size: {
              width: e.target.width() * e.target.scaleX(),
              height: e.target.height() * e.target.scaleY(),
            },
            postion: {
              x: e.target.x(),
              y: e.target.y(),
            },
          });
          // TODO: Fix this hack - something similar to the dragEnd
          ref.current.nodes([]);
        }}
      />
    );
  }
);

IconRender.displayName = "IconRender";
export default IconRender;

// code to center the image of the screen
// useEffect(() => {
//     try {
//         if (!icon.position) {
//             let x =
//                 (stageWidthHeight.width -
//                     (image?.width
//                         ? image?.width > stageWidthHeight.width
//                             ? 150
//                             : image?.width
//                         : 0)) /
//                 2;
//             let y =
//                 (stageWidthHeight.height -
//                     (image?.height
//                         ? image?.height > stageWidthHeight.height
//                             ? 150
//                             : image?.height
//                         : 0)) /
//                 2;

//             if (!isNaN(x) && !isNaN(y)) {
//                 seticonsPosition({
//                     x: x,
//                     y: y,
//                 });
//             }
//         } else {
//             seticonsPosition({
//                 x: icon.position.x,
//                 y: icon.position.y,
//             });
//         }
//     } catch (e) {}
//     return () => {};
// }, []);
// if (icon.visible === false) {
//     return;
// }
