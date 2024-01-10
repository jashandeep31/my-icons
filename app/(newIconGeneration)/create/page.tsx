import React from "react";
import CreateIcon from "./page.client";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getCurrentUser();
  if (!session) [redirect("/login")];
  return <CreateIcon />;
}
