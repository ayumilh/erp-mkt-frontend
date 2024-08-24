'use client'
import { useRouter } from "next/navigation";

const DashboardTarefas = () => {
  const router = useRouter()

  const handleRetiradaClick = () => {
    router.push('/pedidos?activeTable=Retirada');
  };

  return (
    <div className="bg-primaria-900 shadow-lg border border-slate-100 rounded-2xl max-w-[373px] md:max-w-[688px] lg:w-[596px] xl:min-w-[958px] lg:mx-0 min-h-max px-4 lg:px-5 xl:pl-8 xl:pr-0 py-5 xl:py-7 mb-7 mx-2 xs:mx-auto">

      <h2 className='text-base text-colorFont-200 font-semibold'>Lista de tarefas</h2>

      <div className="flex flex-col gap-9 w-full xl:w-[760px] xl:4">
        <div className="flex flex-wrap justify-start">
          <div 
            onClick={handleRetiradaClick}
            className="w-[152px] xl:w-[182px] h-[60px] flex flex-col items-center justify-center cursor-pointer"
          >
            <p className="font-semibold">0</p>
            <p className="w-[115px] px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium overflow-hidden" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Para Enviar</p>
          </div>

          <div 
            onClick={handleRetiradaClick}
            className="w-[152px] xl:w-[182px] h-[60px] flex flex-col items-center justify-center">
            <p className="font-semibold">0</p>
            <p className="w-[115px] px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium overflow-hidden" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Expirará em Breve</p>
          </div>

          <div 
            onClick={handleRetiradaClick}
            className="w-[152px] xl:w-[182px] h-[60px] flex flex-col items-center justify-center">
            <p className="font-semibold">0</p>
            <p className="w-[115px] px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium overflow-hidden" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Retirada</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-start">
          <div className="w-[152px] xl:w-[182px] h-[60px] flex flex-col items-center justify-center">
            <p className="font-semibold">0</p>
            <p className="w-[115px] px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium overflow-hidden" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Estoque Baixo</p>
          </div>

          <div className="w-[152px] xl:w-[182px] h-[60px] flex flex-col items-center justify-center">
            <p className="font-semibold">0</p>
            <p className="w-[115px] px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium overflow-hidden" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Sem Estoque</p>
          </div>
        
          <div className="w-[152px] xl:w-[182px] h-[60px] flex flex-col items-center justify-center">
            <p className="font-semibold">0</p>
            <p className="w-[115px] px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium overflow-hidden" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Estoque Baixo(MELI Full)</p>
          </div>

          <div className="w-[152px] xl:w-[182px] h-[60px] flex flex-col items-center justify-center">
            <p className="font-semibold">0</p>
            <p className="w-[115px] px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium overflow-hidden" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Sem Estoque(MELI Full)</p>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-start">
          <div className="w-[152px] xl:w-[182px] h-[60px] flex flex-col items-center justify-center">
            <p className="font-semibold">0</p>
            <p className="w-[115px] px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium overflow-hidden" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Perguntas Pendente do MELI</p>
          </div>

          <div className="w-[152px] xl:w-[182px] h-[60px] flex flex-col items-center justify-center">
            <p className="font-semibold">0</p>
            <p className="w-[115px] px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium overflow-hidden" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Mensagens não lidos do MELI</p>
          </div>
          <div className="w-[152px] xl:w-[182px] h-[60px] flex flex-col items-center justify-center">
            <p className="font-semibold">0</p>
            <p className="w-[115px] px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium overflow-hidden" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Reclamação pendente do MELI</p>
          </div>

          <div className="w-[152px] xl:w-[182px] h-[60px] flex flex-col items-center justify-center">
            <p className="font-semibold">0</p>
            <p className="w-[115px] px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium overflow-hidden" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Devolução pendente/reembolso do Shopee</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTarefas;
