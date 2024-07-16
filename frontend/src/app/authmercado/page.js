'use client'
import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../../app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

import { useEffect, useState } from 'react';
import axios from 'axios';
import SuccessNotification from '@/components/Geral/Notifications/SuccessNotification';
import ErrorNotification from '@/components/Geral/Notifications/ErrorNotification';

export default function Authmercado({ searchParams }) {
  const [statusRequestCodeMercado, setStatusRequestCodeMercado] = useState(null);
  const [resData, setResData] = useState('');
  const code = searchParams.code;

  useEffect(() => {
    const fetchData = async () => {
      console.log('code', code);
      try {
        const res = await axios.post('https://erp-mkt.vercel.app/api/mercadolivre/redirect', code);
        console.log(res.data);
        if (res.status === 200) {
          setResData(res.data);
          setStatusRequestCodeMercado(true);
        } else{
          setStatusRequestCodeMercado(false);
          return
        }
      } catch (error) {
        setStatusRequestCodeMercado(false);
      }
    };

    fetchData();
  }, [code]);

  return (
    <main className="flex min-h-screen flex-row items-center justify-evenly">
      <h1 className="text-4xl font-bold text-gray-800">Autenticação do Mercado Livre</h1>
      <p className="text-gray-800">Código: {code}</p>
      {resData && <p className="text-gray-800">Resposta: {JSON.stringify(resData)}</p>}

      {statusRequestCodeMercado === true && <SuccessNotification message='Código do Mercado Livre enviado com sucesso!' />}
      {statusRequestCodeMercado === false && <ErrorNotification message='Erro ao enviar o código do Mercado Livre!' />}
    </main>
  );
}
