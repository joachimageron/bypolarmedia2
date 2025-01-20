'use server';
import {prisma} from "@/prisma/prisma";


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
  url: string;
  type: string;
}) {
  return prisma.media.create({
    data,
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
