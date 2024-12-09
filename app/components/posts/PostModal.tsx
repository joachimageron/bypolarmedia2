import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody, Avatar, Image, Input, Button,
} from "@nextui-org/react";
import {CommentsByPost, PostByUser} from "@/utils/types/data";
import {addComment, getCommentsByPost} from "@/utils/data";
import FollowButton from "@/app/components/FollowButton";
import {useEffect, useState} from "react";
import {useNotificationModal} from "@/app/components/providers/NotificationProvider";
import {useSession} from "next-auth/react";

export default function PostModal({isOpen, onOpenChange, post, displayFollow}: Readonly<{
  isOpen: boolean,
  onOpenChange: () => void,
  post: PostByUser,
  displayFollow: boolean
}>) {
  const {data} = useSession();
  const notification = useNotificationModal();
  const [commentContent, setCommentContent] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [comments, setComments] = useState<CommentsByPost | null>(null);
  
  useEffect(() => {
    const getComments = async () => {
      const comments = await getCommentsByPost(post.id);
      setComments(comments);
      console.log("Comments", comments)
    }
    getComments()
  },[])
  
  
  const handleComment = async () => {
    setCommentLoading(true);
    const commented = await addComment({
      postId: post.id,
      authorId: data?.user.userId ?? "",
      content: commentContent,
    });
    if (!commented) {
      notification.showNotification("error", "Error", "Error adding comment")
    }
    else {
      setCommentContent("")
      setComments([...comments ?? [], commented])
    }
    setCommentLoading(false);
  }
  
  return (
    <Modal size={"5xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="gap-3 items-center">
              <Avatar className={"z-0"} size="md" src={post.author.image ?? undefined}/>
              <div className="flex items-center justify-start">
                <h4 className="text-small font-semibold leading-none text-default-600">{post.author.name}</h4>
              </div>
              {displayFollow && (
                <FollowButton/>
              )
              }
            </ModalHeader>
            <ModalBody className={"flex-row"}>
              <div className={"w-1/2"}>
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
              </div>
              <div>
                <h4 className="text-small font-semibold leading-none text-default-600">Comments</h4>
                <ul>
                  {comments?.map((comment) => (
                    <li key={comment.id}>
                      <Avatar size="sm" src={comment.author.image ?? undefined}/>
                      <p>{comment.content}</p>
                    </li>
                  ))}
                </ul>
                <div className={"flex gap-3"}>
                  <Input
                    value={commentContent}
                    onValueChange={setCommentContent}
                    label={"Comment"}
                    className={"w-full h-12"}
                  />
                  <Button isLoading={commentLoading} onPress={()=>handleComment()} className={"h-12"}>Comment</Button>
                </div>
              </div>
            </ModalBody>
          
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
