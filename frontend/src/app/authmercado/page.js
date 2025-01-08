'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { searchUserId } from '@/utils/searchUserId';
import SuccessNotification from '@/components/Geral/Notifications/SuccessNotification';
import ErrorNotification from '@/components/Geral/Notifications/ErrorNotification';

export default function Authmercado() {
  const [statusRequestCodeMercado, setStatusRequestCodeMercado] = useState(null);
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const nome_loja = typeof window !== 'undefined' ? localStorage.getItem('nome_loja') : null;

  useEffect(() => {
    if (!code || !nome_loja) {
      setStatusRequestCodeMercado(false);
      return;
    }

    const fetchData = async () => {
      const userId = searchUserId();
      if (!userId) return

      setUserId(userId);

      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mercadolivre/redirect`, { code, nome_loja, userId });
        if (res.status === 200) {
          setStatusRequestCodeMercado(true);
          router.push('/dashboard');
        } else if (res.status === 409) {
          setStatusRequestCodeMercado(false);
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
      <div>
        <p>Nome da Loja: {nome_loja}</p>
        <p>Code: {code}</p>
        <p>UserId: {userId}</p>
      </div>
      {statusRequestCodeMercado === true && <SuccessNotification message="Conectado com sucesso" />}
      {statusRequestCodeMercado === false && <ErrorNotification message="Erro ao conectar" />}
    </main>
  );
}