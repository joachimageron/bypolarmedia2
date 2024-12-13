import {CommentByPost} from "@/utils/types/data";
import {Avatar} from "@nextui-org/react";
import Link from "next/link";
import HeartIcon from "@/app/components/icons/HeartIcon";
import ThumbDownIcon from "@/app/components/icons/ThumbDownIcon";
import {useState} from "react";
import {dislikeOrUndislikeComment, likeOrDislikeComment} from "@/utils/data";


export default function Comment({comment}: Readonly<{ comment: CommentByPost }>) {
  const [isLiked, setIsLiked] = useState(!!comment.likes.find(like => like.userId === comment.author.id));
  const [likeCount, setLikeCount] = useState(comment.likes.length);
  
  const [isDisliked, setIsDisliked] = useState(!!comment.dislikes.find(dislike => dislike.userId === comment.author.id));
  const [dislikeCount, setDislikeCount] = useState(comment.dislikes.length);
  
  const handleLike = async () => {
    const liked = await likeOrDislikeComment(comment.author.id, comment.id)
    setIsLiked(!!liked)
    if (liked) setLikeCount(likeCount + 1)
    else setLikeCount(likeCount - 1)
  }
  
  const handleDislike = async () => {
    setIsDisliked(!isDisliked)
    const disliked = await dislikeOrUndislikeComment(comment.author.id, comment.id)
    if (disliked) setDislikeCount(dislikeCount + 1)
    else setDislikeCount(dislikeCount - 1)
  }
  
  return (
    <div className={"mt-2 bg-default-100 py-3 px-4 rounded-medium w-full"}>
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
          <div className="flex gap-3">
            <div className="flex gap-2 content-center">
              <p className="font-semibold text-small">{likeCount}</p>
              <button onClick={() => handleLike()}>
                <HeartIcon
                  className={isLiked ? "w-4 fill-danger text-danger" : "w-4 fill-default-500 text-default-500"}/>
              </button>
            </div>
            <div className="flex gap-2 content-center">
              <p className="font-semibold text-small">{dislikeCount}</p>
              <button onClick={() => handleDislike()}>
                <ThumbDownIcon className={isDisliked ? "w-4 fill-primary" : "w-4 fill-default-500"}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}