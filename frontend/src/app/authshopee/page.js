'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { searchUserId } from '@/utils/searchUserId';
import SuccessNotification from '@/components/Geral/Notifications/SuccessNotification';
import ErrorNotification from '@/components/Geral/Notifications/ErrorNotification';

export default function Authshopee() {
  const [statusRequestCodeShopee, setStatusRequestCodeShopee] = useState(null);
  const [resData, setResData] = useState('');
  const router = useRouter();

  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const shop_id = parseInt(searchParams.get('shop_id'), 10);
  const nome_loja = typeof window !== 'undefined' ? localStorage.getItem('nome_loja') : null;

  useEffect(() => {
    if (!code || !nome_loja) {
      setStatusRequestCodeShopee(false);
      return;
    }

    const fetchData = async () => {
      const userId = searchUserId();
      if (!userId) return

      try {
        const res = await axios.post('https://erp-mkt.vercel.app/api/shopee/redirect', { 
          code, 
          nome_loja, 
          userId, 
          shop_id 
        });
        if (res.status === 200) {
          setResData(res.data);
          setStatusRequestCodeShopee(true);
          router.push('/dashboard');
        } else {
          setStatusRequestCodeShopee(false);
        }
        
      } catch (error) {
        setStatusRequestCodeShopee(false);
      }
    };

    fetchData();
  }, [code, nome_loja, router, shop_id]);

  return (
    <main className="flex min-h-screen flex-row items-center justify-evenly">
      <h1 className="text-4xl font-bold text-neutral-800 dark:text-gray-200">Autenticação do Shopee</h1>
      <p className="text-neutral-800 dark:text-gray-200">Código: {code}</p>
      <p className="text-neutral-800 dark:text-gray-200">id: {shop_id}</p>
      <p className="text-neutral-800 dark:text-gray-200">Tipo de ID: {typeof shop_id}</p>
      {resData && <p className="text-neutral-800 dark:text-gray-200">Resposta: {JSON.stringify(resData)}</p>}

      {statusRequestCodeShopee === true && <SuccessNotification message="Conectado com sucesso" />}
      {statusRequestCodeShopee === false && <ErrorNotification message="Erro ao conectar" />}
    </main>
  );
}