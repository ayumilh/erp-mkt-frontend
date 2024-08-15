import Image from "next/image";
import {
  FaShippingFast,
  FaBoxOpen,
  FaChartLine,
  FaDollarSign,
  FaUsers,
  FaCogs,
} from "react-icons/fa";

export default function Home() {
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

      <main className="flex flex-col mt-12">
        <h1 className="text-2xl font-semibold text-center mb-4">
          ERP: Inovação e Maestria na Gestão que
          <span className="block text-segundaria-900 font-semibold text-2xl py-1">
            Simplifica e Acelera o seu Negócio
          </span>
        </h1>
        <div className="flex flex-row justify-center">
          <Image
            src="/img/print-dashboard.png"
            alt="print-dashboard"
            width={900}
            height={500}
          />
        </div>

        <section className="flex flex-col items-center mt-14 mb-20">
          <div className="flex flex-row justify-center gap-20 w-full">
            <div className="w-72 h-52 flex flex-col items-center p-4 rounded-lg shadow-sm">
              <FaShippingFast className="text-4xl text-segundaria-900 mb-2" />
              <h2 className="text-xl font-semibold mb-2">
                Eficiência Operacional
              </h2>
              <p className="text-center">
                Nosso sistema de dropshipping e ERP integra todos os processos,
                garantindo uma operação eficiente e sem complicações.
              </p>
            </div>
            <div className="w-72 h-52 flex flex-col items-center p-4 rounded-lg shadow-sm">
              <FaBoxOpen className="text-4xl text-segundaria-900 mb-2" />
              <h2 className="text-xl font-semibold mb-2">Redução de Custos</h2>
              <p className="text-center">
                Com a nossa solução, você economiza em armazenamento e
                logística, permitindo investir mais em crescimento e inovação.
              </p>
            </div>
            <div className="w-72 h-52 flex flex-col items-center p-4 rounded-lg shadow-sm">
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

      <section className="h-[500px] w-full bg-gray-100 flex flex-col items-center my-20">
        <h2 className="text-2xl font-semibold mt-16 mb-8">
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
    </div>
  );
}
