'use client'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Divider,
  Image,

} from "@nextui-org/react";
import {useState} from "react";
import {PostExtended} from "@/utils/types/data";
import ThumbDownIcon from "@/app/components/icons/ThumbDownIcon";
import {toggleDislikePost, toggleLikePost} from "@/utils/data";
import CommentSection from "@/app/components/posts/CommentSection";
import FollowButton from "@/app/components/users/FollowButton";
import {useSession} from "next-auth/react";
import Link from "next/link";
import ThumbUpIcon from "@/app/components/icons/ThumbUpIcon";

export default function PostCard({post, displayFollow}: Readonly<{ post: PostExtended, displayFollow: boolean }>) {
  const {data} = useSession()
  
  const [isLiked, setIsLiked] = useState(!!post.likes.find(like => like.userId === post.author.id));
  const [likeCount, setLikeCount] = useState(post.likes.length);
  
  const [isDisliked, setIsDisliked] = useState(!!post.dislikes.find(dislike => dislike.userId === post.author.id))
  const [dislikeCount, setDislikeCount] = useState(post.dislikes.length);
  
  const [commentOpen, setCommentOpen] = useState(false)
  
  const [errorLoadingImage, setErrorLoadingImage] = useState(false)
  
  const handleLike = async () => {
    const liked = await toggleLikePost(post.author.id, post.id)
    setIsLiked(!!liked)
    if (liked) setLikeCount(likeCount + 1)
    else setLikeCount(likeCount - 1)
  }
  
  const handleDislike = async () => {
    const disliked = await toggleDislikePost(post.author.id, post.id)
    setIsDisliked(!!disliked)
    if (disliked) setDislikeCount(dislikeCount + 1)
    else setDislikeCount(dislikeCount - 1)
  }
  
  return (
    <Card className="my-5">
      <CardHeader className="justify-between">
        <Link href={`/profil/${post.authorId}`} className="flex gap-3">
          <Avatar showFallback className={"z-0"} size="md" src={post.author.image ?? undefined}/>
          <div className="flex items-center justify-start">
            <h4 className="text-small font-semibold leading-none text-default-600">{post.author.name}</h4>
          </div>
        </Link>
        {data && data.user.userId !== post.author.id && displayFollow && (
          <FollowButton followed={post.author.following.length>0} followerId={data?.user.userId} followingId={post.author.id}/>
        )
        }
      
      </CardHeader>
      <Divider className={""}/>
      <CardBody className="p-0">
        {
          post.content && (
            <p className="p-4 text-default-900">
              {post.content}
            </p>
          )
        }
        
        {post.media.length > 0 && (
          <Image
            src={post.media[0].url ?? undefined}
            onError={() => setErrorLoadingImage(true)}
            alt={"image post"}
            className={"mt-5 rounded-none"}
            width={1000}
            classNames={{wrapper: "min-h-72 rounded-none", img: "mt-0"}}
          />
        )}
        
        {errorLoadingImage && (
          <p className="p-4 text-small text-center text-default-500">
            Error loading image
          </p>
        )}
        
      </CardBody>
      <Divider className={""}/>
      <CardFooter className="p-4 flex-col items-start">
        <div className="flex gap-3 items-center">
          <div className="flex gap-2">
            <p className="font-semibold text-small">{likeCount}</p>
            <button onClick={() => handleLike()}>
              <ThumbUpIcon className={isLiked ? "w-5 fill-primary" : "w-5 fill-default-900"}/>
            </button>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold text-small">{dislikeCount}</p>
            <button onClick={() => handleDislike()}>
              <ThumbDownIcon className={isDisliked ? "w-5 fill-danger" : "w-5 fill-default-900"}/>
            </button>
          </div>
          <button onClick={() => setCommentOpen(!commentOpen)} className={"ml-2 flex gap-1 text-small text-default-500 underline"}>
            {commentOpen ? (
              <p>Hide</p>
            ): (
              <p className="">
                {post._count.comments} comment{post._count.comments > 1 ? "s" : ""}
              </p>
            )}
          
          </button>
        </div>
        {commentOpen && (
          <CommentSection
            post={post}
          />
        )
        }
      </CardFooter>
    </Card>
  )
}