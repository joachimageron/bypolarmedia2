"use client";
import {UserById} from "@/utils/types/data";
import {Image} from "@nextui-org/react";
import EditProfilButton from "@/app/profil/[userId]/EditProfilButton";
import {useSession} from "next-auth/react";
import {useState} from "react";


export default function ProfilHeader({userInfo}: Readonly<UserById>) {
  const {data: session} = useSession();
  
  const [name] = useState(userInfo?.name ?? undefined);
  const [description, setDescription] = useState<string | undefined>(userInfo?.description ?? undefined);
  const [imageUrl, setImageUrl] = useState(userInfo?.image ?? undefined);
  const [backgroundUrl, setBackgroundUrl] = useState<string | undefined>(userInfo?.bgImage ?? undefined);
  
  console.log(userInfo)
  return (
    <section className={"mt-5"}>
      {backgroundUrl === "" && <div className={"mt-10"}/>}
      <Image isBlurred  src={backgroundUrl !== "" ? backgroundUrl : undefined} alt={"background image of the user"}/>
      <div className={"p-5"}>
        <div className={"flex justify-between items-end -mt-14"}>
          <Image className={"rounded-full w-28"} src={imageUrl} alt={"profile picture"}/>
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
        </div>
        <h1 className={"text-xl font-bold mt-5"}>{name}</h1>
        <p>{description}</p>
        <div className={"flex justify-start gap-5 mt-5"}>
          <div className={"flex gap-2"}>
            <p className={"font-bold"}>{userInfo?.followers.length}</p>
            <p>followers</p>
          </div>
          <div className={"flex gap-2"}>
            <p className={"font-bold"}>{userInfo?.following.length}</p>
            <p>following</p>
          </div>
        </div>
      </div>
    </section>
  );
}