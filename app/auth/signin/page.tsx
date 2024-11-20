import {serverSession} from "@/utils/auth";
import {permanentRedirect} from "next/navigation";
import SignInButton from "@/app/auth/signin/siginButton";


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
      <p>This is the sign in page</p>
      <p>{session?.user?.email}</p>
      <SignInButton/>
    </div>
  )
}
