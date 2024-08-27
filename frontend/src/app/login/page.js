import Image from 'next/image'
import Formulario from "@/components/Auth/Login/Formulario";

export default function Login() {
  return (
    <main className="bg-indigo-50 flex min-h-screen flex-col items-center justify-evenly">
      <div className='w-full h-0 flex justify-center items-center'>
          <Image src="/img/logo.png" alt="Logo" width={120} height={120} className="object-cover"/>  
        </div>  
      <Formulario />
    </main>
  );
}
