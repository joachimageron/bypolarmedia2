"use server";
import { prisma } from "@/prisma/prisma";
import { serverSession } from "@/utils/auth";
import uploadImage from "@/utils/uploadImage";

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

  const postFolder = process.env.POSTS_FOLDER ?? "posts";

    const fileUrl = await uploadImage(data.imageData, postFolder);
    if (!fileUrl) return null;

  // Enregistrer l’URL en base
  return prisma.media.create({
    data: {
      postId: data.postId,
      type: data.type,
      url: fileUrl,
    },
  });
}
/**
 * Récupérer les médias d'une publication
 */

export async function getMediaByPost(postId: string) {
  return prisma.media.findMany({
    where: { postId },
  });
}
