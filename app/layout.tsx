import './styles/global.css';
import type {Metadata} from "next";
import Providers from "@/app/components/providers/Providers";


export const metadata: Metadata = {
  title: "Bypolar 2",
  description: "bypolar est de retour",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={"dark"}>
    <body>
    <Providers>
      {children}
    </Providers>
    </body>
    </html>
  );
}
