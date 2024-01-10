"use client";
import React from "react";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";

const AuthComponentLoginSignup = () => {
  return (
    <div className="mt-6 flex flex-col gap-4 ">
      <button
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-full flex items-center justify-center gap-2"
        )}
        onClick={() => signIn("github", { redirect: true, callbackUrl: "/" })}
      >
        <Icons.gitHub className="w-4" />
        Github
      </button>
      <button
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-full flex items-center justify-center gap-2"
        )}
        onClick={() => signIn("google", { redirect: true, callbackUrl: "/" })}
      >
        <Icons.google className="w-4" />
        Google
      </button>
    </div>
  );
};

export default AuthComponentLoginSignup;
