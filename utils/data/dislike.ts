'use server';
import {prisma} from "@/prisma/prisma";
import {Dislike} from "@prisma/client";


/**
 * ---------------------------
 * Méthodes pour les Dislikes
 * ---------------------------
 */

/**
 * Dislike ou ne plus dislike une publication
 * @param userId
 * @param postId
 */
export async function toggleDislikePost(
  userId: string,
  postId: string
) {
  const dislike = await prisma.dislike.findFirst({
    where: {
      userId,
      postId,
    },
  });
  if (dislike) {
    await prisma.dislike.delete({
      where: {id: dislike.id},
    });
    return false;
  } else {
    return prisma.dislike.create({
      data: {
        userId,
        postId,
      },
    });
  }
}

/**
 * Dislike ou ne plus dislike un commentaire
 * @param userId
 * @param commentId
 */
export async function toggleDislikeComment(
  userId: string,
  commentId: string
) {
  const dislike = await prisma.dislike.findFirst({
    where: {
      userId,
      commentId,
    },
  });
  if (dislike) {
    await prisma.dislike.delete({
      where: {id: dislike.commentId ?? undefined},
    });
    return false;
  } else {
    return prisma.dislike.create({
      data: {
        userId,
        commentId,
      },
    });
  }
}
