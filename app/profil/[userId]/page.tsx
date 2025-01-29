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
    console.log('userId', userId);
  
    useEffect(() => {
      if (!userId) {
        notFound();
        return;
      }
  
      if (userId !== user?.id) {
        console.log('not connected user', userId);
  
        userExists(userId).then(userExist => {
          if (!userExist) {
            notFound();
            return;
          }
  
          getUserById(userId).then(u => setUserInfo(u));
        });
      } else {
        console.log('connected user', user);
        setUserInfo(user);
      }
    }, [userId, user]);
  
    return (
      <main className={"m-auto max-w-xl mb-20"}>
        {userInfo && <ProfilHeader userInfo={userInfo}/>}
        <Divider className={"my-2"}/>
        <h2 className={"text-center font-bold"}>Posts</h2>
        <Divider className="my-2"/>
        {userInfo && <ProfilPostContainer userInfo={userInfo}/>}
      </main>
    );
  }