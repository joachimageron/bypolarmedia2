'use client'
import {SignInButtonGitHub} from "@/app/components/AuthButton";
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
        <CardBody>
          <SignInButtonGitHub>S&#39;inscrire avec GitHub</SignInButtonGitHub>
        </CardBody>
      </Card>

  )
}
