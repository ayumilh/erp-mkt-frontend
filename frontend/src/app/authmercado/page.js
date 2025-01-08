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
  const [statusRequestCodeMercado, setStatusRequestCodeMercado] = useState('');
  const [titleMessageError, setTitleMessageError] = useState('');
  const [messageError, setMessageError] = useState('');
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const nome_loja = typeof window !== 'undefined' ? localStorage.getItem('nome_loja') : null;

  useEffect(() => {
    if (!code || !nome_loja) {
      setMessageError('Dados de conexão não fornecidos.');
      return;
    }

    const fetchData = async () => {
      const userId = searchUserId();
      if (!userId) {
        setMessageError('Dados de conexão não fornecidos.');
        return;
      }

      setUserId(userId);

      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mercadolivre`, { code, nome_loja, userId });
        if (res.status === 200) {
          setTitleMessageError('Conectado com sucesso.');
          setStatusRequestCodeMercado(true);
          // router.push('/dashboard');
        } else {
          setTitleMessageError('Erro ao processar a solicitação.');
          setMessageError('Por favor, verifique sua conexão com a internet ou tente novamente mais tarde. Se o problema persistir, entre em contato com o suporte.');
          setStatusRequestCodeMercado(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setTitleMessageError('Parabéns! Loja já conectada.');
          setMessageError('Você já possui uma loja conectada a esta conta. Para conectar uma nova loja, você precisa desconectar a loja atual.');
          setStatusRequestCodeMercado(false);
        } else if (error.response && error.response.status === 401) {
          setTitleMessageError('Opa! Erro de Autenticação');
          setMessageError('As credenciais de acesso da sua loja estão incorretas. Verifique seu usuário e senha.');
          setStatusRequestCodeMercado(false);
        } else if (error.response && error.response.status === 403) {
          setTitleMessageError('Puxa! Acesso Negado');
          setMessageError('Você não possui permissão para conectar esta loja. Entre em contato com o administrador.');
          setStatusRequestCodeMercado(false);
        } else if (error.response && error.response.status === 400) {
          setTitleMessageError('Opa! Dados Inválidos');
          setMessageError('Os dados fornecidos são inválidos. Verifique os campos e tente novamente.');
          setStatusRequestCodeMercado(false);
        } else if (error.response && error.response.status >= 500) {
          setTitleMessageError('Ops! Erro no Servidor');
          setMessageError('Ocorreu um problema em nossos servidores. Tente novamente mais tarde.');
          setStatusRequestCodeMercado(false);
        } else {
          setTitleMessageError('Ops! Erro ao processar a solicitação.');
          setMessageError('Por favor, verifique sua conexão com a internet ou tente novamente mais tarde. Se o problema persistir, entre em contato com o suporte.');
          setStatusRequestCodeMercado(false);
        }
      }
    };

    fetchData();
  }, [code, nome_loja, router]);

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <main className="flex max-w-full h-screen">
      <SidebarContent />
      <div className='w-full px-4 lg:mt-4 xl:mx-8 flex flex-col items-center justify-center'>
        <div className="w-full flex justify-between items-center h-12 pt-5">
          <div className='flex items-center'>
            <HamburgerContent />
            <TitlePage title='Conectando loja do mercado livre' />
          </div>
          <ActionsContent />
        </div>
        <div className="flex flex-col items-center h-full lg:max-w-screen-sm">
          <div className="flex justify-center">
            {statusRequestCodeMercado === true ? (
              <Image src='/img/notification/sucess_request.svg' alt="Sucesso" className="w-96 h-96" width={384} height={384} />
            ) : (
              <Image src='/img/notification/error_bad_request.svg' alt="Erro" className="w-96 h-80" width={384} height={384} />
            )}
          </div>

          <h1 className="text-2xl font-semibold text-neutral-800 dark:text-gray-200"> {titleMessageError} </h1>
          <p className="px-4 text-neutral-800 dark:text-gray-200 mt-1 w-full text-center"> {messageError} </p>

          <button
            onClick={handleGoToDashboard}
            className="mt-4 px-4 py-2 bg-segundaria-900 text-white rounded hover:bg-segundaria-800 cursor-pointer transition duration-300 ease-in-out"
          >
            Voltar para o Dashboard
          </button>
        </div>
      </div>

    </main>
  );
}