'use client'
import {Card, CardHeader, CardBody, CardFooter, Avatar, Divider, Image, useDisclosure} from "@nextui-org/react";
import {useState} from "react";
import {PostByUser} from "@/utils/types/data";
import HeartIcon from "@/app/components/icons/HeartIcon";
import ThumbDownIcon from "@/app/components/icons/ThumbDownIcon";
import {dislikePost, likeOrDislike} from "@/utils/data";
import PostModal from "@/app/components/posts/PostModal";
import FollowButton from "@/app/components/FollowButton";

export default function PostCard({post, displayFollow}: Readonly<{ post: PostByUser, displayFollow: boolean }>) {
  
  const [isLiked, setIsLiked] = useState(!!post.likes.find(like => like.userId === post.author.id));
  const [likeCount, setLikeCount] = useState(post.likes.length);
  
  const [isDisliked, setIsDisliked] = useState(false);
  const [dislikeCount, setDislikeCount] = useState(post.dislikes.length);
  
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const handleLike = async () => {
    const liked = await likeOrDislike(post.author.id, post.id)
    setIsLiked(!!liked)
    if (liked) setLikeCount(likeCount + 1)
    else setLikeCount(likeCount - 1)
    console.log("is liked", !!liked)
  }
  
  const handleDislike = async () => {
    const disliked = await dislikePost(post.author.id, post.id)
    setIsDisliked(!!disliked)
    if (disliked) setDislikeCount(dislikeCount + 1)
    else setDislikeCount(dislikeCount - 1)
    console.log("is disliked", !!disliked)
  }
  
  return (
    <Card className="my-5">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar className={"z-0"} size="md" src={post.author.image ?? undefined}/>
          <div className="flex items-center justify-start">
            <h4 className="text-small font-semibold leading-none text-default-600">{post.author.name}</h4>
          </div>
        </div>
        {displayFollow && (
          <FollowButton/>
        )
        }
      
      </CardHeader>
      <Divider className={""}/>
      <CardBody className="">
        <p>
          {post.content}
        </p>
        <Image
          src={post.media[0].url}
          fallbackSrc={"https://agriallier.fr/wp-content/uploads/2018/09/image-drole-pour-fond-d-e%CC%81cran-vache-et-homme-fond-d-e%CC%81cran-ordinateur-fond-d-e%CC%81cran-drole-image.jpg"}
          alt={"image post"}
          className={"mt-5"}
          width={1000}
          classNames={{wrapper: "min-h-72"}}
        />
      </CardBody>
      <Divider className={""}/>
      <CardFooter className="flex-col items-start gap-2">
        <div className="flex gap-3">
          <div className="flex gap-2">
            <p className="font-semibold text-small">{likeCount}</p>
            <button onClick={() => handleLike()}>
              <HeartIcon className={isLiked ? "w-5 fill-danger text-danger" : "w-5 fill-default-900 text-default-900"}/>
            </button>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold text-small">{dislikeCount}</p>
            <button onClick={() => handleDislike()}>
              <ThumbDownIcon className={isDisliked ? "w-5 fill-primary" : "w-5 fill-default-900"}/>
            </button>
          </div>
        </div>
        <div className="">
          <button onClick={()=> onOpen()} className={"flex gap-1 text-small text-default-500 underline"}>
            <p className="">{post._count.comments} comments</p>
          </button>
          <PostModal isOpen={isOpen} onOpenChange={onOpenChange} post={post} displayFollow={true}/>
        </div>
      </CardFooter>
    </Card>
  )
}