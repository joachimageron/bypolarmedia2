import { getUserById } from "@/utils/data/user";
import { notFound } from "next/navigation";
import ProfilHeader from "@/app/profil/[userId]/ProfilHeader";
import { Divider } from "@heroui/react";
import ProfilPostContainer from "@/app/profil/[userId]/ProfilPostContainer";

type Params = Promise<{ userId: string }>;

export default async function Profil({ params }: { params: Params }) {
  const { userId } = await params;

  if (!userId) {
    notFound();
  }

  const userInfo = await getUserById(userId);

  if (!userInfo) {
    notFound();
  }

  return (
    <main className={"mb-20 overflow-y-scroll"}>
      <ProfilHeader userInfo={userInfo} />
      <Divider className={"my-2 m-auto max-w-xl"} />
      <h2 className={"text-center font-bold m-auto max-w-xl"}>Posts</h2>
      <Divider className="my-2 m-auto max-w-xl" />
      <ProfilPostContainer userInfo={userInfo} />
    </main>
  );
}