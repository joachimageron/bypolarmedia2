'use client';
  import {getUserById, GetUserByIdReturnType, userExists} from "@/utils/data/user";
  import {notFound} from "next/navigation";
  import ProfilHeader from "@/app/profil/[userId]/ProfilHeader";
  import {Divider} from "@heroui/react";
  import ProfilPostContainer from "@/app/profil/[userId]/ProfilPostContainer";
  import {useUser} from "@/app/components/providers/UserProvider";
  import {useState, useEffect, use} from "react";
  
  type Params = Promise<{ [key: string]: string | string[] | undefined }>
  
  export default function Profil({params}: Readonly<{ params: Params }>) {
    const [userInfo, setUserInfo] = useState<GetUserByIdReturnType | null>(null);
    const {user} = useUser();
    const userId = use(params).userId as string;
  
    useEffect(() => {
      if (!userId) {
        notFound();
      }
  
      if (userId !== user?.id) {
        userExists(userId).then(userExist => {
          if (!userExist) {
            notFound();
          }
          getUserById(userId).then(u => setUserInfo(u));
        });
      } else {
        setUserInfo(user);
      }
    }, [userId, user]);
  
    return (
      <main className={"mb-20 overflow-y-scroll"}>
        {userInfo && <ProfilHeader userInfo={userInfo}/>}
        <Divider className={"my-2 m-auto max-w-xl"}/>
        <h2 className={"text-center font-bold m-auto max-w-xl"}>Posts</h2>
        <Divider className="my-2 m-auto max-w-xl"/>
        {userInfo && <ProfilPostContainer userInfo={userInfo}/>}
      </main>
    );
  }