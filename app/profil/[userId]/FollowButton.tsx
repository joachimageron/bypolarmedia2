import {Button} from "@heroui/react";
import {useState} from "react";
import {toggleFollowUser} from "@/utils/data/follower";

type FollowButtonProps = {
  followed: boolean,
  followerId: string,
  followingId: string
}

export default function FollowButton({followed , followerId, followingId}: Readonly<FollowButtonProps>) {
  const [isFollowed, setIsFollowed] = useState(followed);
  
  const handleFollow = async () => {
    const followed = await toggleFollowUser(followerId, followingId)
    setIsFollowed(followed)
  }
  
  return (
    <Button
      className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
      color="primary"
      variant={isFollowed ? "bordered" : "solid"}
      onPress={() => handleFollow()}
    >
      {isFollowed ? "Unfollow" : "Follow"}
    </Button>
  )
}