import BtnActive from '../Geral/Button/BtnActive';
import BtnActionsFilter from '../Geral/Dropdown/BtnActionsFilter';

const PedidosActionsFilter = ({ setSearchTerm, searchTerm = '', searchColumn, setSearchColumn }) => {
  return (
    <div className="bg-primaria-900 dark:bg-dark-primaria-900 hover:shadow-input transition-all ease-in duration-500 rounded-2xl xl:flex w-full min-h-max px-4 py-5 xl:px-8 xl:items-center">
      <h2 className='text-sm lg:text-base text-neutral-700 dark:text-gray-200 font-semibold whitespace-nowrap'>O que você procura?</h2>

      <form className="mt-[14px] md:flex lg:justify-start 2xl:justify-center xl:ml-5 w-full">
        <div className='flex w-full items-center'>
          <div className="flex w-3/6 md:w-2/6">
            <select
              title='Coluna de Pesquisa'
              className="dark:bg-neutral-800 w-full dark:text-gray-200 h-9 rounded-l text-xs md:text-sm font-normal py-2 pl-2 pr-4"
              value={searchColumn}
              onChange={(e) => setSearchColumn(e.target.value)}
            >
              <option value="order_id" title='N° de Pedido'>Pedido</option>
              <option value="tracking_number" title='N° de Rastreio'>Rastreio</option>
              <option value="receiver_name" title='Nome do Comprador'>Comprador</option>
            </select>
          </div>

          <div className="flex w-4/6 md:w-4/6">
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
            <BtnActionsFilter />
          </div>
        </div>

        <div className="flex w-full mt-4 md:mt-0">
          <div className='flex w-1/2'>
            <select title='Número da estante' className="rounded dark:bg-neutral-800 dark:text-gray-200 px-3 py-2 mr-2 w-full text-xs md:text-sm text-neutral-800 font-normal" name="nEstante" id="nEstante">
              <option className="text-sm text-neutral-800 dark:text-gray-200 font-normal" value="nEstante">N° da Estante</option>
              <option className="text-sm text-neutral-800 dark:text-gray-200 font-normal" value="1">1</option>
              <option className="text-sm text-neutral-800 dark:text-gray-200 font-normal" value="2">2</option>
            </select>
          </div>
          <div className='flex w-1/2'>
            <select title='Armazém' className="rounded dark:bg-neutral-800 dark:text-gray-200 px-3 py-2 w-full text-xs md:text-sm text-neutral-800 font-normal" name="Armazem" id="Armazem">
              <option className="text-sm text-neutral-800 dark:text-gray-200 font-normal" value="Armazem">Armazém</option>
              <option className="text-sm text-neutral-800 dark:text-gray-200 font-normal" value="saoPaulo">São Paulo</option>
              <option className="text-sm text-neutral-800 dark:text-gray-200 font-normal" value="Guarulhos">Guarulhos</option>
              <option className="text-sm text-neutral-800 dark:text-gray-200 font-normal" value="Caraguatatuba">Caraguatatuba</option>
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

export default PedidosActionsFilter