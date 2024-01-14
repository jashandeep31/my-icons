import React from "react";
import { getCurrentUser } from "@/lib/session";
import NavbarMenu from "./navbarMenu";

const Navbar = async () => {
  const session = await getCurrentUser();
  return (
    <>
      <NavbarMenu session={session as any} />
    </>
  );
};

export default Navbar;
