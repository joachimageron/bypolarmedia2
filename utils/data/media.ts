'use server';
import {prisma} from "@/prisma/prisma";
import path from "path";
import fs from "fs/promises";
import {serverSession} from "@/utils/auth";


/**
 * ---------------------------
 * Méthodes pour les Médias
 * ---------------------------
 */

/**
 * Ajouter un média à une publication
 */

export async function addMediaToPost(data: {
  postId: string;
  imageData?: string;
  type: string;
}) {
  const session = await serverSession();
  if (!session) return null;
  if (!data.imageData) return null;
  
  const buffer = Buffer.from(data.imageData.replace(/^data:image\/\w+;base64,/, ""), "base64");
  
  const ext = /^data:(image\/\w+);base64,/.exec(data.imageData)?.[1].split('/')[1] ?? 'png';
  
  const uniqueFileName = `${session.user.userId}_${Date.now()}.${ext}`;
  
  const uploadPath = path.join(process.cwd(), "public", "uploads", "posts", uniqueFileName);
  
  await fs.writeFile(uploadPath, buffer);
  
  data.imageData = `/uploads/posts/${uniqueFileName}`;
  return prisma.media.create({
    data: {
      postId: data.postId,
      type: data.type,
      url: data.imageData,
    }
  });
}

/**
 * Récupérer les médias d'une publication
 */

export async function getMediaByPost(postId: string) {
  return prisma.media.findMany({
    where: {postId},
  });
}
