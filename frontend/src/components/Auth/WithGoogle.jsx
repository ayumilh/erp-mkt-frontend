'use client'
import { useState, useEffect } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const WithGoogle = ({ loginType }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [email, setEmail] = useState('');

  useEffect(() => {
    if (session) {
      console.log("Session: ", session);
      if (session.user) {
        console.log("User: ", session.user);
        setEmail(session?.user?.email || '');
      } else {
        console.log("No user found in session");
      }
    }
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
      {email && <p>Email do usuário: {email}</p>}
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