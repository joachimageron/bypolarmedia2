// app/providers.jsx
"use client";

import {SessionProvider} from "next-auth/react";
import {NextUIProvider} from "@nextui-org/system";
import { Analytics } from "@vercel/analytics/react"
import NotificationProvider from "./NotificationProvider"
// import {useRouter} from 'next/navigation'

export default function Providers({children}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <SessionProvider>
      <NextUIProvider>
        <NotificationProvider>
          <Analytics/>
        {children}
        </NotificationProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
