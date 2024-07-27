'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import SuccessNotification from '@/components/Geral/Notifications/SuccessNotification';
import ErrorNotification from '@/components/Geral/Notifications/ErrorNotification';

export default function Authmercado({ searchParams }) {
  const [statusRequestCodeMercado, setStatusRequestCodeMercado] = useState(null);
  const [resData, setResData] = useState('');
  const code = searchParams?.code;
  const nome_mercado = typeof window !== 'undefined' ? localStorage.getItem('nome_mercado') : null;

  useEffect(() => {
    if (!code || !nome_mercado) {
      setStatusRequestCodeMercado(false);
      return;
    }

    const fetchData = async () => {
      console.log('code', code);
      console.log(nome_mercado);
      try {
        const res = await axios.post('https://erp-mkt.vercel.app/api/mercadolivre/redirect', { code, nome_mercado });
        console.log(res.data);
        if (res.status === 200) {
          setResData(res.data);
          setStatusRequestCodeMercado(true);
        } else {
          setStatusRequestCodeMercado(false);
        }
      } catch (error) {
        setStatusRequestCodeMercado(false);
      }
    };

    fetchData();
  }, [code, nome_mercado]);

  return (
    <main className="flex min-h-screen flex-row items-center justify-evenly">
      <h1 className="text-4xl font-bold text-gray-800">Autenticação do Mercado Livre</h1>
      <p className="text-gray-800">Código: {code}</p>
      {resData && <p className="text-gray-800">Resposta: {JSON.stringify(resData)}</p>}

      <div>
        {/* Renderização condicional baseada no statusRequestCodeMercado */}
        {statusRequestCodeMercado === null && <p>Carregando...</p>}
        {statusRequestCodeMercado === true && <p>Sucesso: {resData}</p>}
        {statusRequestCodeMercado === false && <p>Erro ao conectar</p>}
      </div>
    </main>
  );
}