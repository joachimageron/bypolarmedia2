import {serverSession} from "@/utils/auth";
import {permanentRedirect} from "next/navigation";
import {SignInButton, SignOutButton} from "@/app/components/AuthButton";


type Params = Promise<{ [key: string]: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Template({
  searchParams,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
  searchParams: SearchParams;
}>) {
  // Récupérer la session utilisateur
  const session = await serverSession();
  
  // Résoudre les Promises params et searchParams
  const resolvedSearchParams = await searchParams;
  
  if (session?.user && typeof resolvedSearchParams.callbackUrl === "string") {
    const url = new URL(resolvedSearchParams.callbackUrl);
    const path = url.pathname;
    permanentRedirect(path);
  }
  
  // Rendre les enfants si aucune redirection n'a eu lieu
  return (
    <div>
      <h1>Sign in</h1>
      <p>session :</p>
      <p>email :</p>
      <p>{session?.user?.email}</p>
      <p>user id</p>
      <p>{session?.user?.userId}</p>
      <SignInButton/>
      <SignOutButton/>
    </div>
  )
}
