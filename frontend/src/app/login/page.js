import ContentImage from "@/components/Auth/ContentImage";
import Formulario from "@/components/Auth/Login/Formulario";

export default function Login() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-evenly">
      <ContentImage />
      <Formulario />
    </main>
  );
}
