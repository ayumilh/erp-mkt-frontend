'use client'
import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../../app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';


export default function Authmercado({searchParams}) {
  return (
    <main className="flex min-h-screen flex-row items-center justify-evenly">
      <h1 className="text-4xl font-bold text-gray-800">Autenticação do Mercado Livre</h1>
      <p className="text-gray-800">Código: {searchParams.code}</p>
    </main>
  );
}
