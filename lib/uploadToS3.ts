import {
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "./catchAsync";

const client = new S3Client({
  endpoint: process.env.STORAGE_ENDPOINT as string,
  region: process.env.STORAGE_REGION as string,
  credentials: {
    accessKeyId: process.env.STORAGE_ACCESS_ID as string,
    secretAccessKey: process.env.STORAGE_ACCESS_TOKEN as string,
  },
});

export const uploadToS3 = async (path: string, name: string, file: Buffer) => {
  const filename = uuidv4() + name;
  const key = `myicons_production/${path}/${filename}`;
  const command = new PutObjectCommand({
    Bucket: process.env.STORAGE_NAME,
    Key: key,
    Body: file,
    ACL: "public-read",
  });

  try {
    const response = await client.send(command);
    return `https://${process.env.STORAGE_NAME}.${process.env.STORAGE_REGION}.digitaloceanspaces.com/${key}`;
  } catch (err) {
    console.log(err);
    throw new AppError("something went wrong", 500);
  }
};

export const deleteFromS3 = async (url: string) => {
  const key = url.replace(
    `https://${process.env.STORAGE_NAME}.${process.env.STORAGE_REGION}.digitaloceanspaces.com/`,
    ""
  );
  const command = new DeleteObjectCommand({
    Bucket: process.env.STORAGE_NAME,
    Key: key,
  });

  try {
    const response = await client.send(command);
  } catch (err) {}
};
