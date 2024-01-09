"use client";
import { baseUrl } from "@/lib/axiosConfig";
import { updateIconModalWhole } from "@/store/features/playground/iconModalSlice";
import { iconTypes } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

const PopularIcons = () => {
  const dispatch = useDispatch();
  const getPopularIcons = async () => {
    try {
      const res = await axios.get(`${baseUrl}/icons/popular`);
      return res.data.icons;
    } catch (e) {
      return null;
    }
  };

  const popularIconsQuery = useQuery({
    queryKey: ["popularIcons"],
    queryFn: async () => await getPopularIcons(),
  });

  return (
    <div>
      <div className="mt-6 grid grid-cols-2  md:grid-cols-4 lg:grid-cols-6 gap-6 mb-6">
        {popularIconsQuery.isFetched && popularIconsQuery.data
          ? popularIconsQuery.data.map((icon: iconTypes, index: number) => (
              <div
                key={index}
                className="bg-muted w-full rounded-md p-4 cursor-pointer"
                onClick={() =>
                  dispatch(updateIconModalWhole({ id: icon.id, active: true }))
                }
              >
                <Image src={icon.pngURL} width={250} height={250} alt="" />
                <p className="text-xs text-foreground/60 bg-white rounded-full px-2  py-1 inline-block ">
                  {icon.name}
                </p>
              </div>
            ))
          : null}
        {!popularIconsQuery.isFetched ? (
          <>
            <div className="bg-muted w-full rounded-md minh-48"></div>
            <div className="bg-muted w-full rounded-md minh-48"></div>
            <div className="bg-muted w-full rounded-md minh-48"></div>
            <div className="bg-muted w-full rounded-md minh-48"></div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default PopularIcons;
