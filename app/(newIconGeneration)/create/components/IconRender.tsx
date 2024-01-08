"use client";
import React, { forwardRef, useEffect, useState } from "react";
import { Image, Line } from "react-konva";
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
    const [size, setsize] = useState({
      width: 0,
      height: 0,
    });
    const [sizeModified, setsizeModified] = useState(false);
    const [showVLine, setshowVLine] = useState(false);
    useEffect(() => {
      if (!icon.size?.width && !icon.size?.height && image) {
        if (image.height > 300 || image.width > 300) {
          const ratio = image.width / image.height;
          setsize({
            width: 300,
            height: 300 / ratio,
          });
          if (!sizeModified) {
            setsizeModified(true);
          }
        }
      } else if (icon.size?.width && icon.size?.height) {
        setsize({
          width: icon.size?.width,
          height: icon.size?.height,
        });
        if (!sizeModified) {
          setsizeModified(true);
        }
      }
      return () => {};
    }, [image?.width, image?.height, icon.size?.width, icon.size?.height]);

    if (icon.visible === false) {
      return <Image width={0} height={0} alt="" image={image} />;
    }

    return (
      <>
        {showVLine ? (
          <Line
            points={[0, -512, 0, 512]}
            name="guid-line"
            stroke="rgb(0, 161, 255)"
            strokeWidth={1}
            x={512 / 2}
            y={0}
            strokeScaleEnabled={false}
            dash={[4, 6]}
          />
        ) : null}

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
          width={sizeModified ? size.width : image?.width}
          height={sizeModified ? size.height : image?.height}
          onDragEnd={(e) => {
            setshowVLine(false);
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
          onDragMove={(e) => {
            if (
              e.target.x() + (e.target.width() * e.target.scaleX()) / 2 < 261 &&
              e.target.x() + (e.target.width() * e.target.scaleX()) / 2 > 250
            ) {
              if (!showVLine) setshowVLine(true);
              e.target.setAbsolutePosition({
                x: 256 - (e.target.width() * e.target.scaleX()) / 2,
                y: ref.current.absolutePosition().y,
              });
            }
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
      </>
    );
  }
);

IconRender.displayName = "IconRender";
export default IconRender;
