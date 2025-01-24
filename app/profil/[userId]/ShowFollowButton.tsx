'use client'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure, Avatar, Divider, Spinner,
} from "@heroui/react";
import {UserById} from "@/utils/types/data";
import {useEffect, useState} from "react";
import {getUsersByIds} from "@/utils/data/user";
import Link from "next/link";
import FollowButton from "@/app/components/users/FollowButton";
import {useSession} from "next-auth/react";
import {generateRandomKey} from "@/utils/utils";

type ModalShowUsersProps = {
  children: React.ReactNode,
  listType: 'followers' | 'following',
  userInfo: UserById
}

export default function ShowFollowButton({children, listType, userInfo}: Readonly<ModalShowUsersProps>) {
  const {data} = useSession();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isLoaded, setIsLoaded] = useState(false);
  const [usersInfos, setUsersInfos] = useState<UserById[]>([]);
  
  const loadFollowers = async () => {
    if (isOpen) {
      if (isLoaded) return;
      
      if (listType === 'followers') {
        const followerIds = userInfo.followers.map(follower => follower.followingId)
        const users = await getUsersByIds(followerIds)
        setUsersInfos(users)
      }
      
      else if (listType === 'following') {
        const followingIds = userInfo.following.map(following => following.followerId)
        const users = await getUsersByIds(followingIds)
        setUsersInfos(users)
      }
      
      setIsLoaded(true);
    }
  }
  
  useEffect(() => {
    loadFollowers();
  }, [isOpen, listType, userInfo])
  
  return (
    <>
      <button onClick={onOpen}>{children}</button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={"inside"}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {listType === 'followers' ? "Followers" : "Following"}
          </ModalHeader>
          
          <ModalBody className={"max-h-[80vh]"}>
            {usersInfos.map(user => (
              <div key={generateRandomKey()}>
                <Divider/>
                <div className={"flex justify-between items-center p-3"}>
                  <Link href={`/profil/${user.id}`} className="flex gap-3">
                    <Avatar showFallback className={"z-0"} size="md" src={user.image ?? undefined}/>
                    <div className="flex items-center justify-start">
                      <h4 className="text-small font-semibold leading-none text-default-600">{user.name}</h4>
                    </div>
                  </Link>
                  {data && data.user.userId !== user.id && (
                    <FollowButton followed={user.following.length > 0} followingId={user.id}/>
                  )
                  }
                </div>
              </div>
            ))}
            
            {!isLoaded && usersInfos.length === 0 && (
              <Spinner/>
            )}
          </ModalBody>
          
        </ModalContent>
      </Modal>
    </>
  )
    ;
}
