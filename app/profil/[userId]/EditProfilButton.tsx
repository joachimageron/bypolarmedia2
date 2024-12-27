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
  Input, Form
} from "@nextui-org/react";
import {getUserById, updateUser} from "@/utils/data";
import {FormEvent, useEffect, useMemo, useState} from "react";
import {useSession} from "next-auth/react";
import {useNotificationModal} from "@/app/components/providers/NotificationProvider";

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
  
  const [isUpdating, setIsUpdating] = useState(false);
  
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
    const image = formData.get("image");
    const bgImage = formData.get("bgImage");
    
    const data = {
      description: description ? String(description) : undefined,
      image: image ? String(image) : undefined,
      bgImage: bgImage ? String(bgImage) : undefined,
    }
    console.log("data :", data);
    setIsUpdating(true);
    
    const res = await updateUser(session?.user.userId, data);

    if (res) {
      setImageUrl(res.image ?? undefined);
      setDescription(res.description ?? undefined);
      setBackgroundUrl(res.bgImage ?? undefined);
      onOpenChange()
      setIsUpdating(false);
      notification.showNotification("success", "Post created", "Your post has been created successfully");
    }
    else {
      setIsUpdating(false);
      notification.showNotification("error", "Error", "An error occured while creating the post");
    }
    
  }
  
  const testUrl = () => {
    if (imageUrl === "") return false;
    try {
      new URL(imageUrl ?? "");
      return false;
    } catch (e) {
      console.error(e);
      return true;
    }
  }
  const isInvalidUrl = useMemo(() => {
    return testUrl();
  }, [imageUrl]);
  
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
                  <Textarea
                    name={"description"}
                    variant="bordered"
                    label={"Description"}
                    placeholder="A wonderfull description"
                    className={"w-full"}
                    defaultValue={description}
                  />
                  <Input
                    name={"image"}
                    variant="bordered"
                    label={"Profil picture Url"}
                    placeholder="https://example.com/image.jpg"
                    className={"w-full"}
                    defaultValue={imageUrl}
                    isInvalid={isInvalidUrl}
                    color={isInvalidUrl ? "danger" : "default"}
                    errorMessage={isInvalidUrl ? "Invalid URL" : ""}
                  />
                  <Input
                    name={"bgImage"}
                    variant="bordered"
                    label={"Background picture Url"}
                    placeholder="https://example.com/image.jpg"
                    className={"w-full"}
                    defaultValue={backgroundUrl}
                    isInvalid={isInvalidUrl}
                    color={isInvalidUrl ? "danger" : "default"}
                    errorMessage={isInvalidUrl ? "Invalid URL" : ""}
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