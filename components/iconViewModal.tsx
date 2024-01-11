"use client";
import { cn } from "@/lib/utils";
import { Check, Copy, Download, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIconModalConfig,
  updateIconModalState,
} from "@/store/features/playground/iconModalSlice";
import axios from "axios";
import { baseUrl } from "@/lib/axiosConfig";
import { iconTypes } from "@/types";
import { useClickAway } from "@uidotdev/usehooks";
import { toast } from "./ui/use-toast";

const IconViewModal = () => {
  const iconModalConfig = useSelector(selectIconModalConfig);
  const [iconData, setIconData] = useState<null | iconTypes>(null);
  const [loading, setLoading] = useState(true);
  const [viewOf, setViewOf] = useState<"png" | "ico">("png");
  const [messageCopied, setMessageCopied] = useState(false);
  const dispatch = useDispatch();

  const ref = useClickAway<HTMLDivElement>(() => {
    dispatch(updateIconModalState(false));
  });

  const copyCommand = () => {
    try {
      navigator.clipboard.writeText(`
attrib -h -s "%cd%\\desktop.ini"
del /q /f "%cd%\\desktop.ini"
attrib -h "%cd%\\icon.ico"
del /q /f "%cd%\\icon.ico"
echo [.ShellClassInfo] > desktop.ini
curl -o icon.ico ${iconData?.icoURL}
attrib +h "%cd%\\icon.ico"
echo IconResource="%cd%\\icon.ico",0 >> desktop.ini
attrib +h  desktop.ini
attrib +r "%cd%"
      `);

      setMessageCopied(true);
      setTimeout(() => {
        setMessageCopied(false);
      }, 2000);
    } catch (e) {
      toast({
        title: "Copy failed",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (iconModalConfig.active) {
      axios
        .get(`${baseUrl}/icons/get/${iconModalConfig.id}`)
        .then((res) => {
          if (res.status === 200) {
            setIconData(res.data.data.icon);
          }
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
      return () => {
        setLoading(true);
        setIconData(null);
      };
    }
  }, [iconModalConfig]);

  if (!iconData) {
    return (
      <div className=" h-screen w-full  bg-[#000000B3] fixed top-0 left-0 flex items-center justify-center z-10 p-4 overflow-y-auto ">
        <div
          className="rounded-md bg-white md:w-3/4 w-full h-3/4 grid md:grid-cols-2 p-12 gap-6"
          ref={ref}
        >
          <div className="w-full h-full animate-pulse rounded-md bg-slate-200 "></div>
          <div className="flex justify-between py-12 flex-col">
            <div>
              <div className="h-6 bg-slate-200 rounded"></div>
              <div className="h-2 mt-3  bg-slate-200 rounded w-1/3"></div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-200 rounded h-12 w-full"></div>
              <div className="bg-slate-200 rounded h-12 w-full"></div>
            </div>
            <div>
              <div className="h-3 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" h-screen w-full  bg-[#000000B3] fixed top-0 left-0 flex items-center justify-center z-10 p-4 overflow-y-auto ">
      <div className="rounded-md bg-white md:w-3/4 w-full " ref={ref}>
        <div className="flex border-b justify-between items-center p-4">
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            Get Your Icon{" "}
          </h3>
          <button
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-foreground/60 "
            )}
            onClick={() => {
              dispatch(updateIconModalState(false));
            }}
          >
            <X width={15} height={15} />
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-6 px-4  py-8 items-center">
          <div className="flex flex-col items-center">
            <div className="h-64 w-64 p-6 bg-muted rounded-md">
              {/* Not optimized so that drag drop should possible */}
              {viewOf === "png" ? (
                <img src={iconData.pngURL} alt="" />
              ) : (
                <img src={iconData.icoURL} alt="" />
              )}
            </div>
            <p className="text-xs "> Drag and drop your {viewOf} file.</p>
            <div className="bg-muted p-1 rounded-md gap-2 mt-4 grid grid-cols-2 w-64 ">
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
          <div className="h-full flex flex-col  py-12 justify-between">
            <div>
              <h1 className="text-xl font-bold">{iconData.name}</h1>
              <p className="text-sm text-foreground underline">
                {iconData.platform}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 ">
              <Link
                href={iconData.pngURL}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "flex gap-2 items-center  w-full"
                )}
              >
                PNG <Download width={15} height={15} />
              </Link>
              <Link
                href={iconData.icoURL}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "flex gap-2 items-center  w-full"
                )}
              >
                ICO <Download width={15} height={15} />
              </Link>
            </div>
            <div>
              <div className="border p-2 text-xs rounded-md flex justify-between bg-muted/60 items-center">
                <p className="text-foreground/60 font-medium">
                  cmd for windows
                </p>
                <button
                  onClick={copyCommand}
                  className="hover:bg-white rounded p-1 hover:text-black duration-300"
                >
                  {!messageCopied ? (
                    <Copy width={12} height={12} />
                  ) : (
                    <Check width={12} height={12} />
                  )}
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
