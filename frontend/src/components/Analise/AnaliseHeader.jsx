import { DropdownRelatoriosHeader } from "./Actions/DropdownRelatoriosHeader";
import FilterPlataformasHeader from "./Actions/FilterPlataformasHeader";

export const AnaliseHeader = ({ setActiveTable }) => {
  return (
    <div className="w-full lg:w-[876px] xl:w-[1270px] flex flex-col mb-6">
      <div className="flex mb-8 gap-6">
        <DropdownRelatoriosHeader setActiveTable={setActiveTable} />
      </div>

      <div className="flex flex-wrap gap-3 justify-start md:justify-end px-4 md:px-0 md:gap-6">
        <div className="flex flex-row">
          <button className="px-4 py-2 text-sm text-neutral-800 hover:text-black font-medium border border-gray-200 hover:bg-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
          Últimos 7 dias
          </button>
          <button className="px-4 py-2 text-sm text-neutral-800 hover:text-black font-medium border border-gray-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Últimos 30 dias
          </button>
          <button className="px-4 py-2 text-sm text-neutral-800 hover:text-black font-medium border border-gray-200 hover:bg-gray-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
            Este mês
          </button>
        </div>
        <div>
          <FilterPlataformasHeader />
        </div>
      </div>

    </div>
  )
}
