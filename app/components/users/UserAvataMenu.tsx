"use client";

import { Listbox, ListboxItem, Avatar, Tooltip, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { signOut, useSession } from "next-auth/react";
import { Key, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/components/providers/UserProvider";

export default function UserAvatarMenu() {
  const { user } = useUser();
  const { data: session } = useSession();
  const router = useRouter();
  const [size, setSize] = useState<number | undefined>(undefined);

  const userId = user?.id ?? session?.user?.userId;
  const userImage = user?.image ?? session?.user?.image;

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
        if (userId) router.push("/profil/" + userId);
        break;
      case "signout":
        signOut();
        break;
    }
  }
  if (size && size > 640) {
    return (
      <Link href={`/profil/${userId}`} className={"w-7"}>
        {(user || session?.user) &&
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
            <Avatar showFallback className={"hover:cursor-pointer w-7 h-7"} src={userImage ?? undefined} />
          </Tooltip>
        }
      </Link>
    )
  } else {
    return (
      <Popover>
        {(user || session?.user) ?
          <PopoverTrigger>
            <Avatar showFallback className={"hover:cursor-pointer w-7 h-7"} src={userImage ?? undefined} />
          </PopoverTrigger>
          :
          <Avatar showFallback className={"hover:cursor-pointer w-7 h-7"} />
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