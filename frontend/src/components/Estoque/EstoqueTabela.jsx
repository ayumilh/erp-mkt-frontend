'use client'
import { useState } from "react";
import EstoqueRow from "./EstoqueRow";
import ModalDetailsEstoque from "./Actions/ModalDetailsEstoque";
import { EstoqueMenuMoreResponsive } from "./Actions/EstoqueMenuMoreResponsive";

const EstoqueTabela = () => {
  const [isModalTr, setIsModalTr] = useState(false);
  const [selectedSku, setSelectedSku] = useState(null);

  const closeModal = () => {
    setIsModalTr(false);
  }

  const handleSkuSelect = (sku) => {
    setSelectedSku(sku);
    setIsModalTr(true);
  }

  return (
    <div className="bg-primaria-900 dark:bg-dark-primaria-900 rounded-2xl w-[345px] md:w-[728px] lg:w-[903px] xl:w-[1270px] flex flex-col mt-4 mb-10 overflow-x-auto">
      <EstoqueMenuMoreResponsive />
      <table className="table-auto min-w-full">
        <thead>
          <tr>
            <th className="pr-4 pl-6 py-2 md:py-5 text-sm font-semibold dark:text-gray-200">Produto</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold dark:text-gray-200">SKU</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Custo de compra</th>
            <th className="pr-6 pl-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Criado/Atualizado</th>
          </tr>
        </thead>
        <tbody>
          <EstoqueRow setSku={handleSkuSelect}/>
        </tbody>
      </table>
      {isModalTr && <ModalDetailsEstoque onClose={closeModal} sku={selectedSku}/>}
    </div>
  );
};

export default EstoqueTabela;