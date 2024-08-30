import BtnActive from '../Geral/Button/BtnActive';
import SearchIcon from '@mui/icons-material/Search';

const FeedbackActionsFilter = () => {
  return (
    <div className="bg-primaria-900 hover:shadow-input transition-all ease-in duration-500 rounded-2xl xl:flex w-[345px] md:w-[728px] lg:w-[903px] xl:w-[1270px] min-h-max px-4 py-5 xl:px-8 xl:items-center justify-center">
      <h2 className='text-sm lg:text-base text-neutral-700 font-semibold'>O que você procura?</h2>
      
      <form className="mt-[14px] md:flex md:justify-around xl:ml-5">
        <div className='flex'>
          <select title='N° Pedido' className="rounded-tl-md rounded-bl-md px-3 py-2 text-sm md:text-sm opacity-80 font-normal" name="pedido" id="pedido">
            <option className="text-sm opacity-80 font-normal" value="idAnuncio">ID dos Anúncios</option>
            <option className="text-sm opacity-80 font-normal" value="idAnuncio">Nome dos Anúncios</option>
            <option className="text-sm opacity-80 font-normal" value="nomeComprador">Nome do Comprador</option>
          </select>

          <div className="relative flex w-full">
            <input title='Pesquisar por' className="w-full rounded-tr-md rounded-br-md overflow-hidden text-xs md:text-sm font-normal pr-8 pl-3 py-2" type="text" />
            <SearchIcon className='h-5 w-5 absolute right-[6px] top-1/2 transform -translate-y-1/2'/>
          </div>
        </div>

        <div className="flex gap-2 mt-4 md:mt-0 xl:ml-5">
          <div className='flex gap-1'>
            <select title='Perguntas' className="rounded px-3 py-2 w-1/2 lg:w-[160px] xl:w-[200px] text-sm md:text-sm opacity-80 font-normal" name="perguntas" id="perguntas">
              <option className="text-sm opacity-80 font-normal" value="perguntas">Pergunta</option>
            </select>
            <input type="date" className="w-full rounded overflow-hidden text-sm md:text-sm font-normal pr-8 pl-3 py-2" />
          </div>

          <select title='Lojas' className="rounded px-3 py-2 mr-2 w-1/2 lg:w-[160px] xl:w-[200px] text-xs md:text-sm opacity-80 font-normal" name="lojas" id="lojas">
            <option className="text-sm opacity-80 font-normal" value="todasLojas">Todas as Lojas</option>
          </select>
        </div>

        <div className="flex justify-between mt-4 md:mt-0 xl:ml-4">
          <BtnActive title="Pesquisar" size="btnSimple"/>
        </div>
      </form>
    </div>
  )
}

export default FeedbackActionsFilter