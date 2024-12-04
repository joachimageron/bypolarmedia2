'use client'
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button, Divider} from "@nextui-org/react";
import {useState} from "react";
import {PostByUser} from "@/utils/types/data";
import HeartIcon from "@/app/components/icons/HeartIcon";

export default function PostCard({post, displayFollow}: Readonly<{ post: PostByUser, displayFollow: boolean }>) {
  const [isFollowed, setIsFollowed] = useState(false);
  
  
  return (
    <Card className="my-5">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={post.author.image ?? undefined}/>
          <div className="flex items-center justify-start">
            <h4 className="text-small font-semibold leading-none text-default-600">{post.author.name}</h4>
          </div>
        </div>
        {displayFollow && (
          <Button
            className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
            color="primary"
            radius="full"
            size="sm"
            variant={isFollowed ? "bordered" : "solid"}
            onPress={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        )
        }
      
      </CardHeader>
      <Divider className={""}/>
      <CardBody className=" text-small">
        <p>
          {post.content}
        </p>
      </CardBody>
      <Divider className={""}/>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-small">{post.likes.length}</p>
          <button>
            <HeartIcon className={"w-5 fill-red-500 text-red-500"}/>
          </button>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">97.1K</p>
          <p className="text-default-400 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
  )
}