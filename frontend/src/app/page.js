'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from "next/image";
import {
    FaShippingFast,
    FaBoxOpen,
    FaChartLine,
    FaDollarSign,
    FaUsers,
    FaCogs,
} from "react-icons/fa";
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from "@mui/icons-material/Check";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    useEffect(() => {
        // Animação de descida na renderização
        gsap.from(".animate-image", {
            scrollTrigger: {
                trigger: ".animate-image",
                start: "top 80%",
                end: "top 30%",
                scrub: true,
            },
            duration: 1,
            opacity: 1,
            y: -10,
        });

        // Animação de subida ao rolar a página
        gsap.to(".animate-image", {
            scrollTrigger: {
                trigger: ".animate-image",
                start: "top 80%",
                end: "top 30%",
                scrub: true,
            },
            y: -50,
            opacity: 0,
        });
    }, []);


    useEffect(() => {
        gsap.to(".animate", {
            opacity: 0,
            y: (i, target) => {
                if (i === 1) return 50; 
                return i === 0 ? -50 : 50; 
            },
            stagger: 0.3,
            scrollTrigger: {
                trigger: ".animate",
                markers: true,
                start: "top 80%",
                end: "top 30%",
                scrub: true,
            },
        })
        // gsap.to(".animate", {
        //     opacity: 0,
        //     y: (i, target) => {
        //         if (i === 1) return 50; // Centro sobe
        //         return i === 0 ? -50 : 50; // Laterais vêm para o centro
        //     },
        //     stagger: 0.3,
        //     scrollTrigger: {
        //         trigger: ".animate",
        //         markers: true,
        //         start: "top 80%",
        //         end: "top 30%",
        //         scrub: true,
        //     },
        // })
    }, []);
    return (
        <div className="flex flex-col">
            <header className="w-full h-20 flex flex-row items-center justify-between px-5 xl:px-20 py-5">
                <div className="flex flex-row items-center">
                    <div>
                        <Image src="/img/logo.png" alt="logo" width={120} height={120} />
                    </div>
                    <nav className="flex space-x-4">
                        <a
                            href="#"
                            className="text-neutral-800 font-medium text-lg transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out"
                        >
                            Integrações
                        </a>
                        <a
                            href="#sobre"
                            className="text-neutral-800 font-medium text-lg transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out"
                        >
                            Sobre
                        </a>
                        <a
                            href="#planos"
                            className="text-neutral-800 font-medium text-lg transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out"
                        >
                            Planos
                        </a>
                    </nav>
                </div>

                <div className="flex flex-row items-center gap-4">
                    <button className="bg-gray-50 hover:bg-gray-100 shadow-sm rounded-full px-3 py-1 transition duration-300 ease-in-out">
                        <a
                            href="#teste-gratis"
                            className="text-neutral-700 font-medium text-sm"
                        >
                            Teste Grátis
                        </a>
                    </button>
                    <button className=" bg-segundaria-900 hover:bg-segundaria-800 shadow-md hover:shadow-lg rounded-full px-3 py-1 transition duration-300 ease-in-out">
                        <a href="/login" className="text-white font-medium text-sm">
                            Entrar
                        </a>
                    </button>
                </div>
            </header>

            <main className="flex flex-col mt-20">
                <h1 className="text-2xl font-semibold text-center mb-7">
                    ERP: Inovação e Maestria na Gestão que
                    <span className="block text-segundaria-900 font-semibold text-2xl py-1">
                        Simplifica e Acelera o seu Negócio
                    </span>
                </h1>
                <div className="flex flex-row justify-center">
                    <div className='animate-image'>
                        <Image
                            src="/img/landingPage/print-dashboard.png"
                            alt="print-dashboard"
                            width={900}
                            height={500}
                        />
                    </div>
                </div>

                <section className="flex flex-col items-center mt-14 mb-20">
                    <div className="flex flex-row justify-center gap-20 w-full">
                        <div className="w-72 h-52 flex flex-col items-center p-4 rounded-lg shadow-sm animate">
                            <FaShippingFast style={{ width: '40px' }} className="text-segundaria-900 mb-2" />
                            <h2 className="text-xl font-semibold mb-2">
                                Eficiência Operacional
                            </h2>
                            <p className="text-center">
                                Nosso sistema de dropshipping e ERP integra todos os processos,
                                garantindo uma operação eficiente e sem complicações.
                            </p>
                        </div>
                        <div className="w-72 h-52 flex flex-col items-center p-4 rounded-lg shadow-sm animate">
                            <FaBoxOpen className="text-4xl text-segundaria-900 mb-2" />
                            <h2 className="text-xl font-semibold mb-2">Redução de Custos</h2>
                            <p className="text-center">
                                Com a nossa solução, você economiza em armazenamento e
                                logística, permitindo investir mais em crescimento e inovação.
                            </p>
                        </div>
                        <div className="w-72 h-52 flex flex-col items-center p-4 rounded-lg shadow-sm animate">
                            <FaChartLine className="text-4xl text-segundaria-900 mb-2" />
                            <h2 className="text-xl font-semibold mb-2">Escalabilidade</h2>
                            <p className="text-center">
                                Nossa plataforma permite que você expanda seu negócio
                                facilmente, adicionando novos produtos e alcançando mais
                                clientes sem complicações.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <section className="h-[460px] w-full bg-gray-100 flex flex-col justify-center items-center my-20">
                <div className="w-10 mb-3">
                    <hr className="w-full border-segundaria-900 border-[1.5px]" />
                </div>
                <h2 className="text-2xl font-semibold mb-8">
                    Transforme Desafios em Oportunidades com Nosso Sistema de Dropshipping
                </h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="w-64 h-32 flex flex-row items-start p-4">
                        <FaBoxOpen className="text-4xl text-segundaria-900 mr-4" />
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold mb-1">Gestão de Estoque</h3>
                            <p className="text-sm">
                                Controle de estoque simplificado e automatizado.
                            </p>
                        </div>
                    </div>
                    <div className="w-64 h-32 flex flex-row items-start p-4">
                        <FaChartLine className="text-4xl text-segundaria-900 mr-4" />
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold mb-1">Análise de Vendas</h3>
                            <p className="text-sm">
                                Ferramentas avançadas para análise de vendas.
                            </p>
                        </div>
                    </div>
                    <div className="w-64 h-32 flex flex-row items-start p-4">
                        <FaDollarSign className="text-xl text-segundaria-900 mr-4 mt-3" />
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold mb-1">Redução de Custos</h3>
                            <p className="text-sm">
                                Reduza custos operacionais com nosso sistema.
                            </p>
                        </div>
                    </div>
                    <div className="w-64 h-32 flex flex-row items-start p-4">
                        <FaUsers className="text-5xl text-segundaria-900 mr-4" />
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold mb-1">Suporte ao Cliente</h3>
                            <p className="text-sm">
                                Melhore o suporte ao cliente com nossas ferramentas.
                            </p>
                        </div>
                    </div>
                    <div className="w-64 h-32 flex flex-row items-start p-4">
                        <FaCogs className="text-4xl text-segundaria-900 mr-4 mt-2" />
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold mb-1">
                                Automação de Processos
                            </h3>
                            <p className="text-sm">
                                Automatize processos para maior eficiência.
                            </p>
                        </div>
                    </div>
                    <div className="w-64 h-32 flex flex-row items-start p-4">
                        <FaShippingFast className="text-5xl text-segundaria-900 mr-4" />
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold mb-1">Entrega Rápida</h3>
                            <p className="text-sm">
                                Garantimos entregas rápidas e eficientes para seus clientes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <article className="w-full flex flex-col justify-center items-center my-20">
                <div className="w-10 mb-3">
                    <hr className="w-full border-segundaria-900 border-[1.5px]" />
                </div>
                <h2 className="text-2xl font-semibold mb-16">
                    Desenvolvendo o plano ideal para o estágio atual do seu negócio
                </h2>
                <div className="flex gap-4">
                    <div className="bg-gray-100 rounded-2xl p-6 w-80 h-[500px]">
                        <div className="flex gap-5 items-center">
                            <div className="bg-white rounded-xl p-3">
                                <Image
                                    src="/img/landingPage/icon-pricing-iniciando.png"
                                    alt="icon-pricing-iniciando"
                                    width={28}
                                    height={28}
                                />
                            </div>
                            <h2 className="text-lg font-semibold">Iniciar</h2>
                        </div>
                        <p className="text-lg font-medium mt-3 mb-6">
                            Transforme seu projeto em realidade com confiança e inovação.
                        </p>
                        <div className="ml-2 py-2">
                            <span className="text-4xl font-semibold">R$120</span>
                            <span className=" text-lg font-light">/mês</span>
                        </div>
                        <ul className="text-lg font-light list-none mt-4 h-32">
                            <li className="flex items-center mb-2 text-sm font-light">
                                <div className="bg-segundaria-900 rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                    <CheckIcon fontSize="small" className="text-white" />
                                </div>
                                Gestão Básica de Pedidos
                            </li>
                            <li className="flex items-center mb-2 text-sm font-light">
                                <div className="bg-segundaria-900 rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                    <CheckIcon fontSize="small" className="text-white" />
                                </div>
                                Controle de Estoque
                            </li>
                            <li className="flex items-center mb-2 text-sm font-light">
                                <div className="bg-segundaria-900 rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                    <CheckIcon fontSize="small" className="text-white" />
                                </div>
                                Integração com Fornecedores
                            </li>
                            <li className="flex items-center mb-2 text-sm font-light">
                                <div className="bg-segundaria-900 rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                    <CheckIcon fontSize="small" className="text-white" />
                                </div>
                                Relatórios de Vendas
                            </li>
                        </ul>
                        <button className="w-full mt-7 px-3 py-2 bg-segundaria-900 text-white rounded-full hover:bg-segundaria-800 cursor-pointer transition duration-300 ease-in-out">
                            Saiba Mais
                        </button>
                    </div>

                    <div
                        className="relative bg-segundaria-900 rounded-2xl p-6 w-80 h-[500px]"
                        style={{ top: "-35px" }}
                    >
                        <span className="absolute top-0 right-0 bg-gray-100 text-segundaria-900 text-xs font-semibold px-2 py-1 rounded-bl-md rounded-tr-lg">
                            Popular
                        </span>
                        <div className="flex gap-5 items-center">
                            <div className="bg-white rounded-xl p-3">
                                <Image
                                    src="/img/landingPage/icon-pricing-evoluindo.png"
                                    alt="icon-pricing-evoluindo"
                                    width={28}
                                    height={28}
                                />
                            </div>
                            <h2 className="text-lg font-semibold text-white">Evoluindo</h2>
                        </div>
                        <p className="text-white text-lg font-light mt-3 mb-6">
                            Seu sucesso começa aqui e transforme sua jornada.
                        </p>
                        <div className="ml-2 py-2">
                            <span className="text-white text-4xl font-semibold">R$190</span>
                            <span className="text-white text-lg font-light">/mês</span>
                        </div>
                        <ul className="text-white text-lg font-light list-none mt-4">
                            <li className="flex items-center mb-2 text-sm font-light">
                                <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                    <CheckIcon fontSize="small" className="text-segundaria-900" />
                                </div>
                                Automatização de Pedidos
                            </li>
                            <li className="flex items-center mb-2 text-sm font-light">
                                <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                    <CheckIcon fontSize="small" className="text-segundaria-900" />
                                </div>
                                Gestão de Inventário em Tempo Real
                            </li>
                            <li className="flex items-center mb-2 text-sm font-light">
                                <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                    <CheckIcon fontSize="small" className="text-segundaria-900" />
                                </div>
                                Integração com Múltiplas Plataformas
                            </li>
                            <li className="flex items-center mb-2 text-sm font-light">
                                <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                    <CheckIcon fontSize="small" className="text-segundaria-900" />
                                </div>
                                Análise de Dados Avançada
                            </li>
                        </ul>
                        <button className="w-full mt-7 px-3 py-2 bg-white text-segundaria-900 rounded-full hover:bg-gray-200 cursor-pointer transition duration-300 ease-in-out">
                            Saiba Mais
                        </button>
                    </div>

                    <div className="bg-gray-100 rounded-2xl p-6 w-80 h-[500px]">
                        <div className="flex gap-5 items-center">
                            <div className="bg-white rounded-xl p-3">
                                <Image
                                    src="/img/landingPage/icon-pricing-potencializando.png"
                                    alt="icon-pricing-potencializando"
                                    width={28}
                                    height={28}
                                />
                            </div>
                            <h2 className="text-lg font-semibold">Potencializando</h2>
                        </div>
                        <p className="text-lg font-medium mt-3 mb-6">
                            Alcance excelentes resultados de forma simples e eficiente.
                        </p>
                        <div className="ml-2 py-2">
                            <span className="text-4xl font-semibold">R$240</span>
                            <span className=" text-lg font-light">/mês</span>
                        </div>
                        <ul className="text-lg font-light list-none mt-4 h-32">
                            <li className="flex items-center mb-2 text-sm font-light">
                                <div className="bg-segundaria-900 rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                    <CheckIcon fontSize="small" className="text-white" />
                                </div>
                                Automação Avançada
                            </li>
                            <li className="flex items-center mb-2 text-sm font-light">
                                <div className="bg-segundaria-900 rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                    <CheckIcon fontSize="small" className="text-white" />
                                </div>
                                Análise de Dados em Tempo Real
                            </li>
                            <li className="flex items-center mb-2 text-sm font-light">
                                <div className="bg-segundaria-900 rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                    <CheckIcon fontSize="small" className="text-white" />
                                </div>
                                Suporte Prioritário
                            </li>
                            <li className="flex items-center mb-2 text-sm font-light">
                                <div className="bg-segundaria-900 rounded-full w-6 h-6 flex items-center justify-center p-1 mr-2">
                                    <CheckIcon fontSize="small" className="text-white" />
                                </div>
                                Personalização e Escalabilidade
                            </li>
                        </ul>
                        <button className="w-full mt-7 px-3 py-2 bg-segundaria-900 text-white rounded-full hover:bg-segundaria-800 cursor-pointer transition duration-300 ease-in-out">
                            Saiba Mais
                        </button>
                    </div>
                </div>
            </article>

            <footer className="w-full h-[440px] bg-segundaria-900 flex justify-between items-center gap-20 px-16 py-20 rounded-t-2xl">
                <div className="w-1/2 flex flex-col items-center">
                    <div className="flex flex-col gap-3">
                        <h4 className="text-white font-medium text-2xl">Ainda ficou com duvida?</h4>
                        <span className="text-white">Preencha sua dúvida no campo ao lado e nosso consultor entrará em contato.</span> 
                        <div className="relative w-80">
                            <input type="text" className="w-full h-10 rounded-2xl px-4 py-2 bg-transparent ring-1 ring-gray-100 pr-10" placeholder="" />
                            <ArrowForwardIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer" />
                        </div>                        
                        <div className="flex gap-3">
                            <TelegramIcon className="text-white cursor-pointer"/>
                            <InstagramIcon className="text-white cursor-pointer"/>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 flex flex-wrap items-center">
                    <div className="w-1/2 flex flex-col mt-8">
                        <h2 className="text-white opacity-50 uppercase text-sm">Suporte</h2>
                        <nav className="flex flex-col gap-2 mt-4">
                            <a href="#" className="w-52 text-white opacity-80 hover:opacity-100 transition duration-300 ease-in-out hover:border-b hover:border-white">
                                Grupo no Telegram
                            </a>
                            <a href="#" className="w-52 text-white opacity-80 hover:opacity-100 transition duration-300 ease-in-out hover:border-b hover:border-white">
                                Central de Ajuda
                            </a>
                            <a href="#" className="w-52 text-white opacity-80 hover:opacity-100 transition duration-300 ease-in-out hover:border-b hover:border-white">
                                Termo e condições
                            </a>
                            <a href="#" className="w-52 text-white opacity-80 hover:opacity-100 transition duration-300 ease-in-out hover:border-b hover:border-white">
                                Política de privacidade
                            </a>
                        </nav>
                    </div>
                    <div className="w-1/2 flex flex-col mt-8">
                        <h2 className="text-white opacity-50 uppercase text-sm">Empresa</h2>
                        <nav className="flex flex-col gap-2 mt-4">
                            <a href="#" className="w-20  text-white opacity-80 hover:opacity-100 transition duration-300 ease-in-out hover:border-b hover:border-white">
                                Sobre
                            </a>
                            <a href="#" className="w-20 text-white opacity-80 hover:opacity-100 transition duration-300 ease-in-out hover:border-b hover:border-white">
                                Blog
                            </a>
                            <a href="#" className="w-20 text-white opacity-80 hover:opacity-100 transition duration-300 ease-in-out hover:border-b hover:border-white">
                                Carreiras
                            </a>
                        </nav>
                    </div>
                    <div className="w-1/2 flex flex-col mt-8">
                        <h2 className="text-white opacity-50 uppercase text-sm">Contato</h2>
                        <nav className="flex flex-col gap-2 mt-4">
                            <a href="#" className="w-40 text-white opacity-80 hover:opacity-100 transition duration-300 ease-in-out hover:border-b hover:border-white">
                                Fale Conosco
                            </a>
                            <a href="#" className="w-40 text-white opacity-80 hover:opacity-100 transition duration-300 ease-in-out hover:border-b hover:border-white">
                                Suporte
                            </a>
                            <a href="#" className="w-40 text-white opacity-80 hover:opacity-100 transition duration-300 ease-in-out hover:border-b hover:border-white">
                                FAQ
                            </a>
                        </nav>
                    </div>
                    <div className="w-1/2 flex flex-col mt-8">
                        <h2 className="text-white font-light opacity-50 uppercase">Integrações</h2>
                        <nav className="flex flex-col gap-2 mt-4">
                            <a href="#" className="w-32 text-white opacity-80 hover:opacity-100 transition duration-300 ease-in-out hover:border-b hover:border-white">
                                Shopee
                            </a>
                            <a href="#" className="w-32 text-white opacity-80 hover:opacity-100 transition duration-300 ease-in-out hover:border-b hover:border-white">
                                Mercado Livre
                            </a>
                            <a href="#" className="w-32 text-white opacity-80 hover:opacity-100 transition duration-300 ease-in-out hover:border-b hover:border-white">
                                Amazon
                            </a>
                            <a href="#" className="w-32 text-white opacity-80 hover:opacity-100 transition duration-300 ease-in-out hover:border-b hover:border-white">
                                Magalu
                            </a>
                        </nav>
                    </div>
                </div>
                
            </footer>
        </div>
    );
}
