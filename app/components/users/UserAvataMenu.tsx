"use client";

import {Listbox, ListboxItem, Avatar, Tooltip, Popover, PopoverTrigger, PopoverContent} from "@heroui/react";
import {signOut} from "next-auth/react";
import {Key, useState, useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useUser} from "@/app/components/providers/UserProvider";

export default function UserAvatarMenu() {
  const {user} = useUser();
  const router = useRouter();
  const [size, setSize] = useState<number | undefined>(undefined);
  
  useEffect(() => {
    setSize(window.innerWidth)
    const handleResize = () => {
      setSize(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
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
  if (size && size > 640) {
    return (
      <Link href={`/profil/${user?.id}`} className={"w-7"}>
        {user &&
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
              }
           >
              <Avatar showFallback className={"hover:cursor-pointer w-7 h-7"} src={user?.image ?? undefined}/>
           </Tooltip>
        }
      </Link>
    )
  } else {
    return (
      <Popover>
        {user ?
          <PopoverTrigger>
            <Avatar showFallback className={"hover:cursor-pointer w-7 h-7"} src={user?.image ?? undefined}/>
          </PopoverTrigger>
          :
          <Avatar showFallback className={"hover:cursor-pointer w-7 h-7"}/>
        }
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
}