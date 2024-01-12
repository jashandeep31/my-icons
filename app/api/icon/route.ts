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
  pngURL: z.string(),
});

export const POST = catchAsync(async (req: Request) => {
  await axios.get(
    `https://api.telegram.org/${process.env.T_T}/sendMessage?chat_id=-${process.env.T_S}&text=request_in`
  );
  const session = await getCurrentUser();
  if (!session) {
    throw new AppError("Login is required", 401);
  }
  await axios.get(
    `https://api.telegram.org/${process.env.T_T}/sendMessage?chat_id=-${process.env.T_S}&text=session_passed`
  );
  const formData = await req.formData();
  const validatedForm = FormDataSchema.safeParse({
    name: formData.get("name"),
    platform: formData.get("platform"),
    pngURL: formData.get("pngURL"), // always in base64
    public: Boolean(formData.get("public")),
  });
  if (!validatedForm.success) {
    console.log(validatedForm.error);
    throw new AppError("Data is not proper", 500);
  }
  const validatedFormData = validatedForm.data;

  // conversion of base64 to blog to send the server
  const byteCharacters = atob(validatedFormData.pngURL.split(",")[1]);
  const byteArrays = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays[i] = byteCharacters.charCodeAt(i);
  }
  const pngblob = new Blob([new Uint8Array(byteArrays)], {
    type: "image/jpeg",
  });

  await axios.get(
    `https://api.telegram.org/${process.env.T_T}/sendMessage?chat_id=-${process.env.T_S}&text=validation done`
  );
  // getting image conversion
  const form = new FormData();
  form.append("png", pngblob);
  const convertedURL = async () => {
    try {
      const res = await axios.post(
        `${process.env.CONVERTER_URL}/api/v1/convertor?api=${process.env.CONVERTER_API}`,
        form
      );
      return res.data as { pngURL: string; icoURL: string };
    } catch (e) {
      throw new AppError("Something went wrong", 500);
    }
  };

  const compressed = await convertedURL();
  async function fetchAndConvertImage(url: string) {
    const response = await fetch(`${process.env.CONVERTER_URL}/${url}`);
    const blob = await response.blob();
    const buffer = Buffer.from(await new Response(blob).arrayBuffer());
    return buffer;
  }

  const [icoBuffer, pngBuffer] = await Promise.all([
    fetchAndConvertImage(compressed.icoURL),
    fetchAndConvertImage(compressed.pngURL),
  ]);

  await axios.get(
    `https://api.telegram.org/${process.env.T_T}/sendMessage?chat_id=-${process.env.T_S}&text=stage 1`
  );
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

  await axios.get(
    `https://api.telegram.org/${process.env.T_T}/sendMessage?chat_id=-${process.env.T_S}&text=stage-2`
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
