import UploadBaseIcon from "@/components/uploadBaseIcon";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getCurrentUser();
  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className=" flex items-center justify-center h-full">
      <UploadBaseIcon />
    </div>
  );
};

export default page;
