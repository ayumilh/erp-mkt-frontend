import BtnActive from '../../Geral/Button/BtnActive';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const NfActionsFilter = () => {
  return (
    <div className="bg-primaria-900 hover:shadow-input transition-all ease-in duration-500 rounded-2xl xl:flex min-w-[345px] md:min-w-[720px] lg:min-w-[876px] xl:min-w-[1264px] min-h-max px-4 py-5 xl:px-8 xl:items-center">
      <h2 className='text-sm lg:text-base text-colorFont-200 font-semibold'>O que você procura?</h2>
      
      <form className="mt-[14px] md:flex md:justify-around xl:ml-5">

        <div className="flex mt-4 md:mt-0 xl:ml-5">
          <select title='Contas NFe' className="rounded px-3 py-2 mr-2 w-1/2 lg:w-[160px] xl:w-[200px] text-xs md:text-sm opacity-80 font-normal" name="contasNFe" id="contasNFe">
            <option className="text-sm opacity-80 font-normal" value="nEstante">Contas NF-e</option>
            <option className="text-sm opacity-80 font-normal" value="tudo">Tudo</option>
          </select>
          <select title='Todos os estados' className="rounded px-3 py-2 mr-2 w-1/2 lg:w-[160px] xl:w-[200px] text-xs md:text-sm opacity-80 font-normal" name="todosEstados" id="todosEstados">
            <option className="text-sm opacity-80 font-normal" value="nEstante">Todos os estados</option>
            <option className="text-sm opacity-80 font-normal" value="tudo">Tudo</option>
            <option className="text-sm opacity-80 font-normal" value="emitido">Emitido</option>
            <option className="text-sm opacity-80 font-normal" value="cancelado">Cancelado</option>
            <option className="text-sm opacity-80 font-normal" value="denegado">Denegado</option>
          </select>
        </div>

        <div className="flex mt-4 md:mt-0 xl:ml-5">
          <select title='Número NFe' className="rounded px-3 py-2 mr-2 w-1/2 lg:w-[160px] xl:w-[200px] text-xs md:text-sm opacity-80 font-normal" name="numNFe" id="numNFe">
            <option className="text-sm opacity-80 font-normal" value="nEstante">Número do NF-e</option>
            <option className="text-sm opacity-80 font-normal" value="tudo">Tudo</option>
          </select>
          <div className="flex items-center rounded w-full relative">
            <SearchIcon className='h-5 w-5 absolute right-10 top-1/2 transform -translate-y-1/2'/>
            <input title='Pesquise por' className="w-full rounded overflow-hidden text-xs md:text-sm font-normal pr-8 pl-3 py-2" type="text" placeholder="" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} />
            <button className="rounded" type="button">
              <FilterListIcon className='h-6 w-6 ml-[6px]'/>
            </button>
          </div>
        </div>

        <div className="flex justify-between mt-4 md:mt-0 xl:ml-4">
          <BtnActive title="Pesquisar" size="btnSimple"/>
        </div>
      </form>
    </div>
  )
}

export default NfActionsFilter