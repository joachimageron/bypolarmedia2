'use server';
import { put } from "@vercel/blob";
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
  
  // Convertir la string base64 en buffer
  const buffer = Buffer.from(
    data.imageData.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  // Récupérer l’extension du fichier
  const ext =
    /^data:(image\/\w+);base64,/.exec(data.imageData)?.[1].split("/")[1] ?? "png";
  
  // Nom de fichier unique
  const uniqueFileName = `${session.user.userId}_${Date.now()}.${ext}`;
  
  // Vérifier si on est en production
  const isProd = process.env.NODE_ENV === "production";
  let fileUrl: string;
  
  if (isProd) {
    // Upload sur Vercel Blob
    // Paramètre `access: "public"` pour un URL directement accessible
    const result = await put(`posts/${uniqueFileName}`, buffer, {
      access: "public",
    });
    fileUrl = result.url; // URL stockée chez Vercel Blob
  } else {
    // En dev, on continue éventuellement à stocker en local
    const uploadPath = path.join(process.cwd(), "public", "uploads", "posts", uniqueFileName);
    await fs.writeFile(uploadPath, buffer);
    fileUrl = `/uploads/posts/${uniqueFileName}`;
  }
  
  // Enregistrer l’URL en base
  return prisma.media.create({
    data: {
      postId: data.postId,
      type: data.type,
      url: fileUrl,
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
