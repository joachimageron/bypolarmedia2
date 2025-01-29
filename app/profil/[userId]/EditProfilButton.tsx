"use client";
import {
  Avatar,
  Button,
  Form,
  Image, Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure
} from "@heroui/react";
import {updateUser} from "@/utils/data/user";
import {FormEvent, useRef, useState} from "react";
import {useSession} from "next-auth/react";
import {useNotificationModal} from "@/app/components/providers/NotificationProvider";
import UploadButton from "@/app/components/UploadButton";
import {Icon} from "@iconify/react";
import {useUser} from "@/app/components/providers/UserProvider";


export default function EditProfilButton() {
  
  const {data: session} = useSession();
  const {user, setUser} = useUser();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  const [profileUrl, setProfileUrl] = useState<string | undefined>(user?.image ?? undefined);
  const [backgroundUrl, setBackgroundUrl] = useState<string | undefined>(user?.bgImage ?? undefined);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const selectedProfileImage = useRef<string | undefined>();
  const selectedBackgroundImage = useRef<string | undefined>();
  
  const notification = useNotificationModal();
  
  
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!session?.user.userId) return;
    // Update profil
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get("name");
    const description = formData.get("description");
    
    const data = {
      name: name ? String(name) : undefined,
      description: description ? String(description) : undefined,
      image: selectedProfileImage.current,
      bgImage: selectedBackgroundImage.current,
    }
    setIsUpdating(true);
    
    const res = await updateUser(session?.user.userId, data);
    
    if (res) {
      setUser(prevUser => ({
        ...prevUser,
        ...res,
        following: prevUser!.following,
        followers: prevUser!.followers,
      }));
      onOpenChange()
      setIsUpdating(false);
      notification.showNotification("success", "Profil updated", "Your profil has been updated successfully");
    } else {
      setIsUpdating(false);
      notification.showNotification("error", "Error", "An error occured while updating your profil");
    }
  }
  
  const handleProfileImageSelect = (file: File) => {
    setProfileUrl(URL.createObjectURL(file));
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      selectedProfileImage.current = reader.result as string;
    }
  }
  
  const handleBackgroundImageSelect = (file: File) => {
    setBackgroundUrl(URL.createObjectURL(file));
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      selectedBackgroundImage.current = reader.result as string;
    }
  }
  
  const handleRemoveImage = (e: FormEvent) => {
    e.preventDefault();
    setProfileUrl(undefined);
    selectedBackgroundImage.current = "dell";
    setBackgroundUrl(undefined);
    setBackgroundUrl(undefined);
  }
  
  return (
    <div className={"flex justify-center items-center"}>
      <Button color={"primary"} onPress={onOpen}>Edit Profil</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit profil</ModalHeader>
              <Form onSubmit={handleUpdate} validationBehavior={"native"}>
                <ModalBody className={"w-full"}>
                  {!backgroundUrl && (
                    <UploadButton
                      onFileSelect={handleBackgroundImageSelect}
                      className={'mx-auto flex justify-center items-center gap-3 mt-4 mb-12 hover:underline'}
                    >
                      <Icon icon="mdi:image-add" width="24" height="24" className={''}/>
                      Add a background image
                    </UploadButton>
                  )}
                  {backgroundUrl && (
                    <div className={"relative group"}>
                      <Image isBlurred src={backgroundUrl ?? backgroundUrl} alt={"background image of the user"}
                             className={""}/>
                      <div className={'h-fit absolute top-4 right-4 z-20 flex flex-row gap-3'}>
                        <UploadButton className={' opacity-0 group-hover:opacity-100'}
                                      onFileSelect={handleBackgroundImageSelect}>
                          <Icon icon="material-symbols:edit-rounded" width="35" height="35"
                                className={'z-20 rounded-full shadow p-2 bg-default-100'}/>
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
                  <div className={"flex justify-center items-cente relative w-fit -mt-12 ml-3 z-30"}>
                    <Avatar showFallback className={"w-28 h-28"} src={profileUrl}/>
                    <UploadButton onFileSelect={handleProfileImageSelect}
                                  className={'absolute w-28 h-28 left-0 opacity-0 hover:opacity-100'}>
                      <Icon icon="material-symbols:edit-rounded" width="35" height="35"
                            className={'z-20 rounded-full shadow p-2 bg-default-100 mx-auto '}/>
                    </UploadButton>
                  </div>
                  <Input
                    name={"name"}
                    variant="bordered"
                    label={"Name"}
                    defaultValue={user?.name ?? undefined}
                    required
                    className={"w-full mt-3"}/>
                  <Textarea
                    name={"description"}
                    variant="bordered"
                    label={"Description"}
                    placeholder="A wonderfull description"
                    className={"w-full mt-3"}
                    defaultValue={user?.description ?? undefined}
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