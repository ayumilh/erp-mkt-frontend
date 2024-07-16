'use client'
import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../../app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';



export default function Authmercado() {
  // const session = await getServerSession(nextAuthOptions)
  // if(!session) {
  //   redirect('/login')
  // }

  const router = useRouter();
  const [codigo, setCodigo] = useState('');

  useEffect(() => {
    const { code } = router.query;

    if (code) {
      console.log("Código recebido:", code);
      setCodigo(code); 
    }
  }, [router.query]);

  return (
    <main className="flex min-h-screen flex-row items-center justify-evenly">
      <h1 className="text-4xl font-bold text-gray-800">Autenticação do Mercado Livre</h1>
      <p className="text-gray-800">Código: {codigo}</p>
    </main>
  );
}
