import { ChartContentLucros } from "./Charts/ChartContentLucros"
import { LucrosResumoMiniTabela } from "./Tabela/LucrosResumoMiniTabela"
import LucrosTabela from "./Tabela/LucrosTabela"

const LucrosContent = () => {
  return (
    <div style={{height: '1200px'}}>
      <div className="xl:flex xl:gap-7 xl:max-w-[1270px] mt-3 lg:mt-5">
        <ChartContentLucros />
        <LucrosResumoMiniTabela />
      </div>

      <LucrosTabela />
    </div>
  )
}

export default LucrosContent