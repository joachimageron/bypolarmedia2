"use client";
import {Button, Card, CardHeader, CardBody, Divider} from "@nextui-org/react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function Home() {
  
  // const { showNotification } = useNotificationModal();
  //
  // const handleSuccess = () => {
  //   showNotification('success', 'Succès', 'Opération réussie avec succès.');
  // };
  //
  // const handleError = () => {
  //   showNotification('error', 'Erreur', 'Une erreur est survenue lors de l\'opération.');
  //   setTimeout(() => {
  //
  //   showNotification('info', 'Information', 'Ceci est une notification d\'information.');
  //   }, 1000);
  // };
  //
  // const handleInfo = () => {
  //   showNotification('info', 'Information', 'Ceci est une notification d\'information.');
  //
  // };
  
  const {data} = useSession();
  const router = useRouter();
  console.log(data);
  
  return (
      <div>
        
        <Card className="max-w-[200px] m-auto mt-20">
          <CardHeader className="flex gap-3">
 
            <div className="flex flex-col">
              <p className="text-md">bouttons de navigation</p>
            </div>
          </CardHeader>
          <Divider/>
          <CardBody>
            {data?.user && <Button onPress={() => router.push(`profil/${data.user.userId}`)}
                                   className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">Profil
               utilisateur</Button>}
            <Button onPress={() => router.push("auth/signin")}
                    className="mt-3 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">Connexion</Button>
          </CardBody>
        </Card>
      </div>
  );
}
