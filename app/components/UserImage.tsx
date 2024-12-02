"use client";
import {Image} from "@nextui-org/react";


export default function UserImage({userImageUrl, className}: Readonly<{ userImageUrl: string, className: string}>) {
  return (
    <Image className={className} src={userImageUrl} alt={"profile picture"}/>
  )
  
}