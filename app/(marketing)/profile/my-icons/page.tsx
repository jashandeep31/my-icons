import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";
import { db } from "@/lib/db";
import MyIconsRenderer from "./components/myIconsRenderer";

const page = async () => {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/login");
  }

  const icons = await db.icon.findMany({
    where: {
      userId: session.id,
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold">My Icons</h1>
      <div className="border rounded-md p-4 mt-6 flex flex-col gap-4">
        {/* TODO: not optimized for multiple icons loading */}
        {/* {icons.map((icon, index) => (
            <div key={index} className="bg-muted rounded-md p-4">
              <Image
                src={icon.pngURL}
                className="w-full"
                alt={icon.name}
                width={250}
                height={250}
              />
              <p className="text-xs bg-white px-2 py-1 rounded-full inline-block">
                {icon.name}
              </p>
            </div>
          ))} */}
        <MyIconsRenderer />
      </div>
    </div>
  );
};

export default page;
