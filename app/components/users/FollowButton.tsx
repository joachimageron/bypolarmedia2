import {Button} from "@nextui-org/react";
import {useState} from "react";
import {toggleFollowUser} from "@/utils/data";
import {useSession} from "next-auth/react";

type FollowButtonProps = {
  followed: boolean,
  followingId: string
}

export default function FollowButton({followed , followingId}: Readonly<FollowButtonProps>) {
  const [isFollowed, setIsFollowed] = useState(followed);
  const {data} = useSession()
  
  const handleFollow = async () => {
    if (!data) return
    const followed = await toggleFollowUser(data.user.userId, followingId)
    setIsFollowed(followed)
  }
  
  return (
    <Button
      className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
      color="primary"
      radius="full"
      size="sm"
      variant={isFollowed ? "bordered" : "solid"}
      onPress={() => handleFollow()}
    >
      {isFollowed ? "Unfollow" : "Follow"}
    </Button>
  )
}