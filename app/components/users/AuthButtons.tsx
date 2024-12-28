"use client";
import {signIn, signOut} from "next-auth/react";
import {Button} from "@nextui-org/button";


export function SignInButtonGitHub({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <Button className={"w-full"} onPress={() => signIn("github")}>{children}</Button>
  );
}

export function SignInButtonGoogle({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <Button className={"w-full"} onPress={() => signIn("google")}>{children}</Button>
  );
}

export function SignOutButton(){
  return (
    <Button onPress={() => signOut()}>Sign out</Button>
  );
}
