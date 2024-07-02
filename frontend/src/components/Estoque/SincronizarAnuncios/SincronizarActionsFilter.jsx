import BtnActive from '@/components/Geral/Button/BtnActive';
import SearchIcon from '@mui/icons-material/Search';

const SincronizarActionsFilter = () => {
  return (
    <div className="bg-primaria-900 hover:shadow-input transition-all ease-in duration-500 rounded-2xl min-w-[373px] md:min-w-[720px] lg:min-w-[876px] xl:min-w-[1264px] min-h-max px-4 py-5 mb-7 xs:mx-auto xl:px-8 xl:items-center">
      <h2 className='text-sm lg:text-base text-colorFont-200 font-semibold'>O que você procura?</h2>
      
      <form className="mt-[14px] flex flex-col lg:flex-row md:justify-around xl:ml-5 gap-3 lg:gap-2">

        <div className='flex gap-2'>
          <select title='Categorias' className="rounded p-2 w-1/2 lg:w-[160px] xl:w-[200px] text-sm opacity-80 font-normal" name="categoria" id="categoria">
            <option className="text-sm opacity-80 font-normal" value="Categorias">Categorias</option>
          </select>
          <select title='Status de estoque' className="rounded p-2 w-1/2 lg:w-[160px] xl:w-[200px] text-sm opacity-80 font-normal overflow-hidden" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', }} name="statusEstoque" id="statusEstoque">
            <option className="text-sm opacity-80 font-normal" value="Todos">Todos</option>
            <option className="text-sm opacity-80 font-normal" value="StatusEstoque">Status de estoque</option>
            <option className="text-sm opacity-80 font-normal" value="EstoqueBaixo">Estoque baixo</option>
            <option className="text-sm opacity-80 font-normal" value="Disponivel">Disponivel</option>
          </select>
        </div>

        <div className='flex lg:w-[250px] xl:w-[380px]'>
          <select title='Pesquise por' style={{borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} className="p-2 w-1/2 lg:w-[120px] xl:w-1/2 text-sm opacity-80 font-normal" name="SKU" id="SKU">
            <option className="text-sm opacity-80 font-normal" value="SKU">SKU</option>
            <option className="text-sm opacity-80 font-normal" value="CodigoBarras">Código de barras</option>
            <option className="text-sm opacity-80 font-normal" value="NomeProduto">Nome do produto</option>
            <option className="text-sm opacity-80 font-normal" value="NEstante">N da estante</option>
          </select>

          <div className="flex items-center rounded w-1/2 relative">
            <input title='Pesquise por SKU' style={{borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} className="w-full h-[38px] overflow-hidden text-sm font-normal px-2 md:pr-8 py-2" type="text"/>
            <SearchIcon className='h-5 w-5 absolute right-[6px] top-1/2 transform -translate-y-1/2 opacity-80'/>
          </div>
        </div>

        <div className="flex">
          <select title='Status da venda' className="rounded p-2 w-full lg:w-[160px] xl:w-[220px] text-sm opacity-80 font-normal overflow-hidden" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} name="statusVenda" id="statusVenda">
            <option className="text-sm opacity-80 font-normal" value="TodosStatusVenda">Todos os status de venda</option>
            <option className="text-sm opacity-80 font-normal" value="Ativo">Ativo</option>
            <option className="text-sm opacity-80 font-normal" value="Inativo">Inativo</option>
          </select>
        </div>

        <div className="flex justify-between">
          <BtnActive title="Pesquisar" size="btnSimple"/>
        </div>
      </form>
    </div>
  )
}

export default SincronizarActionsFilter