"use client";
import { cn } from "@/lib/utils";
import { Copy, Download, X } from "lucide-react";
import React from "react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

const IconViewModal = () => {
  return (
    <div className=" h-screen w-full  bg-[#000000B3] fixed    top-0 left-0 flex items-center justify-center z-10 p-4 overflow-y-auto ">
      <div className="rounded-md bg-white md:w-3/4 w-full ">
        <div className="flex border-b justify-between items-center p-4">
          <h3 className="">Get Your Icon </h3>
          <button
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-foreground/60 "
            )}
          >
            <X width={15} height={15} />
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-6 px-4  py-8 items-center">
          <div className="flex flex-col items-center">
            <div className="h-64 w-64 bg-muted rounded-md"></div>
            <div className="bg-muted p-1 rounded-md mt-4 grid grid-cols-2 w-64 shadow-inner">
              <button className="bg-white rounded-md w-full text-sm p-2 text-foreground/60  shadow">
                PNG
              </button>
              <button className=" rounded w-full text-sm p-2 text-foreground/60">
                PNG
              </button>
            </div>
          </div>
          <div className="h-full flex flex-col py-12 justify-between">
            <div>
              <h1 className="text-xl font-bold">Adobe premirere pro</h1>
              <p className="text-sm text-foreground underline">Mac OS</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 ">
              <button
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "flex gap-2 items-center  w-full"
                )}
              >
                PNG <Download width={15} height={15} />
              </button>
              <button
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "flex gap-2 items-center  w-full"
                )}
              >
                ICO <Download width={15} height={15} />
              </button>
            </div>
            <div>
              <div className="border p-2 text-xs rounded-md flex justify-between bg-muted/60 items-center">
                <p className="text-foreground/60 font-medium">
                  cmd for windows
                </p>
                <button className="hover:bg-white rounded p-1 hover:text-black duration-300">
                  <Copy width={12} height={12} />
                </button>
              </div>
              <Link
                href="/"
                className="text-xs font-medium text-foreground/60 underline"
              >
                Learn how to use?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconViewModal;
