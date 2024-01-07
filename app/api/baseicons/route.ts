import catchAsync from "@/lib/catchAsync";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = catchAsync(async (req: Request) => {
  // TODO: only for approved and add flters like windows macos
  const baseIcons = await db.baseIcon.findMany();
  return NextResponse.json(
    {
      message: "Successful",
      data: {
        baseIcons,
      },
    },
    { status: 200 }
  );
});
