'use server';
import {prisma} from "@/prisma/prisma";
import {Prisma} from "@prisma/client";
import {serverSession} from "@/utils/auth";

/**
 * ---------------------------
 * Méthodes pour les Publications
 * ---------------------------
 */


/**
 * Créer une nouvelle publication
 * @param data{authorId, content}
 */

export async function createPost(data: {
  authorId: string;
  content: string;
}) {
  return prisma.post.create({
    data,
  });
}

/**
 * Récupérer une publication par son ID
 * @param postId
 */
export async function getPostById(postId: string) {
  return prisma.post.findUnique({
    where: {id: postId},
    include: {
      author: true,
      comments: true,
      likes: true,
      dislikes: true,
      media: true,
      hashtags: {
        include: {
          hashtag: true,
        },
      },
    },
  });
}

/**
 * Récupérer toutes les publications
 * @param skip
 * @param take
 */

export async function getAllPosts(skip: number = 0, take: number = 10) {
  const session = await serverSession();
  if (!session) return null;
  return prisma.post.findMany({
    skip,
    take,
    orderBy: {
      createdAt: Prisma.SortOrder.desc,
    },
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
      likes: true,
      dislikes: true,
      media: true,
      hashtags: {
        include: {
          hashtag: true,
        },
      },
      author: {
        include: {
          following: {
            where: {
              followerId: session.user.userId,
            },
          },
        },
      },
    },
  });
}
/**
 * Récupérer toutes les publications d'un utilisateur
 * @param userId
 * @param skip
 * @param take
 */

export async function getPostsByUser(
  userId: string,
  skip: number = 0,
  take: number = 10
) {
  const session = await serverSession()
  if (!session) return null;
  return prisma.post.findMany({
    where: {authorId: userId},
    skip,
    take,
    orderBy: {
      createdAt: Prisma.SortOrder.desc,
    },
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
      likes: true,
      dislikes: true,
      media: true,
      hashtags: {
        include: {
          hashtag: true,
        },
      },
      author: {
        include: {
          following: {
            where: {
              followerId: session.user.userId,
            },
          },
        }
      }
    },
  });
}
