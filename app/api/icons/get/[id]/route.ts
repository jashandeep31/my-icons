import catchAsync, { AppError } from "@/lib/catchAsync"
import { db } from "@/lib/db"
import { NextApiRequest } from "next"
import { NextResponse } from "next/server"

export const GET = catchAsync(async (request: Request, { params }: any) => {
  const icon = await db.icon.findUnique({
    where: {
      id: params.id,
    },
  })
  if (!icon) {
    throw new AppError("Icon not found ", 404)
  }
  return NextResponse.json(
    { message: "Icon is here", data: { icon } },
    { status: 200 }
  )
})
