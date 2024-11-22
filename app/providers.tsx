// app/providers.jsx
"use client";

import {SessionProvider} from "next-auth/react";
import {NextUIProvider} from "@nextui-org/system";
// import {useRouter} from 'next/navigation'

export default function Providers({children}: Readonly<{
  children: React.ReactNode;
}>) {
  // const router = useRouter();
  
  return (
    <SessionProvider>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </SessionProvider>
  );
}
