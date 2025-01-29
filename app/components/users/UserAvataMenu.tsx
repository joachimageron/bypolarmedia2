"use client";

import {Listbox, ListboxItem, Avatar, Tooltip} from "@heroui/react";
import {signOut} from "next-auth/react";
import {Key} from "react";
import {useRouter} from "next/navigation";
import {useUser} from "@/app/components/providers/UserProvider";

export default function UserAvatarMenu() {
  const {user} = useUser();
  const router = useRouter();
  
  
  const handleAction = (key: Key) => {
    switch (key) {
      case "profil":
        router.push("/profil/" + user?.id);
        break;
      case "signout":
        signOut();
        break;
    }
  }
  
  return (
    <Tooltip
      content={
        <div className="flex flex-col justify-center items-center">
          <Listbox
            aria-label="Actions"
            onAction={(key) => handleAction(key)}
          >
            <ListboxItem key="profil">Profil</ListboxItem>
            <ListboxItem key="signout" className="text-danger" color="danger">
              Sign out
            </ListboxItem>
          </Listbox>
        </div>
      }>
      
      { user &&
        <Avatar showFallback className={"hover:cursor-pointer w-7 h-7"} src={user?.image ?? undefined}/>
      }
    </Tooltip>
  
  
  )
}