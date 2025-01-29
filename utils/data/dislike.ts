'use server';
import {prisma} from "@/prisma/prisma";
import {serverSession} from "@/utils/auth";


/**
 * ---------------------------
 * Méthodes pour les Dislikes
 * ---------------------------
 */

/**
 * Dislike ou ne plus dislike une publication
 * @param postId
 */
export async function toggleDislikePost(
  postId: string
) {
  const session = await serverSession();
  if (!session) return null;
  const dislike = await prisma.dislike.findFirst({
    where: {
      userId: session.user.userId,
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
        userId: session.user.userId,
        postId,
      },
    });
  }
}

/**
 * Dislike ou ne plus dislike un commentaire
 * @param commentId
 */
export async function toggleDislikeComment(
  commentId: string
) {
  const session = await serverSession();
  if (!session) return null;
  const dislike = await prisma.dislike.findFirst({
    where: {
      userId: session.user.userId,
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
        userId: session.user.userId,
        commentId,
      },
    });
  }
}
