import catchAsync from "@/lib/catchAsync";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = catchAsync(async (req: Request) => {
  const icons = await db.icon.findMany({
    orderBy: {
      downloads: "desc",
    },
    skip: 0,
    take: 12,
  });

  return NextResponse.json({ icons }, { status: 200 });
});
