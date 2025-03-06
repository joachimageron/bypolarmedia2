import { serverSession } from "@/utils/auth";
import { cloudinary } from "@/utils/cloudinary";
import fs from "fs/promises";
import path from "path";

export default async function uploadImage(
  imageData: string,
  directory: string
): Promise<string | undefined> {

//   const isProd = process.env.NODE_ENV === "production";
    const isProd = true;

  const session = await serverSession();
  if (!session) return undefined;
  const userId = session.user.userId;
  
  if (isProd) {
    // En production : upload via Cloudinary
    const publicId = `${userId}_${Date.now()}`;
    const result = await cloudinary.uploader.upload(imageData, {
      public_id: publicId,
      folder: directory,
    });
    return result.secure_url;
  } else {
    // En développement : stockage local
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const ext =
      (/^data:(image\/\w+);base64,/.exec(imageData)?.[1].split("/")[1]) ?? "png";
    const uniqueFileName = `${userId}_${Date.now()}.${ext}`;
    const uploadPath = path.join(
      process.cwd(),
      "public",
      "uploads",
      directory,
      uniqueFileName
    );
    await fs.writeFile(uploadPath, buffer);
    return `/uploads/${directory}/${uniqueFileName}`;
  }
}