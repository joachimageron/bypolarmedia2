'use server'
import {prisma} from "@/prisma/prisma";

// ---------------------------
// Méthodes pour les Utilisateurs
// ---------------------------

/**
 * Créer un nouvel utilisateur
 */
/**
 * méthode non implémentée, car les utilisateurs sont créé par nextauth
 */


/**
 * Savoir si un utilisateur existe
 */
export async function userExists(id: string) {
  const user = await prisma.user.findUnique({
    where: { id: id },
  });
  return !!user;
}

/**
 * Récupérer un utilisateur par son ID
 */
export async function getUserById(userId: string | null){
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
 */
export async function updateUser(userId: string, data: Partial<{
  name: string;
  email: string;
  description: string;
  image: string;
}>) {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
}

// ---------------------------
// Méthodes pour les Publications
// ---------------------------

/**
 * Créer une nouvelle publication
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
 * Récupérer toutes les publications (avec pagination)
 */
export async function getAllPosts(skip: number = 0, take: number = 10) {
  return prisma.post.findMany({
    skip: skip,
    take: take,
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
 */
export async function getPostsByUser(userId: string) {
  return prisma.post.findMany({
    where: { authorId: userId },
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

// ---------------------------
// Méthodes pour les Commentaires
// ---------------------------

/**
 * Ajouter un commentaire à une publication
 */
export async function addComment(data: {
  postId: string;
  authorId: string;
  content: string;
}) {
  if (!data.content || !data.postId || !data.authorId ) return false;
  return prisma.comment.create({
    data,
    include: {
      author: true,
      likes: true,
      dislikes: true,
    }
  });
}

/**
 * Récupérer les commentaires d'une publication
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

// ---------------------------
// Méthodes pour les Likes
// ---------------------------

/**
 * handle like or unlike post
 */
export async function likeOrDislikePost(userId: string, postId: string) {
  const like = await prisma.like.findFirst({
    where: {
      userId,
      postId,
    },
  });
  if (like) {
    await prisma.like.delete({
      where: {
        id: like.id,
      },
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
 * handle like or unlike comment
 */
export async function likeOrDislikeComment(userId: string, commentId: string) {
  const like = await prisma.like.findFirst({
    where: {
      userId,
      commentId,
    },
  });
  if (like) {
    await prisma.like.delete({
      where: {
        id: like.id,
      },
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


// ---------------------------
// Méthodes pour les Dislikes
// ---------------------------

/**
 * handle dislike or undislike post
 */
export async function dislikeOrUndislikePost(userId: string, postId: string) {
  const dislike = await prisma.dislike.findFirst({
    where: {
      userId,
      postId,
    },
  });
  if (dislike) {
    await prisma.dislike.delete({
      where: {
        id: dislike.id,
      },
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
 * handle dislike or undislike comment
 */
export async function dislikeOrUndislikeComment(userId: string, commentId: string) {
  const dislike = await prisma.dislike.findFirst({
    where: {
      userId,
      commentId,
    },
  });
  if (dislike) {
    await prisma.dislike.delete({
      where: {
        id: dislike.id,
      },
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


// ---------------------------
// Méthodes pour les Followers
// ---------------------------

/**
 * Suivre un utilisateur
 */
export async function followUser(followerId: string, followingId: string) {
  return prisma.follower.create({
    data: {
      followerId,
      followingId,
    },
  });
}

/**
 * Ne plus suivre un utilisateur
 */
export async function unfollowUser(followerId: string, followingId: string) {
  return prisma.follower.deleteMany({
    where: {
      followerId,
      followingId,
    },
  });
}

/**
 * Récupérer les followers d'un utilisateur
 */
export async function getFollowers(userId: string) {
  return prisma.follower.findMany({
    where: { followingId: userId },
    include: {
      follower: true,
    },
  });
}

/**
 * Récupérer les utilisateurs que suit un utilisateur
 */
export async function getFollowing(userId: string) {
  return prisma.follower.findMany({
    where: { followerId: userId },
    include: {
      following: true,
    },
  });
}

// ---------------------------
// Méthodes pour les Notifications
// ---------------------------

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
export async function markNotificationAsRead(notificationId: string) {
  return prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true },
  });
}

// ---------------------------
// Méthodes pour les Hashtags
// ---------------------------

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
export async function addHashtagToPost(postId: string, hashtagId: string) {
  return prisma.postHashtag.create({
    data: {
      postId,
      hashtagId,
    },
  });
}

/**
 * Récupérer les publications associées à un hashtag
 */
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

// ---------------------------
// Méthodes pour les Médias
// ---------------------------

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
