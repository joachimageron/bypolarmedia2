import Link from "next/link";
import HomeIcon from "./icons/HomeIcon";
import CreatePostButton from "@/app/components/posts/CreatePostButton";
import UserAvatarMenu from "@/app/components/users/UserAvataMenu";
import DarkModeSwitch from "@/app/components/DarkModeSwitch";
import {serverSession} from "@/utils/auth";
import ProfilIcon from "@/app/components/icons/ProfilIcon";
import SearchButton from "@/app/components/SearchButton";


export default async function NavigationBar() {
  const session = await serverSession();
  return (
    <nav className={"fixed bottom-0 left-0 w-full h-12 bg-primary flex justify-center items-center z-30"}>
      <div className={"flex justify-center gap-10 items-center"}>
        {
          session?.user ? (
              <>
                <Link href={"/"} className={"w-7"}>
                  <HomeIcon className={"fill-zinc-50"}/>
                </Link>
                <div className={"w-7"}>
                  <SearchButton/>
                </div>
                <div className={"w-7"}>
                  <CreatePostButton/>
                </div>
                <div className={"w-7"}>
                  <UserAvatarMenu/>
                </div>
              
              </>
            ) :
            (
              <Link href={"/auth/signin"} className={"w-7"}>
              <ProfilIcon className={"fill-zinc-50"}/>
              </Link>
            )
        }
      </div>
      
      <div className={"absolute right-5"}>
        <DarkModeSwitch/>
      </div>
    </nav>
  )
}