// app/providers.jsx
"use client";

import {SessionProvider} from "next-auth/react";
import {HeroUIProvider} from "@heroui/system";
import {Analytics} from "@vercel/analytics/react"
import NotificationProvider from "./NotificationProvider"
// import {useRouter} from 'next/navigation'

export default function Providers({children}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <SessionProvider>
      <Analytics/>
      <HeroUIProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}
