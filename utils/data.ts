'use server';
import { prisma } from "@/prisma/prisma";

/**
 * ---------------------------
 * Méthodes pour les Utilisateurs
 * ---------------------------
 */

/**
 * Savoir si un utilisateur existe
 * @param id
 */
export async function userExists(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return !!user;
}

/**
 * Créer un nouvel utilisateur
 * @param userId
 */
export async function getUserById(userId: string | null) {
  if (!userId) return null;
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      followers: true,
      following: true,
    },
  });
}

/**
 * Récupérer un utilisateur par son email
 * @param email
 */
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      posts: true,
      followers: true,
      following: true,
    },
  });
}

/**
 * Mettre à jour les informations d'un utilisateur
 * @param userId
 * @param data{name, description, image, bgImage}
 */
export async function updateUser(
  userId: string,
  data: Partial<{
    name?: string;
    description?: string;
    image?: string;
    bgImage?: string;
  }>
) {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
}

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
    where: { id: postId },
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
export async function getAllPosts(
  skip: number = 0,
  take: number = 10
) {
  return prisma.post.findMany({
    skip,
    take,
    orderBy: {
      createdAt: 'desc',
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
      author: true,
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
  return prisma.post.findMany({
    where: { authorId: userId },
    skip,
    take,
    orderBy: {
      createdAt: 'desc',
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
      author: true,
    },
  });
}

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
    where: { postId },
    include: {
      author: true,
      likes: true,
      dislikes: true,
    },
  });
}

/**
 * ---------------------------
 * Méthodes pour les Likes
 * ---------------------------
 */

/**
 * Liker ou ne plus liker une publication
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
 * Liker ou ne plus liker un commentaire
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
      where: { id: dislike.id },
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
      where: { id: dislike.id },
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

/**
 * ---------------------------
 * Méthodes pour les Followers
 * ---------------------------
 */

/**
 * Suivre ou ne plus suivre un utilisateur
 * @param followerId
 * @param followingId
 */

export async function toggleFollowUser(
  followerId: string,
  followingId: string
) {
  const follow = await prisma.follower.findFirst({
    where: {
      followerId,
      followingId,
    },
  });

  if (follow) {
    await prisma.follower.delete({
      where: { id: follow.id },
    });
    return false;
  } else {
    await prisma.follower.create({
      data: {
        followerId,
        followingId,
      },
    });
    return true;
  }
}


export async function getFollowers(userId: string) {
  return prisma.follower.findMany({
    where: { followingId: userId },
    include: {
      follower: true,
    },
  });
}


export async function getFollowing(userId: string) {
  return prisma.follower.findMany({
    where: { followerId: userId },
    include: {
      following: true,
    },
  });
}

/**
 * ---------------------------
 * Méthodes pour les Notifications
 * ---------------------------
 */

/**
 * Créer une notification
 */

export async function createNotification(data: {
  userId: string;
  content: string;
}) {
  return prisma.notification.create({
    data,
  });
}

/**
 * Récupérer les notifications d'un utilisateur
 */

export async function getNotificationsByUser(userId: string) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

/**
 * Marquer une notification comme lue
 */

export async function markNotificationAsRead(
  notificationId: string
) {
  return prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true },
  });
}

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
    where: { name },
    update: {},
    create: { name },
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
    where: { postId },
  });
}
