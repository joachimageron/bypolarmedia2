'use server';
import {prisma} from "@/prisma/prisma";


/**
 * ---------------------------
 * Méthodes pour les Hashtags
 * ---------------------------
 */

/**
 * Créer ou récupérer un hashtag
 */

export async function upsertHashtag(name: string) {
  return prisma.hashtag.upsert({
    where: {name},
    update: {},
    create: {name},
  });
}

/**
 * Associer un hashtag à une publication
 */

export async function addHashtagToPost(
  postId: string,
  hashtagId: string
) {
  return prisma.postHashtag.create({
    data: {
      postId,
      hashtagId,
    },
  });
}


export async function getPostsByHashtag(name: string) {
  return prisma.post.findMany({
    where: {
      hashtags: {
        some: {
          hashtag: {
            name,
          },
        },
      },
    },
    include: {
      author: true,
      comments: true,
      likes: true,
    },
  });
}
