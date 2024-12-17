'use client'
import {SignInButtonGitHub, SignInButtonGoogle} from "@/app/components/AuthButton";
import { Card, CardBody, CardHeader, Divider} from "@nextui-org/react";

export default function Signin() {

  return (
      <Card className="max-w-[200px] m-auto mt-20">
        <CardHeader className="flex gap-3">
          
          <div className="flex flex-col">
            <p className="text-md">Sign in page</p>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody className={"flex-col gap-3"}>
          <SignInButtonGitHub>Log in GitHub</SignInButtonGitHub>
          <SignInButtonGoogle>Login with Google</SignInButtonGoogle>
        </CardBody>
      </Card>

  )
}
