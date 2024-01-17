import catchAsync, { AppError } from "@/lib/catchAsync"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { uploadToS3 } from "@/lib/uploadToS3"
import { NextResponse } from "next/server"
import slugify from "slugify"
import * as z from "zod"

const FormDataSchema = z.object({
  name: z.string().min(3, "Name is required atleast 3 char"),
  platform: z.enum(["MACOS", "WINDOWS", "OTHER"]),
  public: z.boolean(),
  icoURL: z.string(),
  pngURL: z.string(),
})
export const dynamic = "force-dynamic"

export const GET = catchAsync(async (req: Request) => {
  const { searchParams } = new URL(req.url)
  let page = searchParams.get("page") ? searchParams.get("page") : 1
  page = !isNaN(Number(page)) ? Number(page) : 1
  let q = searchParams.get("q") ? searchParams.get("q")?.trim() : ""

  let platform = searchParams.get("platform")
    ? searchParams.get("platform")?.toUpperCase().trim()
    : "all"
  const where: {
    public: true
    platform?: "MACOS" | "OTHER" | "WINDOWS"
    name: any
  } = {
    public: true,
    name: {
      contains: q,
      mode: "insensitive",
    },
  }
  if (platform === "MACOS" || platform === "OTHER" || platform === "WINDOWS") {
    where["platform"] = platform
  }

  const icons = await db.icon.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },

    skip: (page - 1) * 24,
    take: 24,
  })

  return NextResponse.json({ icons }, { status: 200 })
})
