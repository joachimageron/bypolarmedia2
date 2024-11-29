import {SignOutButton} from "@/app/components/AuthButton";
import {serverSession} from "@/utils/auth";

export default async function SignOut() {
  const session = await serverSession();
  
  return (
    <main>
      <h1>Signout</h1>
      <p>Session: </p>
      <p>{session?.user?.email}</p>
      <SignOutButton/>
    </main>
  );
}