import BtnActive from '@/components/Geral/Button/BtnActive';
import SearchIcon from '@mui/icons-material/Search';
import BtnActionsFilter from '../Geral/Dropdown/BtnActionsFilter';

const AnliseActionsFilter = () => {
  return (
    <div className="bg-primaria-900 hover:shadow-input transition-all ease-in duration-500 rounded-2xl xl:flex min-w-full min-h-max px-4 py-5 mb-7 xl:px-8 xl:items-center justify-center">
      <h2 className='text-sm lg:text-base text-neutral-700 font-semibold'>O que você procura?</h2>
      
      <form className="mt-[14px] md:flex md:justify-around xl:ml-5">

        <div className="flex items-center rounded w-full md:w-[300px] lg:w-[360px] relative">
          <SearchIcon className='h-5 w-5 absolute left-[6px] top-1/2 transform -translate-y-1/2 dark:text-gray-300'/>
          <input title='Pesquise por' className="w-full rounded overflow-hidden text-xs md:text-sm font-normal pl-8 pr-3 py-2" type="text" placeholder="Pesquise por SKU, Nome, Lojas e etc" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} />
          <BtnActionsFilter />
        </div>

        <div className="flex mt-4 md:mt-0 xl:ml-5">
          <select title='Lojas' className="rounded px-3 py-2 mr-2 w-1/2 lg:w-[160px] xl:w-[200px] text-xs md:text-sm opacity-80 font-normal" name="lojas" id="lojas">
            <option className="text-sm opacity-80 font-normal" value="lojas">Lojas</option>
            <option className="text-sm opacity-80 font-normal" value="magalu">Magalu</option>
            <option className="text-sm opacity-80 font-normal" value="mercadoLivre">Mercado Livre</option>
          </select>
          <select title='Status do produto' className="rounded px-3 py-2 w-1/2 lg:w-[160px] xl:w-[200px] text-xs md:text-sm opacity-80 font-normal" name="status" id="status">
            <option className="text-sm opacity-80 font-normal" value="status">Status</option>
            <option className="text-sm opacity-80 font-normal" value="inativo">Inativo</option>
            <option className="text-sm opacity-80 font-normal" value="quantidade">Quantidade</option>
            <option className="text-sm opacity-80 font-normal" value="semEstoque">Sem estoque</option>
          </select>
        </div>

        <div className="flex justify-between mt-4 md:mt-0 xl:ml-4">
          <BtnActive title="Pesquisar" size="btnSimple" />
        </div>
      </form>
    </div>
  )
}

export default AnliseActionsFilter