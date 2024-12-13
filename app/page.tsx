"use client";
import {Button, Card, CardHeader, CardBody, Divider} from "@nextui-org/react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function Home() {
  const {data} = useSession();
  const router = useRouter();
  

  return (
      <main>
        {data?.user ? (
          <div className={"mt-20 text-center"}>
            feed
          </div>
        ) : (
          <Card className="max-w-[200px] m-auto mt-20">
            <CardHeader className="flex gap-3">
              
              <div className="flex flex-col">
                <p className="text-md">Please sign in</p>
              </div>
            </CardHeader>
            <Divider/>
            <CardBody>
              <Button onPress={() => router.push("auth/signin")}
                      className="mt-3 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">Connexion</Button>
            </CardBody>
          </Card>
        )
        }
        
      </main>
  );
}
