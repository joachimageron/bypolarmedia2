"use client";
import {signIn} from "next-auth/react";


export default function SignInButton() {
  return (
    <button onClick={() => signIn("github")}>Sign in with github</button>
  );
}
