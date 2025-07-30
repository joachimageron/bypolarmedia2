// app/providers.jsx
"use client";

import { SessionProvider } from "next-auth/react";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { UserProvider } from "@/app/components/providers/UserProvider";
import PlausibleAnalytics from "@/app/components/providers/Plausible";

// import {useRouter} from 'next/navigation'

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PlausibleAnalytics />
      <HeroUIProvider>
        <ToastProvider
          placement="top-center"
          toastOffset={15}
          toastProps={{ variant: "flat" }}
        />
        <SessionProvider>
          <UserProvider>{children}</UserProvider>
        </SessionProvider>
      </HeroUIProvider>
    </>
  );
}
