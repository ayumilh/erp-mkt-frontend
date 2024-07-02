import { ChartContentVendas } from "./Charts/ChartContentVendas"
import VendasTabela from "./Tabela/VendasTabela"
import { VendasResumoMiniTabela } from "./Tabela/VendasResumoMiniTabela"

const VendasContent = () => {
  return (
    <div style={{height: '1200px'}}>
      <div className="xl:flex xl:gap-7 xl:max-w-[1270px] mt-3 lg:mt-5">
        <ChartContentVendas />
        <VendasResumoMiniTabela />
      </div>

      <VendasTabela />
    </div>
  )
}

export default VendasContent