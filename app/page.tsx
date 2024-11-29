
import Image from "next/image";
import {Button} from "@nextui-org/button";
import {Spacer} from "@nextui-org/react";

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
  
  return (
      <div>
        <h1>Next.js + TypeScript + Tailwind CSS</h1>
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          width={72}
          height={16}
        />
        {/*<Button color="primary" variant="bordered">Button</Button>*/}
        {/*<Button color="success" onPress={handleSuccess}>*/}
        {/*  Afficher Succès*/}
        {/*</Button>*/}
        {/*<Spacer y={0.5} />*/}
        {/*<Button color="warning" onPress={handleError}>*/}
        {/*  Afficher Erreur*/}
        {/*</Button>*/}
        {/*<Spacer y={0.5} />*/}
        {/*<Button color="primary" onPress={handleInfo}>*/}
        {/*  Afficher Info*/}
        {/*</Button>*/}
      </div>
  );
}
