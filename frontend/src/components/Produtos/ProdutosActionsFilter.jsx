import BtnActive from '@/components/Geral/Button/BtnActive';
import BtnActionsFilter from '../Geral/Dropdown/BtnActionsFilter';

const ProdutosActionsFilter = ({ setSearchTerm, searchTerm, searchColumn, setSearchColumn, onFilterChange, setFilteredProducts }) => {
  const handleFilteredProductsData = (data) => {
    setFilteredProducts(data);
  };

  return (
    <div className="bg-primaria-900 dark:bg-dark-primaria-900 hover:shadow-input transition-all ease-in duration-500 rounded-2xl xl:flex w-full min-h-max px-4 py-5 xl:px-8 xl:items-center">
      <h2 className='text-sm lg:text-base text-neutral-700 dark:text-gray-200 font-semibold whitespace-nowrap'>O que você procura?</h2>

      <form className="mt-[14px] md:flex lg:justify-start 2xl:justify-center xl:ml-5 w-full">
        <div className='flex w-full items-center'>
          <div className="flex w-2/6 md:w-3/6 xl:w-2/6 2xl:w-1/6">
            <select
              title='Coluna de Pesquisa'
              className="dark:bg-neutral-800 w-full dark:text-gray-200 h-9 rounded-l text-xs md:text-sm font-normal py-2 px-3"
              value={searchColumn}
              onChange={(e) => setSearchColumn(e.target.value)}
            >
              <option value="title" title='Nome do Produto'>Produto</option>
              <option value="product_sku" title='SKU do Produto'>SKU</option>
            </select>
          </div>

          <div className="flex w-4/6">
            <input
              title='Pesquise por'
              className="w-full dark:bg-neutral-800 dark:text-gray-200 h-9 rounded-r overflow-hidden text-xs md:text-sm font-normal px-3 py-2 placeholder:italic"
              style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              type="text"
              placeholder="Pesquisar..."
              value={searchTerm || ''}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <BtnActionsFilter onConfirm={handleFilteredProductsData} />
          </div>
        </div>

        <div className="flex w-full mt-4 md:mt-0">
          <div className='flex w-1/2'>
            <select title='Lojas' className="rounded dark:bg-neutral-800 dark:text-gray-200 px-3 py-2 mr-2 w-full text-xs md:text-sm text-neutral-800 font-normal" name="lojas" id="lojas">
              <option className="text-sm text-neutral-800 dark:text-gray-200 font-normal" value="lojas">Lojas</option>
              <option className="text-sm text-neutral-800 dark:text-gray-200 font-normal" value="magalu">Magalu</option>
              <option className="text-sm text-neutral-800 dark:text-gray-200 font-normal" value="mercadoLivre">Mercado Livre</option>
            </select>
          </div>
          <div className='flex w-1/2'>
            <select onChange={(e) => onFilterChange(e.target.value)} title='Status do produto' className="rounded dark:bg-neutral-800 dark:text-gray-200 px-3 py-2 w-full text-xs md:text-sm text-neutral-800 font-normal" name="status" id="status">
              <option className="text-sm text-neutral-800 font-normal dark:text-gray-200" value="all">Status</option>
              <option className="text-sm text-neutral-800 font-normal dark:text-gray-200" value="active">Ativo</option>
              <option className="text-sm text-neutral-800 font-normal dark:text-gray-200" value="under_review">Revisando</option>
              <option className="text-sm text-neutral-800 font-normal dark:text-gray-200" value="paused">Pausado</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between mt-4 md:mt-0 md:ml-2 2xl:ml-5">
          <BtnActive title="Pesquisar" size="btnSimple" />
        </div>
      </form>
    </div>
  )
}

export default ProdutosActionsFilter