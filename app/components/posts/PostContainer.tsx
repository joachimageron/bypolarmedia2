'use client'
import PostCard from "@/app/components/posts/PostCard";
import {Spinner} from "@nextui-org/react";
import {generateRandomKey} from "@/utils/utils";
import {PostList} from "@/utils/types/data";


export const PostContainer = ({posts, isLoading}: {posts: PostList, isLoading: boolean | string }) => {
  
  return (
    <ul>
      <ul>
        {posts?.map(post => (
          <PostCard key={post.id + generateRandomKey()} post={post}/>
        ))}
      </ul>
      
      {isLoading === true &&
         <div className={"w-full flex flex-col items-center"}>
            <Spinner className={"mt-3"}/>
         </div>
      }
      
      {isLoading === "loaded" &&
         <div className={"w-full flex flex-col items-center"}>
            <p className={"mt-3 text-default-500"}>No more posts to show</p>
         </div>
      }
    
    </ul>
  )
}