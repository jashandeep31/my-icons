import React from "react";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import MyIconsRenderer from "./components/myIconsRenderer";

const page = async () => {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">My Icons</h1>
      <div className="border rounded-md p-4 mt-6 flex flex-col gap-4">
        <MyIconsRenderer />
      </div>
    </div>
  );
};

export default page;
