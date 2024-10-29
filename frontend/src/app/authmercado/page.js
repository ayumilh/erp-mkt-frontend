'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { searchUserId } from '@/utils/searchUserId';
import SuccessNotification from '@/components/Geral/Notifications/SuccessNotification';
import ErrorNotification from '@/components/Geral/Notifications/ErrorNotification';

export default function Authmercado({ searchParams }) {
  const [statusRequestCodeMercado, setStatusRequestCodeMercado] = useState(null);
  const [resData, setResData] = useState('');
  const router = useRouter();

  const code = searchParams?.code;
  const nome_loja = typeof window !== 'undefined' ? localStorage.getItem('nome_loja') : null;

  useEffect(() => {
    if (!code || !nome_loja) {
      setStatusRequestCodeMercado(false);
      return;
    }

    const fetchData = async () => {
      const userId = searchUserId();
      if (!userId) return

      try {
        const res = await axios.post('https://erp-mkt.vercel.app/api/mercadolivre/redirect', { code, nome_loja, userId });
        if (res.status === 200) {
          setResData(res.data);
          setStatusRequestCodeMercado(true);
          router.push('/dashboard');
        } else {
          setStatusRequestCodeMercado(false);
        }
      } catch (error) {
        setStatusRequestCodeMercado(false);
      }
    };

    fetchData();
  }, [code, nome_loja, router]);

  return (
    <main className="flex min-h-screen flex-row items-center justify-evenly">
      <h1 className="text-4xl font-bold text-neutral-800 dark:text-gray-200">Autenticação do Mercado Livre</h1>
      <p className="text-neutral-800 dark:text-gray-200">Código: {code}</p>
      {resData && <p className="text-neutral-800 dark:text-gray-200">Resposta: {JSON.stringify(resData)}</p>}

      {statusRequestCodeMercado === true && <SuccessNotification message="Conectado com sucesso" />}
      {statusRequestCodeMercado === false && <ErrorNotification message="Erro ao conectar" />}
    </main>
  );
}