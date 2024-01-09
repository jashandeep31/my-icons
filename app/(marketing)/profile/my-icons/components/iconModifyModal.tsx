import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React from "react";

const IconModifyModal = () => {
  return (
    <div className=" h-screen w-full  bg-[#000000B3] fixed top-0 left-0 flex items-center justify-center z-10">
      <div className="md:w-1/4 rounded-md bg-white ">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            Edit Icon
          </h3>
          <button
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-foreground/60 "
            )}
          >
            <X width={15} height={15} />
          </button>
        </div>
        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-2">
            Deleting Icon can&apos;t be undone.
          </p>
          <button className={cn(buttonVariants({ variant: "destructive" }))}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default IconModifyModal;
