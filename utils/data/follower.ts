'use server';
import {prisma} from "@/prisma/prisma";
import {serverSession} from "@/utils/auth";


/**
 * ---------------------------
 * Méthodes pour les Followers
 * ---------------------------
 */

/**
 * Suivre ou ne plus suivre un utilisateur
 * @param followingId
 */

export async function toggleFollowUser(followingId: string) {
  const session = await serverSession()
  if (!session) return null
  
  const follow = await prisma.follower.findFirst({
    where: {
      followerId: session.user.userId,
      followingId,
    },
  });
  
  
  if (follow) {
    await prisma.follower.delete({
      where: {id: follow.id},
    });
    return 'deleted'
  } else {
    console.log('create follow')
    return await prisma.follower.create({
      data: {
        followerId: session.user.userId,
        followingId,
      },
    });
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
