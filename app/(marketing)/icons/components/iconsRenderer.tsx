"use client";
import IconCard from "@/components/iconCard";
import { baseUrl } from "@/lib/axiosConfig";
import { iconTypes } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const IconsRenderer = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  const fetchIcons = async (pageParams: any) => {
    try {
      console.log("🚀 ~ fetchIcons ~ pageParams:", pageParams);
      const res = await axios.get(`${baseUrl}/icons?page=${pageParams}`);
      return res.data.icons;
    } catch (e) {}
  };

  // TODO: read the bookmark from the x.com
  const { data, isFetched, isFetching, hasNextPage, isError, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["allIconsQuery"],
      queryFn: async ({ pageParam }) => {
        return await fetchIcons(pageParam);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage: any, pages) => {
        return lastPage.length >= 24 ? pages.length + 1 : undefined;
      },
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    return () => {};
  }, [inView]);

  return (
    <div>
      <h1 className="text-lg font-bold">Icons</h1>
      <div className="mt-6">
        <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-1 gap-6">
          {data
            ? data.pages.map((page: iconTypes[], index: number) => (
                <React.Fragment key={index}>
                  {page.map((icon, index) => {
                    if (page.length === index + 1) {
                      return (
                        <div key={icon.id} ref={ref}>
                          <IconCard icon={icon} />
                        </div>
                      );
                    } else {
                      return (
                        <div key={icon.id}>
                          <IconCard icon={icon} />
                        </div>
                      );
                    }
                  })}
                </React.Fragment>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default IconsRenderer;