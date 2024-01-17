import catchAsync, { AppError } from "@/lib/catchAsync"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export const GET = catchAsync(async (req: Request) => {
  const { searchParams } = new URL(req.url)
  let page = searchParams.get("page") ? searchParams.get("page") : 1
  page = !isNaN(Number(page)) ? Number(page) : 1

  let platform = searchParams.get("platform")
    ? searchParams.get("platform")?.toUpperCase().trim()
    : "all"

  const session = await getCurrentUser()
  if (!session) {
    throw new AppError("login is required", 401)
  }
  const where: {
    userId: string
    platform?: "MACOS" | "OTHER" | "WINDOWS"
  } = {
    userId: session.id,
  }
  if (platform === "MACOS" || platform === "OTHER" || platform === "WINDOWS") {
    where["platform"] = platform
  }
  const icons = await db.icon.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * 12,
    take: 12,
  })

  return NextResponse.json({ icons }, { status: 200 })
})
