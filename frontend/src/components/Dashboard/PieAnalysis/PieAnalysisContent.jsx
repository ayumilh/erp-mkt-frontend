import dynamic from "next/dynamic";
import PieAnalysisHeader from "./PieAnalysisHeader";
import ChartFilterWeek from "@/components/Geral/Dropdown/ChartFilterWeek";
import RankingFilter from "@/components/Geral/Dropdown/RankingFilter";

const PieRankingChart = dynamic(() => import('./PieRankingChart'), { ssr: false });

const PieAnalysisContent = () => {
  return (
    <div className="bg-primaria-900 dark:bg-dark-primaria-900 shadow-lg border border-slate-100 dark:border-neutral-800 rounded-2xl w-full min-h-max px-5 py-5 mb-7 mx-2 xs:mx-auto">
      <PieAnalysisHeader />
      <div className="flex flex-col lg:justify-between">
        <ChartFilterWeek />

        <PieRankingChart />

        <RankingFilter />
      </div>
    </div>
  );
};

export default PieAnalysisContent;
