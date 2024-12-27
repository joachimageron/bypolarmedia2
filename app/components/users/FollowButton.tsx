import {Button} from "@nextui-org/react";
import {useState} from "react";
import {toggleFollowUser} from "@/utils/data";

type FollowButtonProps = {
  followed: boolean,
  followerId: string,
  followingId: string
}

export default function FollowButton({followed , followerId, followingId}: Readonly<FollowButtonProps>) {
  const [isFollowed, setIsFollowed] = useState(followed);
  
  const handleFollow = async () => {
    const followed = await toggleFollowUser(followerId, followingId)
    console.log("followed", followed)
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