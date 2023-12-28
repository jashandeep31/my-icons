"use client";
import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image, Transformer } from "react-konva";
import useImage from "use-image";
import IconRender from "./IconRender";
import { useClickAway } from "@uidotdev/usehooks";
import BaseIconRender from "./baseIconRender";

type layer = {
    id: number;
    base64: string;
    visible: boolean;
};

// extending the layer
export type iconFull = {
    position?: {
        x: number;
        y: number;
    };
    size?: {
        width?: number;
        height?: number;
    };
} & layer;

const PlayGround = ({ layersArray }: { layersArray: layer[] }) => {
    const [iconsArray, setIconsArray] = useState<iconFull[]>([]);

    // updating the position of the icon in the iconsArray
    const updateIcon = (icon: iconFull) => {
        setIconsArray((prevIconsArray) =>
            prevIconsArray.map((iconTemp) =>
                iconTemp.id === icon.id ? { ...iconTemp, ...icon } : iconTemp
            )
        );
    };

    useEffect(() => {
        setIconsArray((prevIconsArray) => {
            const existingIds = new Set(prevIconsArray.map((item) => item.id));
            const newIconsArray = layersArray
                .filter((layer) => !existingIds.has(layer.id))
                .map((layer) => ({ ...layer }));

            const updatedPrevIconsArray = prevIconsArray.map((icon) => ({
                ...icon,
                visible: layersArray.some(
                    (layer) => layer.id === icon.id && layer.visible
                ),
            }));

            return [...updatedPrevIconsArray, ...newIconsArray];
        });
    }, [layersArray]);

    const stageRef = useRef();
    const transformerRef = useRef<any>(null);
    const [stageWidthHeight, setstageWidthHeight] = useState({
        width: 512,
        height: 512,
    });
    const [baseImage, setbaseImage] = useState("/mac.png");
    const outerRef = useClickAway<HTMLDivElement>(() => {
        transformerRef.current.nodes([]);
    });
    const IconsRender = () =>
        iconsArray.map((icon, index) => (
            <IconRender
                icon={icon}
                stageWidthHeight={stageWidthHeight}
                key={index}
                ref={transformerRef}
                updateIcon={updateIcon}
            />
        ));

    return (
        <div className="bg-transparent" ref={outerRef} id="PlayGroundParent">
            <Stage
                width={stageWidthHeight.width}
                height={stageWidthHeight.height}
                className="overflow-hidden"
            >
                <Layer>
                    {React.useMemo(
                        () => (
                            <BaseIconRender
                                baseImage={baseImage}
                                ref={transformerRef}
                            />
                        ),
                        [baseImage]
                    )}
                    <IconsRender />
                    <Transformer ref={transformerRef} />
                </Layer>
            </Stage>
        </div>
    );
};

export default PlayGround;
