'use client'
import PostCard from "@/app/components/posts/PostCard";
import {Spinner} from "@nextui-org/react";
import {generateRandomKey} from "@/utils/utils";
import {PostList} from "@/utils/types/data";


export const PostContainer = ({posts, isLoading, displayFollow}: {
  posts: PostList,
  isLoading: boolean | string,
  displayFollow: boolean
}) => {
  
  return (
    <ul>
      <ul>
        {posts?.map(post => (
          <PostCard key={post.id + generateRandomKey()} post={post} displayFollow={displayFollow}/>
        ))}
      </ul>
      
      {isLoading === true &&
         <div className={"w-full flex flex-col items-center"}>
            <Spinner className={"mt-3"}/>
         </div>
      }
      
      {isLoading === "loaded" &&
         <div className={"w-full flex flex-col items-center"}>
           {posts.length === 0 ? (
             <p className={"mt-3 text-default-500"}>No posts to show</p>
           ) : (
            <p className={"mt-3 text-default-500"}>No more posts to show</p>
           )
           }

         </div>
      }
    
    </ul>
  )
}