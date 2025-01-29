import {CommentByPost} from "@/utils/types/data";
import {Avatar} from "@heroui/react";
import Link from "next/link";
import ThumbDownIcon from "@/app/components/icons/ThumbDownIcon";
import {useState} from "react";
import {toggleLikeComment} from "@/utils/data/like";
import {toggleDislikeComment} from "@/utils/data/dislike";
import ThumbUpIcon from "@/app/components/icons/ThumbUpIcon";
import {useUser} from "@/app/components/providers/UserProvider";


export default function Comment({comment}: Readonly<{ comment: CommentByPost }>) {
  const {user} = useUser();
  const [isLiked, setIsLiked] = useState(!!comment.likes.find(like => like.userId === user!.id));
  const [likeCount, setLikeCount] = useState(comment.likes.length);
  
  const [isDisliked, setIsDisliked] = useState(!!comment.dislikes.find(dislike => dislike.userId === user!.id));
  const [dislikeCount, setDislikeCount] = useState(comment.dislikes.length);
  
  const handleLike = async () => {
    const liked = await toggleLikeComment(comment.id)
    setIsLiked(!!liked)
    if (liked) setLikeCount(likeCount + 1)
    else setLikeCount(likeCount - 1)
  }
  
  const handleDislike = async () => {
    setIsDisliked(!isDisliked)
    const disliked = await toggleDislikeComment(comment.id)
    if (disliked) setDislikeCount(dislikeCount + 1)
    else setDislikeCount(dislikeCount - 1)
  }
  
  return (
    <div className={"py-2 rounded-medium w-full"}>
      <div className={"flex justify-between gap-3"}>
        <div className={"flex gap-3"}>
          <Link href={comment.author.id} className={"flex gap-3"}>
            <Avatar className={"z-0 w-6 h-6"} src={comment.author.image ?? undefined}/>
          </Link>
          
          <div className={""}>
            <Link href={comment.author.id} className={"inline font-bold"}>
              {comment.author.name + ": "}
            </Link>
            {comment.content}
          </div>
        </div>
        
        <div>
          <div className="flex gap-3 text-default-500">
            <div className="flex gap-2 content-center">
              <p className="font-semibold text-small">{likeCount}</p>
              <button onClick={() => handleLike()}>
                <ThumbUpIcon className={isLiked ? "w-4 fill-primary" : "w-4 fill-default-500"}/>
              </button>
            </div>
            <div className="flex gap-2 content-center">
              <p className="font-semibold text-small">{dislikeCount}</p>
              <button onClick={() => handleDislike()}>
                <ThumbDownIcon className={isDisliked ? "w-4 fill-danger" : "w-4 fill-default-500"}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}