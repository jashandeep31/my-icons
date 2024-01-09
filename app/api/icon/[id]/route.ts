import catchAsync, { AppError } from "@/lib/catchAsync";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { deleteFromS3 } from "@/lib/uploadToS3";
import { NextResponse } from "next/server";
import * as z from "zod";

const formValidationSchema = z.object({
  name: z.string().min(3, "Minimum 3 char").trim(),
  id: z.string().min(1, "Id is requred"),
  public: z.boolean(),
  platform: z.enum(["MACOS", "WINDOWS", "OTHER"]),
});

export const PATCH = catchAsync(async (req: Request) => {
  const session = await getCurrentUser();
  if (!session) {
    throw new AppError("Login is required", 401);
  }
  const formData = await req.formData();
  const validatedForm = formValidationSchema.safeParse({
    name: formData.get("name"),
    platform: formData.get("platform"),
    public: Boolean(formData.get("public")),
    id: formData.get("id"),
  });
  if (!validatedForm.success) {
    throw new AppError("Data is not proper", 500);
  }
  const validatedFormData = validatedForm.data;

  // validate the
  const icon = await db.icon
    .update({
      where: {
        userId: session.id,
        id: validatedFormData.id,
      },
      data: {
        name: validatedFormData.name,
        public: validatedFormData.public,
        platform: validatedFormData.platform,
      },
    })
    .catch((e) => {
      throw new AppError("Icon not found ", 404);
    });

  return NextResponse.json(
    { message: "Icon is updated", icon },
    { status: 201 }
  );
});

export const DELETE = catchAsync(
  async (req: Request, { params }: { params: { id: string } }) => {
    const session = await getCurrentUser();
    if (!session) {
      throw new AppError("Login is required", 401);
    }
    const { id } = params;

    const icon = await db.icon
      .delete({
        where: {
          id: id,
          userId: session.id,
        },
      })
      .catch((e) => {
        throw new AppError("Icon not  found ", 404);
      });
    try {
      // nothing is handling so, no await
      deleteFromS3(icon.pngURL);
      deleteFromS3(icon.icoURL);
    } catch (e) {}

    return NextResponse.json({ message: "Icon is deleted" }, { status: 201 });
  }
);
