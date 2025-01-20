'use server';
import {prisma} from "@/prisma/prisma";


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
      where: {id: follow.id},
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
    where: {followingId: userId},
    include: {
      follower: true,
      
    },
  });
}


export async function getFollowing(userId: string) {
  return prisma.follower.findMany({
    where: {followerId: userId},
    include: {
      following: true,
    },
  });
}
