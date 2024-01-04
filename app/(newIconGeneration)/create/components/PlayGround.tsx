"use client";
import React, { useRef, useState } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import IconRender from "./IconRender";
import { useClickAway } from "@uidotdev/usehooks";
import BaseIconRender from "./baseIconRender";
import { selectBaseIconConfig } from "@/store/features/playground/baseIconSlice";
import { useSelector } from "react-redux";
import { selectIconsArrayConfig } from "@/store/features/playground/iconsArraySlice";

const PlayGround = () => {
  const baseIconConfig = useSelector(selectBaseIconConfig);
  const iconsArrayConfig = useSelector(selectIconsArrayConfig);
  const stageRef = useRef();
  const outerRef = useClickAway<HTMLDivElement>(() => {
    transformerRef.current.nodes([]);
  });
  const transformerRef = useRef<any>(null);
  const [stageWidthHeight, setstageWidthHeight] = useState({
    width: 512,
    height: 512,
  });

  const IconsRender = () =>
    iconsArrayConfig.map((icon, index) => (
      <IconRender
        icon={icon}
        stageWidthHeight={stageWidthHeight}
        key={index}
        ref={transformerRef}
      />
    ));

  return (
    <div className="bg-transparent" ref={outerRef} id="PlayGroundParent">
      <Stage
        width={stageWidthHeight.width}
        height={stageWidthHeight.height}
        className="overflow-hidden"
      >
        {/* TODO: Add the guide lines for the icons */}
        <Layer>
          {React.useMemo(
            () => (
              <BaseIconRender
                baseImage={baseIconConfig.url}
                ref={transformerRef}
              />
            ),
            [baseIconConfig.url]
          )}
          <IconsRender />
          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
    </div>
  );
};

export default PlayGround;
