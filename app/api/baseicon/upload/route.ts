import catchAsync, { AppError } from "@/lib/catchAsync";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { uploadToS3 } from "@/lib/uploadToS3";
import { NextResponse } from "next/server";
import * as z from "zod";
import slugify from "slugify";

const FormDataSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  platform: z.enum(["MACOS", "WINDOWS", "OTHER"]),
  icon: z.custom((val: any) => {
    if (val.size > 5000000) {
      return false;
    } else return true;
  }, "Upload Image"),
});

export const POST = catchAsync(async (req: Request) => {
  const session = await getCurrentUser();
  const formData = await req.formData();

  if (!session) {
    throw new AppError("login required", 401);
  }
  const validatedForm = FormDataSchema.safeParse({
    name: formData.get("name"),
    platform: formData.get("platform"),
    icon: formData.get("icon"),
  });
  if (!validatedForm.success) {
    throw new AppError("Data is missing ", 400);
  }
  const validatedFormData = validatedForm.data;
  const icon = Buffer.from(await validatedFormData.icon.arrayBuffer());

  const url = await uploadToS3(
    "baseicons",
    slugify(validatedFormData.name, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: true, // strip special characters except replacement, defaults to `false`
      locale: "vi", // language code of the locale to use
      trim: true,
    }),
    icon
  );

  const baseicon = await db.baseIcons.create({
    data: {
      name: validatedFormData.name,
      iconUrl: url,
      approved: session.role === "ADMIN" ? true : false,
      userId: session.id,
    },
  });
  return NextResponse.json(
    { message: "Icon is added", data: { baseicon } },
    { status: 201 }
  );
});
