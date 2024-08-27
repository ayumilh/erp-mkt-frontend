'use client'
import Image from 'next/image'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Formulario from "@/components/Auth/Login/Formulario";
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  return (
    <main className="bg-indigo-50 flex min-h-screen flex-col items-center justify-evenly">
      <div className='bg-gray-300 w-full h-0 flex justify-between items-center px-32'>
        <div onClick={router.push('./')} className="w-10 h-10 hover:bg-gray-200 hover:bg-opacity-90 rounded-full p-4 flex justify-center items-center cursor-pointer">
          <ArrowBackIosIcon className="text-gray-700 hover:text-black transition duration-300 ease-out"/>
        </div>
          <div>
            <Image src="/img/logo.png" alt="Logo" width={120} height={120} className="object-cover"/>  
          </div>
        </div>  
      <Formulario />
    </main>
  );
}
