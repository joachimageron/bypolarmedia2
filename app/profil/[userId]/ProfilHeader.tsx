"use client";
import {getUserById} from "@/utils/types/data";
import {Button, Image} from "@nextui-org/react";



export default function ProfilHeader({userInfo}: Readonly<getUserById>) {
  return (
    <section>
      <Image src={userInfo?.bgImage ?? ""} alt={"background image of the user"}/>
      <span className={"flex justify-between items-center"}>
        <Image className={"rounded-full w-28"} src={userInfo?.image ?? ""} alt={"profile picture"}/>
        <Button>Edite profil</Button>
      </span>
      <h1 className={"text-xl font-bold"}>{userInfo?.name}</h1>
      <p>{userInfo?.description}</p>
      <span className={"flex justify-start gap-5"}>
        <p>followers: {userInfo?.followers.length}</p>
        <p>following: {userInfo?.following.length}</p>
      </span>
    </section>
  );
}