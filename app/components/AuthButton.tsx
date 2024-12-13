"use client";
import {signIn, signOut, useSession} from "next-auth/react";
import {Button} from "@nextui-org/button";


export function SignInButtonGitHub({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <Button onPress={() => signIn("github")}>{children}</Button>
  );
}

export function SignOutButton(){
  const session = useSession()
  console.log(session)
  return (
    <Button onPress={() => signOut()}>Sign out</Button>
  );
}
