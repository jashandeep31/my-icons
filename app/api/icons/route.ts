import catchAsync, { AppError } from "@/lib/catchAsync";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { uploadToS3 } from "@/lib/uploadToS3";
import { NextResponse } from "next/server";
import slugify from "slugify";
import * as z from "zod";
import sharp from "sharp";

const FormDataSchema = z.object({
  name: z.string().min(3, "Name is required atleast 3 char"),
  platform: z.enum(["MACOS", "WINDOWS", "OTHER"]),
  public: z.boolean(),
  icoURL: z.string(),
  pngURL: z.string(),
});
export const dynamic = "force-dynamic";

export const GET = async (req: Request) => {
  // const { searchParams } = new URL(req.url);
  // let page = searchParams.get("page") ? searchParams.get("page") : 1;
  // page = !isNaN(Number(page)) ? Number(page) : 1;

  // let platform = searchParams.get("platform")
  //   ? searchParams.get("platform")?.toUpperCase().trim()
  //   : "all";

  // const where: {
  //   public: true;
  //   platform?: "MACOS" | "OTHER" | "WINDOWS";
  // } = {
  //   public: true,
  // };
  // if (platform === "MACOS" || platform === "OTHER" || platform === "WINDOWS") {
  //   where["platform"] = platform;
  // }

  try {
    const icons = await db.icon.findMany({
      where: {
        public: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      // skip: (page - 1) * 24,
      // take: 24,
    });

    return NextResponse.json({ icons }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "failed" }, { status: 401 });
  }
};

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
  const resizedImageBuffer = await sharp(pngBuffer).resize(256, 256).toBuffer();

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
    resizedImageBuffer
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
  // what we will get here the raw images and then we need to work based on those
});
