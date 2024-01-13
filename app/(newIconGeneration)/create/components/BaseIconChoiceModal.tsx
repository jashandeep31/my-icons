import { buttonVariants } from "@/components/ui/button";
import { baseUrl } from "@/lib/axiosConfig";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useClickAway } from "@uidotdev/usehooks";
import axios from "axios";
import { X } from "lucide-react";
import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { updateBaseIconUrl } from "@/store/features/playground/baseIconSlice";

const BaseIconChoiceModal = ({
  setBaseIconModalState,
}: {
  setBaseIconModalState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const ref = useClickAway<HTMLDivElement>(() => {
    setBaseIconModalState(false);
  });

  const dispatch = useDispatch();
  // code to fetch the icons from the api
  const getBaseIcons = async () => {
    try {
      const res = await axios.get(`${baseUrl}/baseicons`);
      return res.data.data.baseIcons ? res.data.data.baseIcons : [];
    } catch (e) {
      return null;
    }
  };
  const baseIconsQuery = useQuery({
    queryKey: ["baseIconsAll"],
    queryFn: async () => await getBaseIcons(),
  });
  return (
    <div className=" h-screen w-full  bg-[#000000df] fixed top-0 left-0 flex items-center justify-center z-10">
      <div
        className="border flex flex-col bg-background rounded-md shadow w-3/4 h-3/4 p-4"
        ref={ref}
      >
        <div className="flex justify-between items-center">
          {/* TODO: pending to add this function */}
          <div className="hidden">
            <button
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                }),
                "text-sm font-light"
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
                "text-sm text-foreground/60 font-light"
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
                "text-sm text-foreground/60 font-light"
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
        <div className="mt-3 flex-1  ">
          <div className="grid lg:grid-cols-8 md:grid-cols-6 grid-cols-2 gap-6  ">
            {baseIconsQuery.isFetched && baseIconsQuery.data
              ? baseIconsQuery.data.map((icon: any, index: number) => (
                  <div
                    className=" rounded bg-muted hover:bg-muted-foreground/15 duration-300 flex items-center justify-center p-4"
                    onClick={() => {
                      // TODO: update the OS along with the icon so that it could  be easy at the end of submiting the
                      dispatch(updateBaseIconUrl(icon.iconUrl) as any);
                      setBaseIconModalState(false);
                    }}
                    key={index}
                  >
                    <Image
                      src={icon.iconUrl}
                      width={250}
                      height={250}
                      alt="Folder icon"
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseIconChoiceModal;
