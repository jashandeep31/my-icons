"use client";
import { baseUrl } from "@/lib/axiosConfig";
import { iconTypes } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateIconModalWhole } from "@/store/features/playground/iconModalSlice";
import IconModifyModal from "./iconModifyModal";

const MyIconsRenderer = () => {
  const dispatch = useDispatch();
  const [iconEditModal, setIconEditModal] = useState(false);
  const [iconEditModalId, setIconEditModalId] = useState<string>("");
  const [iconDetail, setIconDetail] = useState<iconTypes | null>();
  const fetchIcons = async ({ pageParam }: { pageParam: any }) => {
    try {
      const res = await axios.get(`${baseUrl}/user/icons?page=${pageParam}`);
      return res.data.icons;
    } catch (e) {
      return null;
    }
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: fetchIcons,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length >= 12 ? pages.length + 1 : undefined;
    },
  });
  return (
    <div>
      {iconEditModal ? (
        <IconModifyModal
          id={iconEditModalId}
          setIconEditModal={setIconEditModal}
          refetch={refetch}
          icon={iconDetail as any}
        />
      ) : null}
      <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4">
        {data
          ? data.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.map((icon: iconTypes) => (
                  <div key={icon.id} className="bg-muted rounded-md p-4">
                    <Image
                      src={icon.pngURL}
                      className="w-full cursor-pointer"
                      alt={icon.name}
                      width={250}
                      height={250}
                      onClick={() =>
                        dispatch(
                          updateIconModalWhole({ id: icon.id, active: true })
                        )
                      }
                    />
                    <div className="flex flex-wrap justify-between items-center">
                      <div>
                        <p className="text-xs bg-white px-2 py-1 rounded-full inline-block">
                          {icon.name}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setIconEditModal(true);
                          setIconEditModalId(icon.id);
                          setIconDetail(icon);
                        }}
                        className="p-1 hover:bg-white duration-300 rounded"
                      >
                        <Pencil width={15} height={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))
          : null}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={() => fetchNextPage()}
        >
          {/* Load more */}
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
        </button>
      </div>
    </div>
  );
};

export default MyIconsRenderer;
