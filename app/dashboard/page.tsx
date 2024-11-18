"use client";
import {signOut, useSession} from "next-auth/react";

export default function dashboard (){
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession();
  console.log(session);
  if (!session) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>You need to be signed in to view this page</p>
      </div>
    );
  }
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is the dashboard page</p>
      <p>email :</p>
      <p>{session.user?.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
