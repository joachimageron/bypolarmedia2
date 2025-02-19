// app/providers.jsx
"use client";

import {SessionProvider} from "next-auth/react";
import {HeroUIProvider, ToastProvider} from "@heroui/react";
import {Analytics} from "@vercel/analytics/react"
import {UserProvider} from "@/app/components/providers/UserProvider";
  
// import {useRouter} from 'next/navigation'

export default function Providers({children}: Readonly<{
  children: React.ReactNode;
}>) {
  const env = process.env.NODE_ENV;
  return (
    <>
      {env === 'production' && <Analytics/>}
      <HeroUIProvider>
        <ToastProvider 
        placement="top-center" 
        toastOffset={15}
        toastProps={{variant:"flat"}}
        />
        <SessionProvider>
          <UserProvider>
              {children}
          </UserProvider>
        </SessionProvider>
      </HeroUIProvider>
    </>
  );
}
