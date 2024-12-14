'use client'
import {PostList} from "@/utils/types/data";
import PostCard from "@/app/components/posts/PostCard";
import {useEffect, useRef, useState} from "react";
import {getAllPosts} from "@/utils/data";
import {Spinner} from "@nextui-org/react";


export const PostContainer = () => {
  
  const [posts, setPosts] = useState<PostList>([]);
  const skip = useRef(0);
  const take = 10;
  const [isLoading, setIsLoading] = useState(false);
  
  const loadPosts = async () => {
    if (isLoading) return; // empêche d'appeler plusieurs fois lors de l'arrivé en bas
    setIsLoading(true);
    const newPosts = await getAllPosts(skip.current, take);
    setPosts((prev) => [...prev, ...newPosts]);
    skip.current += newPosts.length;
    setIsLoading(false);
  };
  
  useEffect(() => {
    // Chargement initial
    loadPosts();
  }, []);
  
  useEffect(() => {
    let timeoutId: null | number = null;
    const handleScroll = () => {
      // Throttling pour éviter trop d'appels
      if (timeoutId) return;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      timeoutId = setTimeout(() => {
        timeoutId = null;
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.body.scrollHeight;
        
        // Si on est proche du bas (par exemple, à moins de 300px)
        if (scrollPosition >= pageHeight - 300) {
          loadPosts();
        }
      }, 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
    
  }, [isLoading]);
  
  return (
    <ul>
      <ul>
        {posts?.map(post => (
          <PostCard key={post.id} post={post}/>
        ))}
      </ul>
      
      {isLoading &&
         <div className={"w-full flex flex-col items-center"}>
            <Spinner className={"mt-3"}/>
         </div>
      }
    
    </ul>
  )
}