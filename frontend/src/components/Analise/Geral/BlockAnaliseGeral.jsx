import { FaMoneyBillWave, FaRegMoneyBillAlt, FaClipboardList, FaShoppingCart } from 'react-icons/fa'
import React from 'react';

const BlockAnaliseGeral = () => {
  const blocosDados = [
    { Icon: FaMoneyBillWave, titulo: 'Líquido', valor: 'R$ 10.000', cor: 'bg-yellow-400', corBorda: '#facc15' },
    { Icon: FaRegMoneyBillAlt, titulo: 'Receitas', valor: 'R$ 20.000', cor: 'bg-blue-500', corBorda: '#3b82f6' },
    { Icon: FaClipboardList, titulo: 'Pendentes', valor: '15', cor: 'bg-green-400', corBorda: '#4ade80' },
    { Icon: FaShoppingCart, titulo: 'Devolução', valor: '0', cor: 'bg-orange-400', corBorda: '#fb923c' },
  ];

  return (
    <div className="blocos-topo flex items-center flex-wrap gap-2 md:gap-4 justify-center md:justify-around mb-10 mt-5">
      {blocosDados.map((bloco) => (
        <div key={bloco.titulo} className="w-40 lg:w-[185px] xl:w-60 flex items-center justify-center gap-3 shadow-lg px-4 py-3 rounded-xl" style={{borderRight: '4px solid', borderColor: bloco.corBorda}}>
          <div className={`w-8 h-8 xl:w-10 xl:h-10 flex items-center justify-center rounded-full ${bloco.cor} shadow-md`}>
            <bloco.Icon className='text-white' size={18}/>
          </div>
          <div className='flex flex-col'>
            <h2 className="text-sm text-neutral-900 font-medium">{bloco.titulo}</h2>
            <p className='text-neutral-700'>{bloco.valor}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlockAnaliseGeral;