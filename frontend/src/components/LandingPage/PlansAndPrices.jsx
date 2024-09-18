'use client'
import { useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import Image from "next/image";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PlansAndPrices = () => {
    useEffect(() => {
        gsap.fromTo(".animate-title-plans", 
            {
                opacity: 0,
                y: -10
            }, 
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: null,
                scrollTrigger: {
                    trigger: ".animate-tool-div",
                    start: "top 350px",
                    end: "bottom 500px",
                },
            }
        );

        gsap.fromTo(".animate-content-bg", 
            {
                opacity: 0,
                y: -50,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: null,
                scrollTrigger: {
                    trigger: ".animate-content-bg",
                    start: "top 680px",
                    end: "bottom 800px",
                },
            }
        );

        gsap.fromTo(".animate-title-plans", 
            {
                opacity: 0,
                y: -10
            }, 
            {
                opacity: 1,
                y: 0,
                duration: 2,
                ease: "power1",
            }
        );

        gsap.fromTo(".animate-text-plans", 
            {
                opacity: 0,
                y: -10
            }, 
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power1",
                stagger: 0.05,
                scrollTrigger: {
                    trigger: ".animate-content-bg",
                    start: "top 640px",
                    end: "bottom 500px",
                },
            }
        );
    }, []);

    return (
        <article className="w-full flex flex-col justify-center items-center my-20">
            <div className="w-10 mb-3">
                <hr className="w-full border-segundaria-900 border-[1.5px]" />
            </div>
            <h2 className="animate-title-plans text-xl text-center md:text-2xl font-semibold mb-16">
                Desenvolvendo o plano ideal para o estágio atual do seu negócio
            </h2>
            <div className="flex flex-col lg:flex-row gap-20 lg:gap-4">
                <div className="animate-content-bg bg-gray-100 rounded-2xl p-6 w-80 h-[500px]">
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
                    <p className="animate-text-plans text-lg font-medium mt-3 mb-6">
                        Transforme seu projeto em realidade com confiança e inovação.
                    </p>
                    <div className="animate-text-plans ml-2 py-2">
                        <span className="text-4xl font-semibold">R$120</span>
                        <span className=" text-lg font-light">/mês</span>
                    </div>
                    <ul className="animate-text-plans text-lg font-light list-none mt-4 h-32">
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
                    <button className="animate-title-plans w-full mt-7 px-3 py-2 bg-segundaria-900 text-white rounded-full hover:bg-segundaria-800 cursor-pointer transition duration-300 ease-in-out">
                        Saiba Mais
                    </button>
                </div>

                <div
                    className="animate-content-bg relative bg-segundaria-900 rounded-2xl p-6 w-80 h-[500px]"
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
                    <p className="animate-text-plans text-white text-lg font-light mt-3 mb-6">
                        Seu sucesso começa aqui e transforme sua jornada.
                    </p>
                    <div className="animate-text-plans ml-2 py-2">
                        <span className="text-white text-4xl font-semibold">R$190</span>
                        <span className="text-white text-lg font-light">/mês</span>
                    </div>
                    <ul className="animate-text-plans text-white text-lg font-light list-none mt-4">
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
                    <button className="animate-title-plans w-full mt-7 px-3 py-2 bg-white text-segundaria-900 rounded-full hover:bg-gray-200 cursor-pointer transition duration-300 ease-in-out">
                        Saiba Mais
                    </button>
                </div>

                <div className="animate-content-bg bg-gray-100 rounded-2xl p-6 w-80 h-[500px]">
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
                    <p className="animate-text-plans text-lg font-medium mt-3 mb-6">
                        Alcance excelentes resultados de forma simples e eficiente.
                    </p>
                    <div className="animate-text-plans ml-2 py-2">
                        <span className="text-4xl font-semibold">R$240</span>
                        <span className=" text-lg font-light">/mês</span>
                    </div>
                    <ul className="animate-text-plans text-lg font-light list-none mt-4 h-32">
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
                    <button className="animate-title-plans w-full mt-7 px-3 py-2 bg-segundaria-900 text-white rounded-full hover:bg-segundaria-800 cursor-pointer transition duration-300 ease-in-out">
                        Saiba Mais
                    </button>
                </div>
            </div>
        </article>
    )
}
export default PlansAndPrices;