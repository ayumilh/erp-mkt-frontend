import Image from "next/image";

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
            <a href="#teste-gratis" className="text-neutral-700 font-medium text-sm">
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
      </main>
    </div>
  );
}
