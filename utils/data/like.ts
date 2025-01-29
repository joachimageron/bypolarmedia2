'use server';
import { prisma } from "@/prisma/prisma";
import {serverSession} from "@/utils/auth";

/**
 * ---------------------------
 * Methods for Likes
 * ---------------------------
 */

/**
 * Like or unlike a post
 * @param postId
 */
export async function toggleLikePost(
  postId: string
) {
  const session = await serverSession();
  if (!session) return null;
  const like = await prisma.like.findFirst({
    where: {
      userId: session.user.userId,
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
        userId: session.user.userId,
        postId,
      },
    });
  }
}

/**
 * Like or unlike a comment
 * @param commentId
 */
export async function toggleLikeComment(
  commentId: string
) {
  const session = await serverSession();
  if (!session) return null;
  const like = await prisma.like.findFirst({
    where: {
      userId: session.user.userId,
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
        userId: session.user.userId,
        commentId,
      },
    });
  }
}