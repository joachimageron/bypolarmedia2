import Link from "next/link";
import HomeIcon from "./icons/HomeIcon";
import SearchIcon from "./icons/SearchIcon";
import {serverSession} from "@/utils/auth";
import UserImage from "@/app/components/UserImage";
import PostModal from "@/app/components/PostModal";

export default async function NavigationBar() {
  const session = await serverSession();
  
  return (
    <nav className={"fixed bottom-0 left-0 w-full h-12 flex justify-center gap-10 items-center bg-primary"}>
      <Link href={"/"} className={"w-7"}>
          <HomeIcon />
      </Link>
      <Link href={"search"} className={"w-7"}>
          <SearchIcon />
      </Link>
      <PostModal/>
      {session &&
         <Link href={`/profil/${session.user.userId}`}>
            <UserImage userImageUrl={session.user.image ?? ""} className={"rounded-full w-7"}/>
         </Link>
      }
    </nav>
  )
}