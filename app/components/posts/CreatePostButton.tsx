"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
  Input
} from "@nextui-org/react";
import PlusIcon from "@/app/components/icons/PlusIcon";
import {addMediaToPost, createPost} from "@/utils/data";
import {useMemo, useState} from "react";
import {useSession} from "next-auth/react";
import {useNotificationModal} from "@/app/components/providers/NotificationProvider";

export default function CreatePostButton() {
  const {data: session} = useSession();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  
  const notification = useNotificationModal();
  
  const handlePost = async () => {
    // Post
    if (content === "" && imageUrl === "") {
      notification.showNotification("error", "Invalid post", "Please fill one of the fields");
      return;
    }
    if (testUrl()) {
      notification.showNotification("error", "Invalid URL", "Please enter a valid URL");
      return
    }
    setIsPosting(true);
    if (!session) return;
    const postCreated = await createPost({
      authorId: session.user.userId,
      content,
    })
    if (!postCreated) {
      console.error("Error creating post");
      setIsPosting(false);
      notification.showNotification("error", "Post creation failed", "An error occurred while creating your post");
      return
    }
    
    if (imageUrl){
      const mediaCreated = await addMediaToPost({
        postId: postCreated.id,
        type: "image",
        url: imageUrl,
      });
      if (!mediaCreated) {
        return;
      }
      console.log("Media created", mediaCreated);
    }
    onOpenChange()
    setIsPosting(false);
    notification.showNotification("success", "Post created", "Your post will appear on the feed soon");
    
  }
  
  const testUrl = () => {
    if (imageUrl === "") return false;
    try {
      new URL(imageUrl);
      return false;
    } catch (e) {
      return true;
    }
  }
  
  const isInvalidUrl = useMemo(() => {
    return testUrl();
  }, [imageUrl]);
  
  return (
    <div className={"flex justify-center items-center"}>
      <button className={""} onClick={onOpen}><PlusIcon className={"fill-zinc-50"}/></button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">New publication</ModalHeader>
              <ModalBody>
                <Textarea
                  variant="bordered"
                  label={"Content"}
                  placeholder="You will never gess what..."
                  className={"w-full"}
                  value={content}
                  onValueChange={setContent}
                />
                <Input
                  variant="bordered"
                  label={"Image Url"}
                  placeholder="https://example.com/image.jpg"
                  className={"w-full"}
                  value={imageUrl}
                  onValueChange={setImageUrl}
                  isInvalid={isInvalidUrl}
                  color={isInvalidUrl ? "danger" : "default"}
                  errorMessage={isInvalidUrl ? "Invalid URL" : ""}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
                <Button isLoading={isPosting} color="primary" onPress={()=>handlePost()}>
                  Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}