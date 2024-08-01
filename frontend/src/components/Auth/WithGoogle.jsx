'use client'
import { useState, useEffect } from "react";
import { useContext } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import {AuthContext} from '@/contexts/AuthContext' 
import { signIn, useSession } from "next-auth/react";
import axios from "axios";

const WithGoogle = ({ loginType }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [inputs, setInputs] = useState({
    email: '',
    senha: '',
  });

  useEffect(() => {
    if (session) {
      const email = session.session.user.email || '';
      const senha = session.user.password || '';
      setInputs({ email, senha });
    }
  }, [session]);

  useEffect(() => {
    const handleLogin = async () => {
      if (session) {
        if (session.user) {
          console.log("Inputs: ", inputs);
          const res = await axios.post("https://erp-mkt.vercel.app/api/auth/register", inputs)
        } else {
          console.log("No user found in session");
        }
      }
    };
  
    handleLogin();
  }, [session]);

  const handleSignIn = async () => {
    await signIn('google');
  };

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
          <span className="text-blue-700 font-semibold cursor-pointer ml-1" onClick={() => router.push('cadastro')}>Criar conta!</span> 
        </p>
      ) : (
        <p className="text-blue-700 font-semibold cursor-pointer text-sm md:text-base" onClick={() => router.push('login')}>
          Já tem uma conta? 
        </p>
      )}
    </div>
  )
}

export default WithGoogle;