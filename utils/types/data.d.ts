import {Post, Comment, Like, Dislike, Media, PostHashtag, User, Follower} from '@prisma/client'; // Import de Prisma pour les types


export type UserById = {
  userInfo: {
    followers: Follower[]
    following: Follower[]
  } & User | null
}

export type PostsByUser = (Post & {
  likes: Like[];
  dislikes: Dislike[];
  media: Media[];
  hashtags: (PostHashtag & {
    hashtag: Hashtag;
  })[];
  author: User;
  _count: {
    comments: number;
  };
})[];

export type PostByUser = Post & {
  likes: Like[];
  dislikes: Dislike[];
  media: Media[];
  hashtags: (PostHashtag & {
    hashtag: Hashtag;
  })[];
  author: User;
  _count: {
    comments: number;
  };
};

export type CommentsByPost = (Comment & {
  author: User;
  likes: Like[];
})[];
