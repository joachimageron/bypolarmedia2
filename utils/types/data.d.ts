import { User, Follower } from '@prisma/client'; // Import de Prisma pour les types


export type getUserById = {
  userInfo: {
    followers: Follower[]
    following: Follower[]
  } & User | null
}