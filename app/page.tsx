import './global.css';
import Image from "next/image";
import {Button} from "@nextui-org/button";

export default function Home() {
  return (
      <div className={"bg-amber-50"}>
        <h1>Next.js + TypeScript + Tailwind CSS</h1>
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          width={72}
          height={16}
        />
        <Button color="primary" >Button</Button>
      </div>
  );
}
