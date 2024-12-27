import {Post, Comment, Like, Dislike, Media, Hashtag, PostHashtag, User, Follower} from '@prisma/client'; // Import de Prisma pour les types


export type UserById = User & {
    followers: Follower[]
    following: Follower[]
  }

export type PostList = (Post & {
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
  dislikes: Dislike[];
})[];

export type CommentByPost = (Comment & {
  author: User;
  likes: Like[];
  dislikes: Dislike[];
});
