'use server';
import {prisma} from "@/prisma/prisma";


/**
 * ---------------------------
 * Méthodes pour les Commentaires
 * ---------------------------
 */


/**
 * Ajouter un commentaire à une publication
 * @param data{postId, authorId, content}
 */
export async function addComment(data: {
  postId: string;
  authorId: string;
  content: string;
}) {
  if (!data.content || !data.postId || !data.authorId) return false;
  return prisma.comment.create({
    data,
    include: {
      author: true,
      likes: true,
      dislikes: true,
    },
  });
}

/**
 * Récupérer les commentaires d'une publication
 * @param postId
 */
export async function getCommentsByPost(postId: string) {
  return prisma.comment.findMany({
    where: {postId},
    include: {
      author: true,
      likes: true,
      dislikes: true,
    },
  });
}
