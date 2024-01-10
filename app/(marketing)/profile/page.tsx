import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";
const page = async () => {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Profile</h1>
      <div className="border rounded-md p-4 mt-6 flex flex-col gap-4">
        <div>
          <h6 className="text-base font-medium">Name</h6>
          <p className="text-sm text-foreground/60">{session.name}</p>
        </div>
        <div>
          <h6 className="text-base font-medium">Email</h6>
          <p className="text-sm text-foreground/60">{session.email}</p>
        </div>
        <div>
          <h6 className="text-base font-medium">Profile Picture</h6>
          {session.image ? (
            <Image
              className="border rounded-full mt-2"
              src={session.image}
              alt=""
              width={30}
              height={30}
            />
          ) : (
            "Profile Picture not found"
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
