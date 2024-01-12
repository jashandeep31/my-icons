import catchAsync, { AppError } from "@/lib/catchAsync";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { uploadToS3 } from "@/lib/uploadToS3";
import axios from "axios";
import { NextResponse } from "next/server";
import slugify from "slugify";
import * as z from "zod";

const FormDataSchema = z.object({
  name: z.string().min(3, "Name is required atleast 3 char"),
  platform: z.enum(["MACOS", "WINDOWS", "OTHER"]),
  public: z.boolean(),
  pngURL: z.string().min(3, "Name is required atleast 3 char"),
  icoURL: z.string().min(3, "Name is required atleast 3 char"),
});

export const POST = catchAsync(async (req: Request) => {
  const session = await getCurrentUser();
  if (!session) {
    throw new AppError("Login is required", 401);
  }
  axios.get(
    `https://api.telegram.org/${process.env.T_T}/sendMessage?chat_id=-${process.env.T_S}&text=session pass`
  );
  const data: any = await req.json();
  const validatedForm = FormDataSchema.safeParse({
    name: data.name,
    platform: data.platform,
    public: Boolean(data.public),
    pngURL: data.pngURL,
    icoURL: data.icoURL,
  });

  if (!validatedForm.success) {
    throw new AppError("Data is not proper", 500);
  }
  const validatedFormData = validatedForm.data;
  axios.get(
    `https://api.telegram.org/${process.env.T_T}/sendMessage?chat_id=-${process.env.T_S}&text=validationpass`
  );
  async function fetchAndConvertImage(url: string) {
    const response = await fetch(`${process.env.CONVERTER_URL}/${url}`);
    const blob = await response.blob();
    const buffer = Buffer.from(await new Response(blob).arrayBuffer());
    return buffer;
  }

  const [icoBuffer, pngBuffer] = await Promise.all([
    fetchAndConvertImage(validatedFormData.icoURL),
    fetchAndConvertImage(validatedFormData.pngURL),
  ]);

  const slugifiedName = slugify(validatedFormData.name, {
    replacement: "-",
    remove: undefined,
    lower: true,
    strict: true,
    locale: "vi",
    trim: true,
  });

  const [icoURL, pngURL] = await Promise.all([
    uploadToS3("icofiletesting", slugifiedName, icoBuffer),
    uploadToS3("icofiletesting", slugifiedName, pngBuffer),
  ]);

  axios.get(
    `https://api.telegram.org/${process.env.T_T}/sendMessage?chat_id=-${process.env.T_S}&text=genration start`
  );
  const icon = await db.icon.create({
    data: {
      name: validatedFormData.name,
      icoURL: icoURL,
      pngURL: pngURL,
      likes: 0,
      downloads: 0,
      platform: validatedFormData.platform,
      userId: session.id,
    },
  });

  return NextResponse.json(
    {
      message: "Icon successfully generated",
      icon,
    },
    { status: 201 }
  );
});
