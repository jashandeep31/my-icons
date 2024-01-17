import catchAsync, { AppError } from "@/lib/catchAsync"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must have 2 char",
  }),
  email: z.string().email("Email must be valid"),
  message: z.string().min(20, "Minimum 20 char is required"),
})
export const POST = catchAsync(async (req: Request) => {
  const data = await req.json()
  const validatedForm = formSchema.safeParse({
    name: data.name,
    email: data.email,
    message: data.message,
  })

  if (!validatedForm.success) {
    throw new AppError("All fields are required", 400)
  }
  const validatedFormData = validatedForm.data

  const bug = await db.bugReport.create({
    data: validatedFormData,
  })

  return NextResponse.json(
    { message: "Report has generated", bug },
    { status: 201 }
  )
})

export const GET = catchAsync(async (req: Request) => {
  const bugs = await db.bugReport.findMany({})
  return NextResponse.json({ bugs }, { status: 200 })
})
