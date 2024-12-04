"use client";

import {Popover, PopoverContent, PopoverTrigger, Listbox, ListboxItem, Avatar} from "@nextui-org/react";
import {signOut, useSession} from "next-auth/react";
import {Key, useState} from "react";
import {useRouter} from "next/navigation";

export default function UserAvatarMenu() {
  const {data: session} = useSession();
  const router = useRouter();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  
  const handleAction = (key: Key) => {
    switch (key) {
      case "profil":
        router.push("/profil/" + session?.user.userId);
        setIsPopoverOpen(false);
        break;
      case "signout":
        setIsPopoverOpen(false);
        signOut();
        break;
    }
  }
  
  return (
    <Popover isOpen={isPopoverOpen} onOpenChange={open => setIsPopoverOpen(open)} placement="top">
      <PopoverTrigger>
        <Avatar className={"hover:cursor-pointer w-7 h-7"} src={session?.user.image ?? undefined}/>
      </PopoverTrigger>
      <PopoverContent>
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
      </PopoverContent>
    </Popover>
  )
}