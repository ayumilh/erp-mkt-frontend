import ContentImage from "@/components/Auth/ContentImage";
import Formulario from "@/components/Auth/Cadastro/Formulario";

export default function Cadastro() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-evenly">
      <ContentImage/>    
      <Formulario/>
    </main>
  );
}