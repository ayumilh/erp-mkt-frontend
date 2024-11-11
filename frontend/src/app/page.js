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
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import BtnActive from '@/components/Geral/Button/BtnActive';

import PlansAndPrices from '@/components/LandingPage/PlansAndPrices';
import Footer from '@/components/LandingPage/Footer';
import Navbar from '@/components/LandingPage/Navbar';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    useEffect(() => {
        gsap.fromTo(".animate-link", 
            {
                opacity: 0,
                y: -10
            }, 
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power1",
                stagger: 0.3
            }
        );

        gsap.fromTo(".animate-image",
            {
                opacity: 0,
                y: -50,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.3,
                scrollTrigger: {
                    trigger: ".animate-image",
                    start: "top 550px",
                    end: "bottom 800px",
                },
            }
        );

        gsap.fromTo(".animate",
            {
                opacity: 0,
                y: -50,
            }, 
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                stagger: 0.3,
                scrollTrigger: {
                    trigger: ".animate",
                    start: "top 100%",
                    end: "bottom bottom",
                },
            }
        );

        gsap.fromTo(".animate-title", 
            {
                opacity: 0,
                y: -10
            }, 
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "sine.out",
                stagger: 0.3,
                scrollTrigger: {
                    trigger: ".animate",
                    start: "top 350px",
                    end: "bottom 500px",
                },
            }
        );

        gsap.fromTo(".animate-tool-div", 
            {
                opacity: 0,
                y: -10
            }, 
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power1.out",
                stagger: 0.3,
                scrollTrigger: {
                    trigger: ".animate",
                    start: "top 200px",
                    end: "bottom 500px",
                },
            }
        );
    }, []);

    return (
        <div className="flex flex-col dark:bg-white">
            <header className="w-full h-20 flex flex-row items-center justify-between px-5 xl:px-20 py-5">
                <div className="w-full flex justify-between md:justify-normal flex-row items-center">
                    <div>
                        <Image src="/img/logo.png" alt="logo" width={120} height={120} />
                    </div>
                    <Navbar />
                </div>

                <div className="hidden md:flex w-full flex-row justify-end items-center gap-4">
                    <button className="bg-gray-50 hover:bg-gray-100 shadow-sm rounded-full px-3 py-1 transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out">
                        <a
                            className="w-full text-neutral-700 font-medium text-sm"
                        >
                            Teste Grátis
                        </a>
                    </button>
                    <button className=" bg-segundaria-900 hover:bg-segundaria-800 shadow-md hover:shadow-lg rounded-full px-3 py-1 transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out">
                        <a href="/login" className="text-white font-medium text-sm">
                            Entrar
                        </a>
                    </button>
                </div>
            </header>

            <main className="flex flex-col mt-28 md:mt-36">
                <div className='flex flex-col justify-center items-center'>
                    <h1 className="animate-link text-2xl md:text-4xl font-semibold text-center mb-8">
                        ERP: Inovação e Maestria na Gestão que
                        <span className="block text-segundaria-900 font-semibold text-4xl py-2">
                            Simplifica e Acelera o seu Negócio
                        </span>
                    </h1>
                    <p className='w-full xl:w-2/6 animate-link font-semibold text-lg text-neutral-700 text-center flex justify-center flex-wrap md:px-20'>
                        Uma visão holística do seu negócio, facilitando a tomada de decisões estratégicas e aumentando a eficiência operacional.
                    </p>
                    <div className='mt-8 animate-link'>
                        <BtnActive title="Começar teste grátis" page="/cadastro" width="full" size="btnHeader" padding="lg" fontSize="lg"/>
                    </div>
                </div>

                <div className="flex flex-row justify-center mt-20">
                    <div className='animate-image'>
                        <Image
                            src="/img/landingPage/print-dashboard.png"
                            alt="print-dashboard"
                            width={900}
                            height={500}
                        />
                    </div>
                </div>

                <section className="flex flex-col items-center mt-14 h-[840px] lg:h-auto">
                    <div className="flex flex-col lg:flex-row justify-center gap-7 xl:gap-20 w-full">
                        <div className="w-full lg:w-72 h-52 flex flex-col items-center p-4 rounded-lg lg:shadow-sm animate">
                            <LocalShippingIcon style={{ width: '40px' }} className="text-segundaria-900 mb-2" />
                            <h2 className="text-xl font-semibold mb-2">
                                Eficiência Operacional
                            </h2>
                            <p className="text-center text-neutral-700 font-medium px-20 lg:px-0">
                                Nosso sistema de dropshipping e ERP integra todos os processos,
                                garantindo uma operação eficiente e sem complicações.
                            </p>
                        </div>
                        <div className="w-full lg:w-72 h-52 flex flex-col items-center p-4 rounded-lg lg:shadow-sm animate">
                            <Inventory2Icon style={{ width: '40px' }} className="text-segundaria-900 mb-2" />
                            <h2 className="text-xl font-semibold mb-2">Redução de Custos</h2>
                            <p className="text-center text-neutral-700 font-medium px-20 lg:px-0">
                                Com a nossa solução, você economiza em armazenamento e
                                logística, permitindo investir mais em crescimento e inovação.
                            </p>
                        </div>
                        <div className="w-full lg:w-72 h-52 flex flex-col items-center p-4 rounded-lg lg:shadow-sm animate">
                            <ShowChartIcon style={{width: '40px' }} className="text-segundaria-900 mb-2" />
                            <h2 className="text-xl font-semibold mb-2">Escalabilidade</h2>
                            <p className="text-center text-neutral-700 font-medium px-20 lg:px-0">
                                Nossa plataforma permite que você expanda seu negócio
                                facilmente, adicionando novos produtos e alcançando mais
                                clientes sem complicações.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <section className="h-full w-full bg-gray-100 flex flex-col justify-center items-center mb-20 md:mb-0 my-20 py-10">
                <div className="w-10 mb-3">
                    <hr className="w-full border-segundaria-900 border-[1.5px]" />
                </div>
                <h2 className="animate-title text-center text-xl md:text-2xl font-semibold mb-8 px-20">
                    Transforme Desafios em Oportunidades com Nosso Sistema de Dropshipping
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="animate-tool-div w-64 h-32 flex flex-row items-start p-4">
                        <FaBoxOpen className="text-4xl text-segundaria-900 mr-4" />
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold mb-1">Gestão de Estoque</h3>
                            <p className="text-sm">
                                Controle de estoque simplificado e automatizado.
                            </p>
                        </div>
                    </div>
                    <div className="animate-tool-div w-64 h-32 flex flex-row items-start p-4">
                        <FaChartLine className="text-4xl text-segundaria-900 mr-4" />
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold mb-1">Análise de Vendas</h3>
                            <p className="text-sm">
                                Ferramentas avançadas para análise de vendas.
                            </p>
                        </div>
                    </div>
                    <div className="animate-tool-div w-64 h-32 flex flex-row items-start p-4">
                        <FaDollarSign className="text-xl text-segundaria-900 mr-4 mt-3" />
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold mb-1">Redução de Custos</h3>
                            <p className="text-sm">
                                Reduza custos operacionais com nosso sistema.
                            </p>
                        </div>
                    </div>
                    <div className="animate-tool-div w-64 h-32 flex flex-row items-start p-4">
                        <FaUsers className="text-5xl text-segundaria-900 mr-4" />
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold mb-1">Suporte ao Cliente</h3>
                            <p className="text-sm">
                                Melhore o suporte ao cliente com nossas ferramentas.
                            </p>
                        </div>
                    </div>
                    <div className="animate-tool-div w-64 h-32 flex flex-row items-start p-4">
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
                    <div className="animate-tool-div w-64 h-32 flex flex-row items-start p-4">
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

            <PlansAndPrices />

            <Footer />
        </div>
    );
}
