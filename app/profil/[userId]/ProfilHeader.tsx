"use client";

import {Avatar, Image} from "@heroui/react";
import EditProfilButton from "@/app/profil/[userId]/EditProfilButton";
import {useSession} from "next-auth/react";
import {useState} from "react";
import {UserById} from "@/utils/types/data";
import ProfilHeaderFollowButton from "@/app/profil/[userId]/FollowButton";
import ShowFollowButton from "@/app/profil/[userId]/ShowFollowButton";

type ProfilHeaderProps = {
  userInfo: UserById
}

export default function ProfilHeader({userInfo}: Readonly<ProfilHeaderProps>) {
  const {data: session} = useSession();
  
  const [name] = useState(userInfo?.name ?? undefined);
  const [description, setDescription] = useState<string | undefined>(userInfo?.description ?? undefined);
  const [imageUrl, setImageUrl] = useState(userInfo?.image ?? undefined);
  const [backgroundUrl, setBackgroundUrl] = useState<string | undefined>(userInfo?.bgImage ?? undefined);
  
  return (
    <section className={"mt-5"}>
      {!backgroundUrl && <div className={"pt-24"}/>}
      <Image isBlurred src={backgroundUrl} alt={"background image of the user"} className={"-z-10"} />
      <div className={"p-5"}>
        <div className={"flex justify-between items-end -mt-14"}>
          <Avatar showFallback className={"w-28 h-28"} src={imageUrl}/>
          
          {session?.user.userId === userInfo?.id &&
             <EditProfilButton
                description={description}
                imageUrl={imageUrl}
                backgroundUrl={backgroundUrl}
                setDescription={setDescription}
                setImageUrl={setImageUrl}
                setBackgroundUrl={setBackgroundUrl}
             />
          }
          {session && session?.user.userId !== userInfo?.id &&
             <ProfilHeaderFollowButton
                followed={userInfo.following.length > 0}
                followerId={session.user.userId}
                followingId={userInfo.id}
             />
          }
        </div>
        <h1 className={"text-xl font-bold mt-5"}>{name}</h1>
        <p>{description}</p>
        <div className={"flex justify-start gap-5 mt-5"}>
          <ShowFollowButton listType={"followers"} userInfo={userInfo}>
            <div className={"flex gap-2"}>
              <p className={"font-bold"}>{userInfo?.followers.length}</p>
              <p>followers</p>
            </div>
          </ShowFollowButton>
          <ShowFollowButton listType={"following"} userInfo={userInfo}>
            <div className={"flex gap-2"}>
              <p className={"font-bold"}>{userInfo?.following.length}</p>
              <p>following</p>
            </div>
          </ShowFollowButton>
        </div>
      </div>
    </section>
  );
}

