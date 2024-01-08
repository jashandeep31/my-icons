import AuthComponentLoginSignup from "@/components/authComponentLoginSignup";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/60">
      <div className="w-full mx-4   md:w-1/3 flex flex-col gap-4">
        <div className="bg-muted p-1 gap-2 rounded-md mt-4 grid grid-cols-2 w-full  border">
          <Link
            href={"/login"}
            className="bg-white text-center rounded-md w-full text-sm p-2 text-foreground/60  shadow"
          >
            Login
          </Link>
          <Link
            href={"/signup"}
            className="text-center rounded w-full text-sm p-2 text-foreground/60 hover:bg-white/60"
          >
            Signup
          </Link>
        </div>
        <div className="border rounded-lg  bg-white p-4">
          <h1 className="text-lg font-medium">Welcome Back 🎉</h1>
          <p className="text-sm text-foreground/60">
            Continue with your account.
          </p>
          <AuthComponentLoginSignup />
        </div>
      </div>
    </div>
  );
};

export default page;
