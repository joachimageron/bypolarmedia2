
import {prisma} from "@/prisma/prisma";

// ---------------------------
// Méthodes pour les Utilisateurs
// ---------------------------

/**
 * Créer un nouvel utilisateur
 */
/**
 * les utilisateurs sont créé par nextauth
 */
// export async function createUser(data: {
//   name?: string;
//   email: string;
//   image?: string;
// }) {
//   return await prisma.user.create({
//     data,
//   });
// }

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
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      posts: true,
      followers: true,
      following: true,
    },
  });
}

/**
 * Récupérer un utilisateur par son email
 */
export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
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
  return await prisma.user.update({
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
  return await prisma.post.create({
    data,
  });
}

/**
 * Récupérer une publication par son ID
 */
export async function getPostById(postId: string) {
  return await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
      comments: true,
      likes: true,
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
  return await prisma.post.findMany({
    skip,
    take,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: true,
      comments: true,
      likes: true,
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
  return await prisma.comment.create({
    data,
  });
}

/**
 * Récupérer les commentaires d'une publication
 */
export async function getCommentsByPost(postId: string) {
  return await prisma.comment.findMany({
    where: { postId },
    include: {
      author: true,
      likes: true,
    },
  });
}

// ---------------------------
// Méthodes pour les Likes
// ---------------------------

/**
 * Aimer une publication
 */
export async function likePost(userId: string, postId: string) {
  return await prisma.like.create({
    data: {
      userId,
      postId,
    },
  });
}

/**
 * Retirer son like d'une publication
 */
export async function unlikePost(userId: string, postId: string) {
  return await prisma.like.deleteMany({
    where: {
      userId,
      postId,
    },
  });
}

// ---------------------------
// Méthodes pour les Followers
// ---------------------------

/**
 * Suivre un utilisateur
 */
export async function followUser(followerId: string, followingId: string) {
  return await prisma.follower.create({
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
  return await prisma.follower.deleteMany({
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
  return await prisma.follower.findMany({
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
  return await prisma.follower.findMany({
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
  return await prisma.notification.create({
    data,
  });
}

/**
 * Récupérer les notifications d'un utilisateur
 */
export async function getNotificationsByUser(userId: string) {
  return await prisma.notification.findMany({
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
  return await prisma.notification.update({
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
  return await prisma.hashtag.upsert({
    where: { name },
    update: {},
    create: { name },
  });
}

/**
 * Associer un hashtag à une publication
 */
export async function addHashtagToPost(postId: string, hashtagId: string) {
  return await prisma.postHashtag.create({
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
  return await prisma.post.findMany({
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
  return await prisma.media.create({
    data,
  });
}

/**
 * Récupérer les médias d'une publication
 */
export async function getMediaByPost(postId: string) {
  return await prisma.media.findMany({
    where: { postId },
  });
}