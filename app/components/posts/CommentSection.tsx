import {
Input, Button, Form, Spinner,
} from "@nextui-org/react";
import {CommentsByPost, PostExtended} from "@/utils/types/data";
import {addComment, getCommentsByPost} from "@/utils/data/comment";
import {FormEvent, useEffect, useState} from "react";
import {useNotificationModal} from "@/app/components/providers/NotificationProvider";
import {useSession} from "next-auth/react";
import Comment from "@/app/components/posts/Comment";

export default function CommentSection({post}: Readonly<{
  post: PostExtended,
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
    }
    getComments()
  }, [post.id])
  
  
  const handleComment = async (e: FormEvent) => {
    e.preventDefault();
    setCommentLoading(true);
    const commented = await addComment({
      postId: post.id,
      authorId: data?.user.userId ?? "",
      content: commentContent,
    });
    if (!commented) {
      notification.showNotification("error", "Error", "Error adding comment")
    } else {
      setCommentContent("")
      setComments([...comments ?? [], commented])
    }
    setCommentLoading(false);
  }
  
  return (
      <div className={"w-full"}>
        
        {/*<h4 className="text-small text-center font-semibold leading-none text-default-500 my-2">Comments</h4>*/}
        <ul className={"overflow-y-scroll max-h-96 mt-5"}>
          {!comments &&
            <div className={"w-full flex flex-col items-center"}>
              <Spinner className={"mt-3"}/>
            </div>
          }
          {comments?.length === 0 ? (
            <div className={"w-full flex flex-col items-center"}>
              <p className={"text-default-500 text-xs mt-1"}>No comments yet</p>
            </div>
          ) : (
            comments?.map((comment) => (
              <li key={comment.id}>
                <Comment comment={comment}/>
              </li>
            ))
          )}
        </ul>
        <Form onSubmit={handleComment}>
          <div className={"flex gap-3 pt-4 w-full"}>
            <Input
              value={commentContent}
              onValueChange={setCommentContent}
              placeholder={"Write a comment"}
            />
            <Button
              color={"primary"}
              isLoading={commentLoading}
              type={"submit"}
              className={""}
            >
              {!commentLoading && "Comment"}
            </Button>
          </div>
        </Form>
      </div>

  );
}
