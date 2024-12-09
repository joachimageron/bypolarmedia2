import {Post, Like, Dislike, Media, PostHashtag, User, Follower, Comment} from '@prisma/client'; // Import de Prisma pour les types


export type getUserById = {
  userInfo: {
    followers: Follower[]
    following: Follower[]
  } & User | null
}

export type getPostsByUser = (Post & {
  comments: Comment[];
  likes: Like[];
  dislikes: Dislike[];
  media: Media[];
  hashtags: (PostHashtag & {
    hashtag: Hashtag;
  })[];
  author: User;
})[];

export type PostByUser = (Post & {
  comments: Comment[];
  likes: Like[];
  dislikes: Dislike[];
  media: Media[];
  hashtags: (PostHashtag & {
    hashtag: Hashtag;
  })[];
  author: User;
});