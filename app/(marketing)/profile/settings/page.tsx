import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import React from "react"
import UpdateName from "./components/updateName"
const page = async () => {
  const session = await getCurrentUser()
  if (!session) {
    redirect("/login")
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="mt-6 flex flex-col gap-4 rounded-md border p-4">
        <UpdateName session={session as any} />
      </div>
    </div>
  )
}

export default page
