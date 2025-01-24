'use client';
import {getUserById, GetUserByIdReturnType, userExists} from "@/utils/data/user";
import {notFound, useSearchParams} from "next/navigation";
import ProfilHeader from "@/app/profil/[userId]/ProfilHeader";
import {Divider} from "@heroui/react";
import ProfilPostContainer from "@/app/profil/[userId]/ProfilPostContainer";
import {useUser} from "@/app/components/providers/UserProvider";
import {useRef} from "react";

export default function Profil() {
  const searchParams = useSearchParams();
  const userInfo = useRef<GetUserByIdReturnType>(null);
  const {user} = useUser();
  const userId = searchParams.get('userId');
  
  
  if (userId && userId !== user?.id) {
    userExists(userId).then(userExist => {
      if (!userExist) notFound()
      getUserById(userId).then(u => userInfo.current = u);
      
    });
  } else {
    userInfo.current = user;
  }
  
  return (
    <main className={"m-auto max-w-xl mb-20"}>
      {userInfo.current && <ProfilHeader userInfo={userInfo.current}/>}
      <Divider className={"my-2"}/>
      <h2 className={"text-center font-bold"}>Posts</h2>
      <Divider className="my-2"/>
      {userInfo.current && <ProfilPostContainer userInfo={userInfo.current}/>}
    </main>
  );
}
