"use client";
import {UserById} from "@/utils/types/data";
import {Button, Image} from "@nextui-org/react";



export default function ProfilHeader({userInfo}: Readonly<UserById>) {
  return (
    <section className={""}>
      <Image isBlurred className={""} src={userInfo?.bgImage ?? undefined} alt={"background image of the user"}/>
      <div className={"p-5"}>
        <div className={"flex justify-between items-end -mt-14"}>
          <Image className={"rounded-full w-28"} src={userInfo?.image ?? undefined} alt={"profile picture"}/>
          <Button color={"primary"}>Edite profil</Button>
        </div>
        <h1 className={"text-xl font-bold mt-5"}>{userInfo?.name}</h1>
        <p>{userInfo?.description}</p>
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