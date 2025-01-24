"use client";
import {useEffect, useRef, useState} from "react";
import {getFollowedPosts, getNotFollowedPosts} from "@/utils/data/post";
import {PostList} from "@/utils/types/data";
import PostCard from "@/app/components/posts/PostCard";
import {generateRandomKey} from "@/utils/utils";
import {Divider, Spinner} from "@nextui-org/react";

export default function Home() {
  
  const [followedPosts, setFollowedPosts] = useState<PostList>([]);
  const [notFollowedPosts, setNotFollowedPosts] = useState<PostList>([]);
  const loadedFollowingPosts = useRef<boolean>(false);
  const loadedNotFollowingPosts = useRef<boolean>(false);
  const skipFollowed = useRef(0);
  const skipUnFollowed = useRef(0);
  const take = 10;
  const isLoading = useRef<boolean>(false);
  
  const loadFollowedPosts = async () => {
    if (isLoading.current || loadedFollowingPosts.current) return;
    
    isLoading.current = true;
    
    const newFollowingPosts = await getFollowedPosts(skipFollowed.current, take);
    
    if (newFollowingPosts === null) return;
    
    if (newFollowingPosts.length > 0) {
      setFollowedPosts((prev) => [...prev, ...newFollowingPosts]);
      skipFollowed.current += newFollowingPosts.length;
    }
    
    if (newFollowingPosts.length < 10) loadedFollowingPosts.current = true;
    
    isLoading.current = false;
  }
  
  const loadNotFollowedPosts = async () => {
    if (isLoading.current) return;
    
    isLoading.current = true;
    
    const newUnfollowedPosts = await getNotFollowedPosts(skipUnFollowed.current, take);
    
    if (newUnfollowedPosts === null) return;
    
    if (newUnfollowedPosts.length > 0) {
      setNotFollowedPosts((prev) => [...prev, ...newUnfollowedPosts]);
      skipUnFollowed.current += newUnfollowedPosts.length;
    }
    
    if (newUnfollowedPosts.length < 10) loadedNotFollowingPosts.current = true;
    
    isLoading.current = false;
  }
  
  useEffect(() => {
    loadFollowedPosts().then(() => {
      if (loadedFollowingPosts.current) {
        loadNotFollowedPosts();
      }
    })
    
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
          if (!loadedFollowingPosts.current) {
            loadFollowedPosts();
          }
          if (loadedFollowingPosts.current && !loadedNotFollowingPosts.current) {
            loadNotFollowedPosts();
          }
        }
      }, 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
    
  }, []);
  
  return (
    <main className={"m-auto max-w-xl mb-20"}>
      <ul>
        <ul>
          {followedPosts?.map(post => (
            <PostCard key={post.id + generateRandomKey()} post={post} displayFollow={true}/>
          ))}
        </ul>
        {followedPosts.length > 0 &&
          <div>
           <Divider className={'mt-12'}/>
            <p className={"text-center my-5"}>Discover
            </p>
            <Divider className={'mb-12'}/>
          </div>
        }
      <ul>
        {notFollowedPosts?.map(post => (
          <PostCard key={post.id + generateRandomKey()} post={post} displayFollow={true}/>
        ))}
      </ul>
      
      {isLoading.current &&
         <div className={"w-full flex flex-col items-center"}>
            <Spinner className={"mt-3"}/>
         </div>
      }
      
      {(loadedFollowingPosts.current && loadedNotFollowingPosts.current) &&
         <div className={"w-full flex flex-col items-center"}>
           {(followedPosts.length === 0 && notFollowedPosts.length === 0) ? (
             <p className={"mt-3 text-default-500"}>No posts to show</p>
           ) : (
             <p className={"mt-3 text-default-500"}>No more posts to show</p>
           )
           }

         </div>
      }
    
    </ul>
</main>
)
  ;
}
