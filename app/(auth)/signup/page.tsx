import React from "react"
import Link from "next/link"
import AuthComponentLoginSignup from "@/components/authComponentLoginSignup"

const page = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/15">
      <div className="mx-4 flex   w-full flex-col gap-4 md:w-1/3">
        <div className="mt-4 grid w-full grid-cols-2 gap-2 rounded-md border bg-muted  p-1">
          <Link
            href={"/login"}
            className="w-full rounded p-2 text-center text-sm text-foreground/60 hover:bg-primary/15"
          >
            Login
          </Link>
          <Link
            href={"/signup"}
            className="w-full rounded-md bg-background p-2 text-center text-sm text-foreground/60  shadow"
          >
            Signup
          </Link>
        </div>
        <div className="rounded-lg border  bg-background p-4">
          <h1 className="text-lg font-medium">Welcome 🎉</h1>
          <p className="text-sm text-foreground/60">
            Choose method to continue
          </p>
          <AuthComponentLoginSignup />
        </div>
      </div>
    </div>
  )
}

export default page
