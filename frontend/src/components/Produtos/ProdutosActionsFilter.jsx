import BtnActive from '@/components/Geral/Button/BtnActive';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const ProdutosActionsFilter = ({ onFilterChange }) => {
  return (
    <div className="bg-primaria-900 hover:shadow-input transition-all ease-in duration-500 rounded-2xl xl:flex min-w-[345px] md:min-w-[720px] lg:min-w-[876px] xl:min-w-[1264px] min-h-max px-4 py-5 xl:px-8 xl:items-center">
      <h2 className='text-sm lg:text-base text-colorFont-200 font-semibold'>O que você procura?</h2>
      
      <form className="mt-[14px] md:flex md:justify-around xl:ml-5">

        <div className="flex items-center rounded w-full md:w-[300px] lg:w-[360px] relative">
          <SearchIcon className='h-5 w-5 absolute left-[6px] top-1/2 transform -translate-y-1/2'/>
          <input title='Pesquise por' className="w-full rounded overflow-hidden text-xs md:text-sm font-normal pl-8 pr-3 py-2" type="text" placeholder="Pesquise por SKU, Nome, Lojas e etc" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} />
          <button className="rounded" type="button">
            <FilterListIcon className='h-6 w-6 ml-[6px]'/>
          </button>
        </div>

        <div className="flex mt-4 md:mt-0 xl:ml-5">
          <select title='Lojas' className="rounded px-3 py-2 mr-2 w-1/2 lg:w-[160px] xl:w-[200px] text-xs md:text-sm opacity-80 font-normal" name="lojas" id="lojas">
            <option className="text-sm opacity-80 font-normal" value="lojas">Lojas</option>
            <option className="text-sm opacity-80 font-normal" value="magalu">Magalu</option>
            <option className="text-sm opacity-80 font-normal" value="mercadoLivre">Mercado Livre</option>
          </select>
          <select onChange={(e) => onFilterChange(e.target.value)} title='Status do produto' className="rounded px-3 py-2 w-1/2 lg:w-[160px] xl:w-[200px] text-xs md:text-sm opacity-80 font-normal" name="status" id="status">
            <option className="text-sm opacity-80 font-normal" value="all">Status</option>
            <option className="text-sm opacity-80 font-normal" value="active">Ativo</option>
            <option className="text-sm opacity-80 font-normal" value="under_review">Revisando</option>
            <option className="text-sm opacity-80 font-normal" value="paused">Pausado</option>
          </select>
        </div>

        <div className="flex justify-between mt-4 md:mt-0 xl:ml-4">
          <BtnActive title="Pesquisar" size="btnSimple" />
        </div>
      </form>
    </div>
  )
}

export default ProdutosActionsFilter