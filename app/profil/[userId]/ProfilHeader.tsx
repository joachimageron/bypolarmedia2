"use client";

import {Image} from "@nextui-org/react";
import EditProfilButton from "@/app/profil/[userId]/EditProfilButton";
import {useSession} from "next-auth/react";
import {useState} from "react";
import {UserById} from "@/utils/types/data";
import ProfilHeaderFollowButton from "@/app/profil/[userId]/FollowButton";

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
      {backgroundUrl === "" && <div className={"mt-10"}/>}
      <Image isBlurred  src={backgroundUrl !== "" ? backgroundUrl : undefined} alt={"background image of the user"}/>
      <div className={"p-5"}>
        <div className={"flex justify-between items-end -mt-14"}>
          <Image
            className={"rounded-full h-28"}
            src={imageUrl}
            alt={"profile picture"}
            fallbackSrc={"https://static.vecteezy.com/system/resources/thumbnails/008/846/297/small_2x/cute-boy-avatar-png.png"}
          />
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
               followed={userInfo.following.length>0}
               followerId={session.user.userId}
               followingId={userInfo.id}
            />
          }
        </div>
        <h1 className={"text-xl font-bold mt-5"}>{name}</h1>
        <p>{description}</p>
        <div className={"flex justify-start gap-5 mt-5"}>
          <button className={"flex gap-2"}>
            <p className={"font-bold"}>{userInfo?.followers.length}</p>
            <p>followers</p>
          </button>
          <button className={"flex gap-2"}>
            <p className={"font-bold"}>{userInfo?.following.length}</p>
            <p>following</p>
          </button>
        </div>
      </div>
    </section>
  );
}

