"use client";

import {useSession} from "next-auth/react";

export default function ProfilHeader() {
  const {data} = useSession();
  console.log(data);
  return (
    <section>
      {/*<Image src={} alt={}/>*/}
    </section>
  );
}