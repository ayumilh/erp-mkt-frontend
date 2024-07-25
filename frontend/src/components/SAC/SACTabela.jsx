import Image from 'next/image';
import { SACMenuMoreResponsive } from "./Actions/SACMenuMoreResponsive";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

const SACTabela = () => {

  return (
    <div className="bg-primaria-900 rounded-2xl w-[345px] md:w-[728px] lg:w-[903px] xl:w-[1270px] flex flex-col my-10 overflow-x-auto">
      {/* <table className="table-auto min-w-full">
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          <tr className='border-b border-gray-200 hover:bg-gray-100 cursor-pointer'>
            <td className="w-[200px] xl:w-auto flex items-center gap-3 pl-6 pr-4 py-4 md:py-5">
              <Image src="" alt='Imagem do produto' width='42' height='42' className="bg-gray-200 w-10 h-10" />
            </td>
            <td className="break-words md:break-normal px-4 py-4 md:py-5">
              <p className="font-medium">Kit Com 3 Calças Moletom Infantil E Juvenil Tamanho 4 Ao 16</p>
            </td>
            <td className="px-4 py-4 md:py-5 text-center">R$ 78,99</td>
            <td className="px-4 py-4 md:py-5 text-center">10</td>
            <td className="px-4 py-4 md:py-5 text-center">
              <span className='rounded-full px-3 py-2'>Pendente</span>
            </td>
          </tr>
          <tr className='border-b border-gray-200 hover:bg-gray-100 cursor-pointer'>
            <td className="w-[200px] xl:w-auto flex items-center gap-3 pl-6 pr-4 py-4 md:py-5">
              <Image src="" alt='Imagem do produto' width='42' height='42' className="bg-gray-200 w-10 h-10" />
            </td>
            <td className="break-words md:break-normal px-4 py-4 md:py-5">
              <p className="font-medium">Kit Com 3 Calças Moletom Infantil E Juvenil Tamanho 4 Ao 16</p>
            </td>
            <td className="px-4 py-4 md:py-5 text-center">R$ 78,99</td>
            <td className="px-4 py-4 md:py-5 text-center">10</td>
            <td className="px-4 py-4 md:py-5 text-center">
              <span className='rounded-full px-3 py-2'>Pendente</span>
            </td>
          </tr>
        </tbody>
      </table> */}
      <div>
        <div>
          <div className='border-b border-gray-200 p-7'>
            <div className="flex justify-between items-center">
              <div className='flex items-center gap-2'>
                <Image src="" alt='Imagem do produto' width='42' height='42' className="bg-gray-200 w-10 h-10" />
                <div className="break-words md:break-normal">
                  <p className="w-80 font-medium text-sm text-neutral-800 overflow-hidden whitespace-nowrap text-ellipsis">Kit Com 3 Calças Moletom Infantil E Juvenil Tamanho 4 Ao 16</p>
                  <span className='text-blue-500 cursor-pointer'>MLB3484087407</span>
                </div>
              </div>

              <div className='flex items-center gap-1'>
                <span className="text-center">R$ 78,99</span>
                <span>X 10Un</span>
                <span><ContentPasteSearchIcon fontSize='small' className='cursor-pointer text-neutral-600'/></span>
                <span>|</span>
                <span className='font-medium text-sm text-neutral-800'>Mercado Envios Agências</span>
              </div>

              <div>
                <span className='font-medium text-sm text-neutral-800'>Lene Modas</span>
              </div>
            </div>

            <div className='flex flex-col items-start mx-3 mt-7'>
              <div className='flex flex-col items-center gap-1'>
                <div className='flex gap-5'>
                  <span className='font-semibold'>Olá, consigo comprar 3 bermudas azul marinho? TAM 4</span>
                  <span className='text-neutral-700'>24/07/2024 21:42</span>
                </div>
                <div className='flex gap-1'>
                  <span className='text-neutral-600 font-medium'>Comprador: </span>
                  <span className='text-neutral-700 font-medium'>CARDOSOJSSICA73</span>
                  <span>|</span>
                  <span className='text-neutral-600 font-medium'>Registração: </span>
                  <span className='text-neutral-700 font-medium'>06/09/2012 07:56</span>
                </div>
              </div>

              <div className='bg-gray-200 rounded-lg px-4 py-2 mt-5 mx-5'>
                <span className='text-neutral-700'>Boa noite, consegue sim é só confirmar a compra que por essa mensagem sabemos as cores que deseja</span>
                <div>
                  <span className='text-blue-500 cursor-pointer'>24/07/2024 11:55</span>
                  <span> | </span>
                  <span className='text-blue-500 cursor-pointer'>Tempo de Resposta: <span className='text-red-500'> 1,05h</span></span>
                </div>
              </div>
            </div>
          </div>

          <div className='border-b border-gray-200 p-7'>
            <div className="flex justify-between items-center">
              <div className='flex items-center gap-2'>
                <Image src="" alt='Imagem do produto' width='42' height='42' className="bg-gray-200 w-10 h-10" />
                <div className="break-words md:break-normal">
                  <p className="w-80 font-medium text-sm text-neutral-800 overflow-hidden whitespace-nowrap text-ellipsis">Kit Com 3 Calças Moletom Infantil E Juvenil Tamanho 4 Ao 16</p>
                  <span className='text-blue-500 cursor-pointer'>MLB3484087407</span>
                </div>
              </div>

              <div className='flex items-center gap-1'>
                <span className="text-center">R$ 78,99</span>
                <span>X 10Un</span>
                <span><ContentPasteSearchIcon fontSize='small' className='cursor-pointer text-neutral-600'/></span>
                <span>|</span>
                <span className='font-medium text-sm text-neutral-800'>Mercado Envios Agências</span>
              </div>

              <div>
                <span className='font-medium text-sm text-neutral-800'>Lene Modas</span>
              </div>
            </div>

            <div className='flex flex-col items-start mx-3 mt-7'>
              <div className='flex flex-col items-center gap-1'>
                <div className='flex gap-5'>
                  <span className='font-semibold'>Olá, consigo comprar 3 bermudas azul marinho? TAM 4</span>
                  <span className='text-neutral-700'>24/07/2024 21:42</span>
                </div>
                <div className='flex gap-1'>
                  <span className='text-neutral-600 font-medium'>Comprador: </span>
                  <span className='text-neutral-700 font-medium'>CARDOSOJSSICA73</span>
                  <span>|</span>
                  <span className='text-neutral-600 font-medium'>Registração: </span>
                  <span className='text-neutral-700 font-medium'>06/09/2012 07:56</span>
                </div>
              </div>

              <div className='bg-gray-200 rounded-lg px-4 py-2 mt-5 mx-5'>
                <span className='text-neutral-700'>Boa noite, consegue sim é só confirmar a compra que por essa mensagem sabemos as cores que deseja</span>
                <div>
                  <span className='text-blue-500 cursor-pointer'>24/07/2024 11:55</span>
                  <span> | </span>
                  <span className='text-blue-500 cursor-pointer'>Tempo de Resposta: <span className='text-red-500'> 1,05h</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SACTabela;