import BtnActive from '../Geral/Button/BtnActive';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const PedidosActionsFilter = () => {
  return (
    <div className="bg-primaria-900 dark:bg-dark-primaria-900 hover:shadow-input transition-all ease-in duration-500 rounded-2xl xl:flex w-full min-h-max px-4 py-5 xl:px-8 xl:items-center">
      <h2 className='text-sm lg:text-base text-neutral-700 dark:text-gray-200 font-semibold'>O que você procura?</h2>
      
      <form className="mt-[14px] md:flex md:justify-around xl:ml-5">

        <div className="flex items-center rounded w-full md:w-[270px] lg:w-[360px] relative">
          <SearchIcon className='h-5 w-5 absolute left-[6px] top-1/2 transform -translate-y-1/2 dark:text-gray-300'/>
          <input title='Pesquisar por' className="w-full rounded dark:bg-neutral-800 overflow-hidden text-xs md:text-sm font-normal pl-8 pr-3 py-2" type="text" placeholder="Pesquise por N° da estante, Armazém e etc" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} />
          <button className="rounded" type="button">
            <FilterListIcon className='h-6 w-6 ml-[6px] dark:text-gray-300 dark:hover:text-white'/>
          </button>
        </div>

        <div className="flex mt-4 md:mt-0 xl:ml-5">
          <select title='Número da estante' className="rounded dark:bg-neutral-800 dark:text-gray-200 px-3 py-2 mr-2 w-1/2 lg:w-[160px] xl:w-[200px] text-xs md:text-sm text-neutral-800 font-normal" name="nEstante" id="nEstante">
            <option className="text-sm text-neutral-800 dark:text-gray-200 font-normal" value="nEstante">N° da Estante</option>
            <option className="text-sm text-neutral-800 dark:text-gray-200 font-normal" value="1">1</option>
            <option className="text-sm text-neutral-800 dark:text-gray-200 font-normal" value="2">2</option>
          </select>
          <select title='Armazém' className="rounded dark:bg-neutral-800 dark:text-gray-200 px-3 py-2 w-1/2 lg:w-[160px] xl:w-[200px] text-xs md:text-sm text-neutral-800 font-normal" name="status" id="Armazem">
            <option className="text-sm text-neutral-800 dark:text-gray-200 font-normal" value="Armazem">Armazém</option>
            <option className="text-sm text-neutral-800 dark:text-gray-200 font-normal" value="saoPaulo">São Paulo</option>
            <option className="text-sm text-neutral-800 dark:text-gray-200 font-normal" value="Guarulhos">Guarulhos</option>
            <option className="text-sm text-neutral-800 dark:text-gray-200 font-normal" value="Caraguatatuba">Caraguatatuba</option>
          </select>
        </div>

        <div className="flex justify-between mt-4 md:mt-0 xl:ml-4">
          <BtnActive title="Pesquisar" size="btnSimple"/>
        </div>
      </form>
    </div>
  )
}

export default PedidosActionsFilter