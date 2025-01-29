"use client";

import {Avatar, Image} from "@heroui/react";
import EditProfilButton from "@/app/profil/[userId]/EditProfilButton";
import {useSession} from "next-auth/react";
import ProfilHeaderFollowButton from "@/app/components/users/FollowButton";
import ShowFollowButton from "@/app/profil/[userId]/ShowFollowButton";
import {GetUserByIdReturnType} from "@/utils/data/user";

type ProfilHeaderProps = {
  userInfo: GetUserByIdReturnType
}

export default function ProfilHeader({userInfo}: Readonly<ProfilHeaderProps>) {
  const {data: session} = useSession();
  
  return (
    <section className={"sm:mt-5"}>
      {!userInfo?.bgImage && <div className={"pt-24"}/>}
      <Image isBlurred src={userInfo?.bgImage ?? undefined} alt={"background image of the user"} className={"-z-10 rounded-none sm:rounded-large"}/>
      <div className={"p-5"}>
        <div className={"flex justify-between items-end -mt-14"}>
          <Avatar showFallback className={"w-28 h-28"} src={userInfo?.image ?? undefined}/>
          
          {session?.user.userId === userInfo?.id &&
             <EditProfilButton/>
          }
          {session?.user.userId !== userInfo?.id && userInfo &&
             <ProfilHeaderFollowButton
                authorId={userInfo.id}
             />
          }
        </div>
        <h1 className={"text-xl font-bold mt-5"}>{userInfo?.name}</h1>
        <p>{userInfo?.description}</p>
        <div className={"flex justify-start gap-5 mt-5"}>
          {userInfo &&
             <>
                <ShowFollowButton listType={"followers"} userInfo={userInfo}>
                   <div className={"flex gap-2"}>
                      <p className={"font-bold"}>{userInfo?.following.length}</p>
                      <p>followers</p>
                   </div>
                </ShowFollowButton>
                <ShowFollowButton listType={"following"} userInfo={userInfo}>
                   <div className={"flex gap-2"}>
                      <p className={"font-bold"}>{userInfo?.followers.length}</p>
                      <p>following</p>
                   </div>
                </ShowFollowButton>
             </>
          }
        </div>
      </div>
    </section>
  );
}

