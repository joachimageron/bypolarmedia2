"use client";
import {
  Avatar,
  Button,
  Form,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure
} from "@nextui-org/react";
import {getUserById, updateUser} from "@/utils/data/user";
import {FormEvent, useEffect, useRef, useState} from "react";
import {useSession} from "next-auth/react";
import {useNotificationModal} from "@/app/components/providers/NotificationProvider";
import UploadButton from "@/app/components/UploadButton";
import {Icon} from "@iconify/react";

export default function EditProfilButton({
  description,
  imageUrl,
  backgroundUrl,
  setDescription,
  setImageUrl,
  setBackgroundUrl,
}: Readonly<{
  description: string | undefined,
  imageUrl: string | undefined,
  backgroundUrl: string | undefined,
  setDescription: (description: string | undefined) => void,
  setImageUrl: (imageUrl: string | undefined) => void,
  setBackgroundUrl: (backgroundUrl: string | undefined) => void,
}>) {
  const {data: session} = useSession();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  const [selectedProfileUrl, setSelectedProfileUrl] = useState<string | null>(null);
  const [selectedBackgroundUrl, setSelectedBackgroundUrl] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const selectedProfileImage = useRef<string | undefined>();
  const selectedBackgroundImage = useRef<string | undefined>();
  
  const notification = useNotificationModal();
  
  useEffect(() => {
    if (session?.user) {
      setImageUrl(session?.user.image ?? "");
      getUserById(session?.user.userId).then(user => {
        if (user) {
          setDescription(user.description ?? "");
          setBackgroundUrl(user.bgImage ?? undefined);
        }
      });
    }
  }, [session]);
  
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!session?.user.userId) return;
    // Update profil
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const description = formData.get("description");
    
    const data = {
      description: description ? String(description) : undefined,
      image: selectedProfileImage.current,
      bgImage: selectedBackgroundImage.current,
    }
    setIsUpdating(true);
    
    const res = await updateUser(session?.user.userId, data);
    
    if (res) {
      setImageUrl(res.image ?? undefined);
      setDescription(res.description ?? undefined);
      setBackgroundUrl(res.bgImage ?? undefined);
      setSelectedBackgroundUrl(null);
      setSelectedProfileUrl(null);
      onOpenChange()
      setIsUpdating(false);
      notification.showNotification("success", "Post created", "Your post has been created successfully");
    } else {
      setIsUpdating(false);
      notification.showNotification("error", "Error", "An error occured while creating the post");
    }
    
  }
  
  const handleProfileImageSelect = (file: File) => {
    setSelectedProfileUrl(URL.createObjectURL(file));
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      selectedProfileImage.current = reader.result as string;
    }
  }
  
  const handleBackgroundImageSelect = (file: File) => {
    setSelectedBackgroundUrl(URL.createObjectURL(file));
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      selectedBackgroundImage.current = reader.result as string;
    }
  }
  
  return (
    <div className={"flex justify-center items-center"}>
      <Button color={"primary"} onPress={onOpen}>Edit Profil</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit profil</ModalHeader>
              <Form onSubmit={handleUpdate}>
                <ModalBody className={"w-full"}>
                  <div className={"relative"}>
                    <Image isBlurred src={selectedBackgroundUrl ?? backgroundUrl} alt={"background image of the user"} className={""}/>
                    <UploadButton className={'h-fit absolute top-4 right-4 z-20'} onFileSelect={handleBackgroundImageSelect}>
                      <Icon icon="material-symbols:edit-rounded" width="24" height="24" className={'z-20'} />
                    </UploadButton>
                  </div>
                  <div className={"flex justify-center items-center"}>
                    <Avatar showFallback className={"w-28 h-28"} src={selectedProfileUrl ?? imageUrl}/>
                    <UploadButton onFileSelect={handleProfileImageSelect}>
                      <Icon icon="material-symbols:edit-rounded" width="24" height="24" />
                    </UploadButton>
                  </div>
                  <Textarea
                    name={"description"}
                    variant="bordered"
                    label={"Description"}
                    placeholder="A wonderfull description"
                    className={"w-full"}
                    defaultValue={description}
                  />
                </ModalBody>
                <ModalFooter className={"w-full"}>
                  <Button color="danger" onPress={onClose}>
                    Close
                  </Button>
                  <Button isLoading={isUpdating} color="primary" type={"submit"}>
                    Update
                  </Button>
                </ModalFooter>
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}