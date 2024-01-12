"use client";
import { toast } from "@/components/ui/use-toast";
import { Check, Copy } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const CopyComponent = ({ url }: { url: string }) => {
  const [messageCopied, setMessageCopied] = useState(false);

  const copyCommand = () => {
    try {
      navigator.clipboard.writeText(`
attrib -h -s "%cd%\\desktop.ini"
del /q /f "%cd%\\desktop.ini"
attrib -h "%cd%\\icon.ico"
del /q /f "%cd%\\icon.ico"
echo [.ShellClassInfo] > desktop.ini
curl -o icon.ico ${url}
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

  return (
    <div>
      <div className="border p-2 text-xs rounded-md flex justify-between bg-muted/60 items-center">
        <p className="text-foreground/60 font-medium">cmd for windows</p>
        <button
          onClick={copyCommand}
          className="hover:bg-primary rounded p-1 hover:text-black duration-300"
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
  );
};

export default CopyComponent;
