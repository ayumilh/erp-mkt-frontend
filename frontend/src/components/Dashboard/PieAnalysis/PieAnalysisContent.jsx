import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PieAnalysisHeader from "./PieAnalysisHeader";
import Pie from "./Pie";

const PieAnalysisContent = () => {
  return (
    <div className="bg-primaria-900 shadow-lg border border-slate-100 rounded-20 max-w-[373px] md:max-w-[688px] lg:max-w-[254px] lg:mx-0 xl:max-w-[282px] min-h-max px-5 py-5 mb-7 mx-2 xs:mx-auto">
      <PieAnalysisHeader />
      <div className="flex flex-col lg:justify-between">
        <button className="flex items-center space-x-2">
          <span className="opacity-90 hover:opacity-100 text-[15px] font-medium">Semana</span>
          <KeyboardArrowDownIcon className="-mr-1 ml-2 h-5 w-5"/>
        </button>

        <Pie />

        <div className="pt-4">
          <button
            aria-controls="btn-pie"
            aria-haspopup="true"
            className="w-[182px] px-2 py-1 rounded-md border-gray-200 hover:border-[#c7c7c7] focus:outline-none focus:ring-1 focus:ring-[#d4d4d4]"
          >
            <span className="opacity-90 hover:opacity-100 text-sm font-medium">Ranking de vendas</span>
            <KeyboardArrowDownIcon className="-mr-1 ml-2 h-5 w-5"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PieAnalysisContent;
