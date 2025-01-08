'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import SidebarContent from "@/components/Drawer/desktop/SidebarContent";
import ProdutosContent from "@/components/Produtos/ProdutosContent";
import { useRouter, useSearchParams } from 'next/navigation';
import { searchUserId } from '@/utils/searchUserId';
import SuccessNotification from '@/components/Geral/Notifications/SuccessNotification';
import ErrorNotification from '@/components/Geral/Notifications/ErrorNotification';
import HamburgerContent from '@/components/Drawer/mobile/HamburgerContent';
import ActionsContent from '@/components/Config/ActionsConfig/ActionsContent';
import TitlePage from '@/components/Geral/TitlePage';


export default function Authmercado() {
  const [statusRequestCodeMercado, setStatusRequestCodeMercado] = useState(null);
  const [modalMessage, setModalMessage] = useState('');
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const nome_loja = typeof window !== 'undefined' ? localStorage.getItem('nome_loja') : null;

  useEffect(() => {
    if (!code || !nome_loja) {
      setModalMessage('Dados de conexão não fornecidos.');
      return;
    }

    const fetchData = async () => {
      const userId = searchUserId();
      if (!userId) {
        setModalMessage('Dados de conexão não fornecidos.');
        return;
      }

      setUserId(userId);

      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mercadolivre/redirect`, { code, nome_loja, userId });
        if (res.status === 200) {
          setModalMessage('Conectado com sucesso.');
          setStatusRequestCodeMercado(true);
          router.push('/dashboard');
        } else {
          setModalMessage('Erro ao processar a solicitação.');
          setStatusRequestCodeMercado(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setModalMessage('Loja já conectada.');
          setStatusRequestCodeMercado(false);
        } else {
          setModalMessage('Erro ao processar a solicitação.');
          setStatusRequestCodeMercado(false);
        }
      }
    };

    fetchData();
  }, [code, nome_loja, router]);

  return (
    <main className="flex max-w-full h-screen">
      <SidebarContent />
      <div className='w-full px-4 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center'>
        <div className="w-full flex justify-between items-center h-12 pt-5">
          <div className='flex items-center'>
            <HamburgerContent />
            <TitlePage title='Conectando loja do mercado livre' />
          </div>
          <ActionsContent />
        </div>
      </div>

      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
        <p className="mt-5 text-lg text-neutral-800 dark:text-gray-200">
          {modalMessage}
        </p>

        <div className="mt-8 flex justify-center">
          <Image src='/img/notification/error_bad_request.svg' alt="Erro" className="w-96 h-96" width={384} height={384} />
        </div>
        <div className="mt-8 flex justify-center">
          {statusRequestCodeMercado === true ? (
            <Image src='/img/notification/sucess_request.svg' alt="Sucesso" className="w-96 h-96" width={384} height={384} />
          ) : (
            <Image src='/img/notification/error_bad_request.svg' alt="Erro" className="w-96 h-96" width={384} height={384} />
          )}
        </div>
      </div>
    </main>
  );
}