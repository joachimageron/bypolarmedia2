import {getUserById, userExists} from "@/utils/data";
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
  const userInfo = await getUserById(userId)
  
  
  // console.log(userInfo)
  return (
      <main className={"m-auto max-w-xl bg-amber-950"}>
        <ProfilHeader userInfo={userInfo}/>
        user profil
        {/*{userInfo?.name}*/}
      </main>
  );
}
