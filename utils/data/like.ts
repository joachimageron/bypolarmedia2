'use server';
import { prisma } from "@/prisma/prisma";

/**
 * ---------------------------
 * Methods for Likes
 * ---------------------------
 */

/**
 * Like or unlike a post
 * @param userId
 * @param postId
 */
export async function toggleLikePost(
  userId: string,
  postId: string
) {
  const like = await prisma.like.findFirst({
    where: {
      userId,
      postId,
    },
    select: {
      id: true, // Sélection explicite de l'ID
    },
  });
  if (like) {
    await prisma.like.delete({
      where: { id: like.id },
    });
    return false;
  } else {
    return prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
  }
}

/**
 * Like or unlike a comment
 * @param userId
 * @param commentId
 */
export async function toggleLikeComment(
  userId: string,
  commentId: string
) {
  const like = await prisma.like.findFirst({
    where: {
      userId,
      commentId,
    },
  });
  if (like) {
    await prisma.like.delete({
      where: { id: like.id },
    });
    return false;
  } else {
    return prisma.like.create({
      data: {
        userId,
        commentId,
      },
    });
  }
}