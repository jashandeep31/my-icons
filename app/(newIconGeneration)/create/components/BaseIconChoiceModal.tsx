import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useClickAway } from "@uidotdev/usehooks";
import { X } from "lucide-react";
import React from "react";

const BaseIconChoiceModal = ({
  setBaseIconModalState,
}: {
  setBaseIconModalState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const ref = useClickAway<HTMLDivElement>(() => {
    setBaseIconModalState(false);
  });
  return (
    <div className=" h-screen w-full  bg-[#000000B3] fixed top-0 left-0 flex items-center justify-center z-10">
      <div
        className="border flex flex-col bg-white rounded-md shadow w-3/4 h-3/4 p-4"
        ref={ref}
      >
        <div className="flex justify-between items-center">
          <div className="flex ">
            <button
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                }),
                "text-sm font-light",
              )}
            >
              All
            </button>
            <button
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                }),
                "text-sm text-foreground/60 font-light",
              )}
            >
              Windows
            </button>

            <button
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                }),
                "text-sm text-foreground/60 font-light",
              )}
            >
              Mac OS
            </button>
          </div>
          <div>
            <button
              onClick={() => setBaseIconModalState(false)}
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              <X width={15} height={15} />
            </button>
          </div>
        </div>
        {/* TODO: make this scroll y */}
        <div className="grid grid-cols-8 gap-6 mt-3 flex-1  ">
          <div className="card h-24 bg-muted rounded"></div>
          <div className="card h-24 bg-muted rounded"></div>
          <div className="card h-24 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default BaseIconChoiceModal;
