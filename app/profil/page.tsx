"use client";
import {signOut, useSession} from "next-auth/react";

export default function profil (){
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession();
  console.log(session);
  
  return (
    <div>
      <h1>Profil</h1>
      <p>This is the profil page</p>
      <p>email :</p>
      <p>{session?.user?.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
