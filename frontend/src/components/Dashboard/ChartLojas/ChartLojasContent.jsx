import ChartLojasButton from "./ChartLojasButton";

const ChartLojasContent = () => {
  return (
    <div className="bg-primaria-900 shadow-lg border border-slate-100 rounded-20 max-w-[373px] md:max-w-[688px] lg:max-w-[596px] lg:mx-0 xl:min-w-[958px] px-4 lg:px-5 xl:px-8 py-5 xl:py-7 mb-7 lg:mb-0 mx-2 xs:mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className='text-base text-colorFont-200 font-semibold'>Lojas</h2> 
        <ChartLojasButton />
      </div>
     
      <div className="flex flex-row flex-wrap gap-6">
        <div>
          <h2 className="text-lg font-semibold opacity-80">0</h2>
          <h2 className="text-base font-normal opacity-90 hover:opacity-100 hover:cursor-pointer flex-wrap text-start">
            Quantidade de Vendas (Últimos 30 dias)
          </h2>
        </div>
        <div>
          <h2 className="text-lg font-semibold opacity-80">R$ 0,00</h2>
          <h2 className="text-base font-normal opacity-90 hover:opacity-100 hover:cursor-pointer flex-wrap text-center">
            Valor de Vendas (Últimos 30 dias)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ChartLojasContent;
