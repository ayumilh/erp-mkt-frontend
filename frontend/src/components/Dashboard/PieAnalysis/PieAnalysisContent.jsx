import dynamic from "next/dynamic";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PieAnalysisHeader from "./PieAnalysisHeader";
import ChartFilterWeek from "@/components/Geral/Dropdown/ChartFilterWeek";

const PieRankingChart = dynamic(() => import('./PieRankingChart'), { ssr: false });


const PieAnalysisContent = () => {
  return (
    <div className="bg-primaria-900 shadow-lg border border-slate-100 rounded-2xl w-full min-h-max px-5 py-5 mb-7 mx-2 xs:mx-auto">
      <PieAnalysisHeader />
      <div className="flex flex-col lg:justify-between">
        <ChartFilterWeek />

        <PieRankingChart />

        <div className="pt-4">
          <button
            aria-controls="btn-pie"
            aria-haspopup="true"
            className="bg-primaria-900 inline-flex justify-center w-full rounded-md border border-gray-200 hover:border-[#c7c7c7] focus:outline-none focus:ring-1 focus:ring-[#d4d4d4] px-2 py-1 transition duration-300 ease-in-out"
          >
            <span className="opacity-90 hover:opacity-100 text-sm font-medium transition duration-300 ease-in-out">Ranking de vendas</span>
            <KeyboardArrowDownIcon className="-mr-1 ml-2 h-5 w-5"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PieAnalysisContent;
