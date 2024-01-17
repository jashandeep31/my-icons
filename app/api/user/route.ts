import catchAsync, { AppError } from "@/lib/catchAsync"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { NextResponse } from "next/server"
import * as z from "zod"
const nameValidationSchema = z.object({
  name: z.string().min(3, "minium 3 char"),
})

export const PATCH = catchAsync(async (req: Request) => {
  const session = await getCurrentUser()
  if (!session) {
    throw new AppError("Login is required", 401)
  }

  const { name } = await req.json()
  const validatedForm = nameValidationSchema.safeParse({
    name: name,
  })
  if (!validatedForm.success) {
    throw new AppError("Name is required", 401)
  }

  const validatedFormData = validatedForm.data
  const user = await db.user.update({
    where: {
      id: session.id,
    },
    data: {
      name: validatedFormData.name,
    },
  })

  return NextResponse.json({ message: "Name is updated" }, { status: 201 })
})
