import {serverSession} from "@/utils/auth";
import {permanentRedirect} from "next/navigation";
import {SignInButton, SignOutButton} from "@/app/components/AuthButton";

export default async function Signin() {
  // Récupérer la session utilisateur
  const session = await serverSession();
  

  
  if (session?.user) {
    
    permanentRedirect("/");
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
