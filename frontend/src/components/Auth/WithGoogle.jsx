'use client'
import { useContext } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import {AuthContext} from '@/contexts/AuthContext' 

const WithGoogle = ({ loginType }) => {
  const { loginWithGoogle } = useContext(AuthContext);
  const router = useRouter();

  const handleSignIn = async () => {      
    await loginWithGoogle();
  }

  return (
    <div className="flex flex-col items-center">
      <p className="text-base md:text-lg font-medium">ou continuar com</p>
      <button onClick={handleSignIn} className="mt-7 mb-7 flex items-center">
        <Image src="/img/icon-google.svg" alt="Google Logo" width={42} height={42} />
        <span className="ml-2">Sign in with Google</span>
      </button>
      {loginType === 'login' ? (
        <p className="font-medium text-sm md:text-base">
          Não tem uma conta? 
          <span className="text-blue-700 font-semibold cursor-pointer ml-1 hover:underline" onClick={() => router.push('cadastro')}>Criar conta!</span> 
        </p>
      ) : (
        <p className="text-blue-700 font-semibold cursor-pointer text-sm md:text-base hover:underline" onClick={() => router.push('login')}>
          Já tem uma conta? 
        </p>
      )}
    </div>
  )
}

export default WithGoogle;