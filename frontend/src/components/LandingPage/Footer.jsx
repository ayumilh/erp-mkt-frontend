import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Footer = () => {
    return (
        <footer className="w-full h-auto md:h-[440px] bg-segundaria-900 flex flex-col md:flex-row justify-between items-center gap-20 px-16 py-20 rounded-t-2xl">
            <div className="w-full md:w-1/2 flex flex-col items-center">
                <div className="flex flex-col gap-3">
                    <h4 className="text-white font-medium text-2xl">Ainda ficou com duvida?</h4>
                    <span className="text-white">Preencha sua dúvida no campo ao lado e nosso consultor entrará em contato.</span>
                    <div className="relative w-80">
                        <input type="text" className="w-full h-10 rounded-2xl px-4 py-2 bg-transparent ring-1 ring-gray-100 pr-10" placeholder="" />
                        <ArrowForwardIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer" />
                    </div>
                    <div className="flex gap-3">
                        <TelegramIcon className="text-white cursor-pointer" />
                        <InstagramIcon className="text-white cursor-pointer" />
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-wrap items-center">
                <div className="w-full md:w-1/2 flex flex-col mt-8">
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
                <div className="w-full md:w-1/2 flex flex-col mt-8">
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

            </div>
        </footer>
    )
}

export default Footer