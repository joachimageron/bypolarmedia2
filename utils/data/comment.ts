'use server';
import {prisma} from "@/prisma/prisma";
import {serverSession} from "@/utils/auth";


/**
 * ---------------------------
 * Méthodes pour les Commentaires
 * ---------------------------
 */


/**
 * Ajouter un commentaire à une publication
 * @param postId
 * @param content
 */
export async function addComment(
  postId: string,
  content: string
) {
  const session = await serverSession();
  if (!session) return null
  return prisma.comment.create({
    data: {
      content,
      authorId: session.user.userId,
      postId,
    },
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
