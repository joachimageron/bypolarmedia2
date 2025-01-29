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
  Image
} from "@heroui/react";
import PlusIcon from "@/app/components/icons/PlusIcon";
import {createPost} from "@/utils/data/post";
import {addMediaToPost} from "@/utils/data/media"
import {useRef, useState} from "react";
import {useSession} from "next-auth/react";
import {useNotificationModal} from "@/app/components/providers/NotificationProvider";
import UploadButton from "@/app/components/UploadButton";
import {Icon} from "@iconify/react";

export default function CreatePostButton() {
  const {data: session} = useSession();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [content, setContent] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined>();
  const [isPosting, setIsPosting] = useState(false);
  
  const selectedImage = useRef<string | undefined>()
  
  const notification = useNotificationModal();
  
  const handlePost = async () => {
    // Post
    if (content === "" && selectedImageUrl === "") {
      notification.showNotification("error", "Invalid post", "Please fill one of the fields");
      return;
    }
    setIsPosting(true);
    if (!session) return;
    const postCreated = await createPost({
      content,
    })
    if (!postCreated) {
      setIsPosting(false);
      notification.showNotification("error", "Post creation failed", "An error occurred while creating your post");
      return
    }
    
    if (selectedImageUrl) {
      const mediaCreated = await addMediaToPost({
        postId: postCreated.id,
        type: "image",
        imageData: selectedImage.current,
      });
      if (!mediaCreated) {
        return;
      }
    }
    onOpenChange()
    setIsPosting(false);
    notification.showNotification("success", "Post created", "Your post will appear on the feed soon");
    
  }
  
  const handleSelectImage = (file: File) => {
    setSelectedImageUrl(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      selectedImage.current = reader.result as string;
    }
  }
  
  const handleRemoveImage = () => {
    setSelectedImageUrl(undefined);
    selectedImage.current = undefined;
  }
  
  return (
    <div className={"flex justify-center items-center"}>
      <button className={""} onClick={onOpen}><PlusIcon className={"fill-zinc-50"}/></button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
                {!selectedImageUrl && (
                  <UploadButton onFileSelect={handleSelectImage} className={'mx-auto flex justify-center items-center gap-3 mt-4 hover:underline'}>
                    <Icon icon="mdi:image-add" width="24" height="24" className={''}/>
                    Add an image
                  </UploadButton>
                )}
                {selectedImageUrl && (
                  <div className={"relative group"}>
                    <Image src={selectedImageUrl} alt={"Selected image"} className={"w-full"}/>
                    <div className={"absolute z-20 top-4 right-4 flex flex-row gap-3"}>
                      <UploadButton
                        className={'h-fit opacity-0 group-hover:opacity-100'}
                        onFileSelect={handleSelectImage}
                      >
                        <Icon
                          icon="material-symbols:edit-rounded"
                          width="35" height="35"
                          className={'z-50 rounded-full shadow p-2 bg-default-100'}
                        />
                      </UploadButton>
                      <button onClick={handleRemoveImage} className={'h-fit opacity-0 group-hover:opacity-100'}>
                        <Icon icon="fluent-emoji-high-contrast:cross-mark"
                              width="34" height="34"
                              className={'z-50 rounded-full shadow p-2 bg-default-100'}
                        />
                      </button>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
                <Button isLoading={isPosting} color="primary" onPress={() => handlePost()}>
                  Post
                </Button>
              </ModalFooter>
            </>
          )
          }
        </ModalContent>
      </Modal>
    </div>
  )
    ;
}