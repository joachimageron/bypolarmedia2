import {Button} from "@heroui/react";
import { useMemo} from "react";
import {toggleFollowUser} from "@/utils/data/follower";
import {useUser} from "@/app/components/providers/UserProvider";

type FollowButtonProps = {
  authorId: string,
  size?: "sm" | "md" | "lg",
  
}

export default function FollowButton({authorId, size}: Readonly<FollowButtonProps>) {
  const {user, setUser} = useUser();
  const isFollowed = useMemo(()=>(!!user?.followers.find(follow => follow.followingId === authorId)),[authorId, user?.followers]);
  
  const handleFollow = async () => {
    const followed = await toggleFollowUser(authorId)
    if (!followed) return
    if (followed === 'deleted') {
      setUser(prevUser => ({
        ...prevUser!,
        followers: prevUser!.followers.filter(follow => follow.followingId !== authorId)
      }))
    } else {
      setUser(prevUser => ({
        ...prevUser!,
        followers: [...prevUser!.followers, followed]
    }))
  }
}
  
  return (
    <Button
      className={size === "sm" ? "rounded-full" : ""}
      color={isFollowed ? "default" : "primary"}
      size={size}
      variant={isFollowed ? "bordered" : "solid"}
      onPress={() => handleFollow()}
    >
      {isFollowed ? "Unfollow" : "Follow"}
    </Button>
  )
}