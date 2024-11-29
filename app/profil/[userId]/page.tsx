import {userExists} from "@/utils/data";
import {notFound} from "next/navigation";
import ProfilHeader from "@/app/profil/[userId]/ProfilHeader";

interface ProfilePageProps {
  params: { userId: string }; // TypeScript : définissez le type des paramètres
}

export default async function Profil({params}: Readonly<ProfilePageProps>) {
  // const session = await serverSession() as Session
  const {userId} = await params
  
  let userExist
  if (userId) {
    userExist = await userExists(userId)
    if (!userExist) notFound()
  }
  console.log(userExist)
  
  
  // console.log(userInfo)
  return (
    <>
      <main>
        <ProfilHeader/>
        user profil
        {/*{userInfo?.name}*/}
      </main>
      <p>coucou</p>
    </>
  );
}
