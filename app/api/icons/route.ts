import catchAsync, { AppError } from "@/lib/catchAsync";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { uploadToS3 } from "@/lib/uploadToS3";
import { NextResponse } from "next/server";
import { platform } from "os";
import slugify from "slugify";
import * as z from "zod";

const FormDataSchema = z.object({
  name: z.string().min(3, "Name is required atleast 3 char"),
  platform: z.enum(["MACOS", "WINDOWS", "OTHER"]),
  public: z.boolean(),
  icoURL: z.string(),
  pngURL: z.string(),
});

export const POST = catchAsync(async (req: Request) => {
  const session = await getCurrentUser();
  if (!session) {
    throw new AppError("Login is required", 401);
  }
  const formData = await req.formData();
  const validatedForm = FormDataSchema.safeParse({
    name: formData.get("name"),
    platform: formData.get("platform"),
    icoURL: formData.get("icoURL"), // always as url of image
    pngURL: formData.get("pngURL"), // always in base64
    public: Boolean(formData.get("public")),
  });

  if (!validatedForm.success) {
    console.log(validatedForm.error);
    throw new AppError("Data is not proper", 500);
  }
  const validatedFormData = validatedForm.data;

  const icoURLImage = await fetch(validatedFormData.icoURL).then((response) =>
    response.blob()
  );

  const arrayBuffer = await new Response(icoURLImage).arrayBuffer();
  const icoBuffer = Buffer.from(arrayBuffer);
  // const icon = Buffer.from(await validatedFormData.icoURL.arrayBuffer());

  const icoURL = await uploadToS3(
    "icofiletesting",
    `${slugify(validatedFormData.name, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: true, // strip special characters except replacement, defaults to `false`
      locale: "vi", // language code of the locale to use
      trim: true,
    })}.ico`,
    icoBuffer
  );
  const base64String = validatedFormData.pngURL.split(",")[1];
  const pngBuffer = Buffer.from(base64String, "base64");
  const pngURL = await uploadToS3(
    "icofiletesting",
    `${slugify(validatedFormData.name, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: true, // strip special characters except replacement, defaults to `false`
      locale: "vi", // language code of the locale to use
      trim: true,
    })}.png`,
    pngBuffer
  );

  const icon = await db.icon.create({
    data: {
      name: validatedFormData.name,
      icoURL: icoURL,
      pngURL: pngURL,
      likes: 0,
      downloads: 0,
      userId: session.id,
    },
  });

  return NextResponse.json(
    {
      message: "working till end",
      data: {
        icon,
      },
    },
    { status: 200 }
  );
  // what we will get here the raw images and then we need to work based on those
});