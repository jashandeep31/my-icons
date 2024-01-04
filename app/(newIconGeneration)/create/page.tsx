"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Download,
  Eye,
  EyeOff,
  FileEdit,
  Move,
  Trash,
  Unlock,
} from "lucide-react";
import React, { useState } from "react";
import PlayGround from "./components/PlayGround";
import html2canvas from "html2canvas";
import { useDropzone } from "react-dropzone";
import BaseIconChoiceModal from "./components/BaseIconChoiceModal";
import Link from "next/link";

// TODO: we can implement the resizable from the shadcn ui here for the left bar and right playground

type layer = {
  id: number;
  base64: string;
  visible: boolean;
};

const CreateIcon = () => {
  const [baseIconModalState, setBaseIconModalState] = useState(false);
  // const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [layersArray, setlayersArray] = useState<layer[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const base64Promises = acceptedFiles.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e?.target?.result); // Optional chaining here
            reader.readAsDataURL(file);
          })
      );
      const base64Results = await Promise.all(base64Promises);
      setlayersArray((prev) => [
        ...prev,
        {
          id: prev.length,
          base64: base64Results[0] as string,
          visible: true,
        },
      ]);
    },
  });

  const toggleVisibilty = (id: number) => {
    setlayersArray((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  };

  const downloadImage = (dataURL: string) => {
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "image.png";
    link.click();
  };

  const handleCaptureClick = async () => {
    const container = document.querySelector("#PlayGroundParent");

    if (container instanceof HTMLElement) {
      const canvas = await html2canvas(container, {
        backgroundColor: "transparent", // Set background color to transparent
      });
      const dataURL = canvas.toDataURL("image/png");
      downloadImage(dataURL);
    } else {
      console.error(
        "Element with id 'PlayGroundParent' not found or not an HTMLElement."
      );
    }
  };

  return (
    <>
      {baseIconModalState && (
        <BaseIconChoiceModal setBaseIconModalState={setBaseIconModalState} />
      )}
      <div className="h-screen flex-col flex">
        <header className="py-3 border-b px-3">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "inline-flex gap-2 text-foreground/60  "
            )}
          >
            <ArrowLeft size={15} /> Back
          </Link>
        </header>
        <div className="flex-1 grid grid-cols-5">
          <div className="border-r p-3 flex flex-col  h-full">
            <div className="flex-1 mt-3">
              <p className="font-bold">Layers</p>
              <ul className="text-xs mt-2">
                <li className=" text-foreground/60 py-2 border-t border-b flex justify-between">
                  Base Icon
                  <span className="flex flex-wrap gap-2">
                    <button
                      className=""
                      onClick={() => setBaseIconModalState(true)}
                    >
                      <FileEdit width={10} height={10} />
                    </button>
                    <button className="">
                      <Eye width={10} height={10} />
                    </button>
                    <button
                      className=""
                      onClick={() => setBaseIconModalState(true)}
                    >
                      <Unlock width={10} height={10} />
                    </button>
                  </span>
                </li>
                {layersArray.map((item, index) => (
                  <li
                    key={index}
                    className="flex w-full justify-between text-foreground/60 border-b py-2"
                  >
                    <span className="flex gap-1 items-center ">
                      <Move width={10} height={10} />
                      Layer {item.id}
                    </span>
                    <span className="flex gap-2">
                      <button>
                        <Trash width={10} height={10} />
                      </button>
                      <button onClick={() => toggleVisibilty(item.id)}>
                        {item.visible === true ? (
                          <Eye width={10} height={10} />
                        ) : (
                          <EyeOff width={10} height={10} />
                        )}
                      </button>
                      <button>
                        <Unlock width={10} height={10} />
                      </button>
                    </span>
                  </li>
                ))}
              </ul>

              {/* TODO: Paste feature is to be added here */}
              <div
                {...getRootProps({
                  className:
                    "dropzone bg-muted rounded-md mt-3 h-24 flex items-center justify-center p-3 text-center border-2 border-dashed ",
                })}
              >
                <input {...getInputProps()} />
                <p className="text-sm text-foreground/60 ">
                  Drag and drop here, or paste files, or click to select files
                </p>
              </div>
            </div>
            <Button onClick={handleCaptureClick} className="flex gap-2">
              Export <Download width={15} height={15} />
            </Button>
          </div>
          <div className="bg-muted col-span-4 flex items-center justify-center">
            <div>
              <div className="bg-white">
                <PlayGround layersArray={layersArray} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateIcon;
