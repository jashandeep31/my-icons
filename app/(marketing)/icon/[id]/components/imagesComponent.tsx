"use client";
import React, { useState } from "react";

const ImagesComponent = ({
  pngURL,
  icoURL,
}: {
  pngURL: string;
  icoURL: string;
}) => {
  const [viewOf, setViewOf] = useState<"png" | "ico">("png");

  return (
    <div className="flex flex-col items-center">
      <div className="md:w-2/4 p-6 bg-muted rounded-md w-full">
        {/* Not optimized so that drag drop should possible */}
        {viewOf === "png" ? (
          <img src={pngURL} className="w-full" alt="" />
        ) : (
          <img src={icoURL} className="w-full" alt="" />
        )}
      </div>
      <p className="text-xs "> Drag and drop {viewOf} file.</p>
      <div className="bg-muted p-1 rounded-md gap-2 mt-4 grid grid-cols-2 md:w-2/4 w-full ">
        <button
          onClick={() => setViewOf("png")}
          className={`${
            viewOf === "png" ? "bg-white shadow" : ""
          } rounded w-full text-sm p-2 text-foreground/60 `}
        >
          PNG
        </button>
        <button
          onClick={() => setViewOf("ico")}
          className={`${
            viewOf === "ico" ? "bg-white shadow" : ""
          } rounded w-full text-sm p-2 text-foreground/60 `}
        >
          ICO
        </button>
      </div>
    </div>
  );
};

export default ImagesComponent;
