"use client";

import React from "react";
import {Button, Input, Link, Form, Divider} from "@nextui-org/react";
import {Icon} from "@iconify/react";
import {signIn} from "next-auth/react";

export default function Page() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  
  const toggleVisibility = () => setIsVisible(!isVisible);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    
    const data = new FormData(event.currentTarget);
    
    const email = data.get("email");
    const password = data.get("password");
    
    if (!email || !password) return;
    await signIn("credentials", {email: email, password: password});
    setLoading(false);
  };
  
  return (
    <div className="flex h-[90vh] w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
        <div className="flex flex-col gap-1">
          <h1 className="text-large font-medium">Sign in to your account</h1>
          <p className="text-small text-default-500">to continue to BypolarMedia</p>
        </div>
        
        <Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={handleSubmit}>
          <Input
            isRequired
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          {/*<div className="flex w-full items-center justify-between px-1 py-2">*/}
            {/*<Checkbox name="remember" size="sm">*/}
            {/*  Remember me*/}
            {/*</Checkbox>*/}
            {/*<Link className="text-default-500" href="#" size="sm">*/}
            {/*  Forgot password?*/}
            {/*</Link>*/}
          {/*</div>*/}
          <Button isLoading={loading} className="w-full" color="primary" type="submit">
            Sign In
          </Button>
        </Form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
            onPress={() => signIn("google")}
          >
            Continue with Google
          </Button>
          <Button
            startContent={<Icon className="text-default-500" icon="fe:github" width={24} />}
            variant="bordered"
            onPress={() => signIn("github")}
          >
            Continue with Github
          </Button>
        </div>
        <p className="text-center text-small">
          Need to create an account ?&nbsp;
          <Link href="/auth/register" size="sm">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
