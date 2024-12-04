import Link from "next/link";
import HomeIcon from "./icons/HomeIcon";
import SearchIcon from "./icons/SearchIcon";
import CreatePostButton from "@/app/components/CreatePostButton";
import UserAvatarMenu from "@/app/components/UserAvataMenu";
import DarkModeSwitch from "@/app/components/DarkModeSwitch";


export default async function NavigationBar() {
  
  return (
    <nav className={"fixed bottom-0 left-0 w-full h-12 bg-primary flex justify-center items-center z-30"}>
      <div className={"flex justify-center gap-10 items-center"}>
        <Link href={"/"} className={"w-7"}>
          <HomeIcon className={"fill-zinc-50"}/>
        </Link>
        <Link href={"search"} className={"w-7"}>
          <SearchIcon className={"fill-zinc-50"}/>
        </Link>
        <div className={"w-7"}>
          <CreatePostButton/>
        </div>
        <div className={"w-7"}>
          <UserAvatarMenu/>
        </div>
      </div>
      <div className={"absolute right-0"}>
        <DarkModeSwitch/>
      </div>
    </nav>
  )
}