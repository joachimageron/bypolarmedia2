// app/providers.jsx
"use client";

import {SessionProvider} from "next-auth/react";
import {HeroUIProvider} from "@heroui/system";
import {Analytics} from "@vercel/analytics/react"
import NotificationProvider from "./NotificationProvider"
import {UserProvider} from "@/app/components/providers/UserProvider";
// import {useRouter} from 'next/navigation'

export default function Providers({children}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (<>
      <Analytics/>
      <HeroUIProvider>
        <SessionProvider>
          <UserProvider>
            <NotificationProvider>
              {children}
            </NotificationProvider>
          </UserProvider>
        </SessionProvider>
      </HeroUIProvider>
    </>
  );
}
