"use client";
import {signIn, signOut, useSession} from "next-auth/react";
import {Button} from "@nextui-org/button";


export function SignInButton() {
  return (
    <Button onClick={() => signIn("github")}>Sign in with github</Button>
  );
}

export function SignOutButton(){
  const session = useSession()
  console.log(session)
  return (
    <Button onClick={() => signOut()}>Sign out</Button>
  );
}
