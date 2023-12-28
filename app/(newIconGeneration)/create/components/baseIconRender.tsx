"use client";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Image } from "react-konva";
import useImage from "use-image";
const BaseIconRender = forwardRef(
    ({ baseImage }: { baseImage: string }, ref: any) => {
        const [image] = useImage(baseImage);
        return (
            <Image
                width={512}
                alt=""
                height={512}
                draggable
                image={image}
                onMouseDown={(e) => ref.current.nodes([e.currentTarget])}
            />
        );
    }
);

BaseIconRender.displayName = "BaseIconRender";

export default BaseIconRender;
