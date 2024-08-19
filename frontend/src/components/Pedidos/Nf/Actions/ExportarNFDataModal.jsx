import React, { useState } from "react";
import axios from "axios";

const ExportarNFDataModal = ({ isOpen, onClose }) => {
  const [exportarPor, setExportarPor] = useState("mes");
  const [mes, setMes] = useState("");
  const [tipoMes, setTipoMes] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [tipoData, setTipoData] = useState("");
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const start = dataInicial.replace(/-/g, "");
    const end = dataFinal.replace(/-/g, "");
    
    console.log("Exportar por:", start, end);
    try {
      const response = await axios.post(
        `https://erp-mkt.vercel.app/api/mercadolivre/export-note?start=${String(start)}&end=${String(end)}`);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-20 bg-gray-600 bg-opacity-50 overflow-y-auto">
      <div
        className="relative flex-col top-60 mx-auto py-5 px-6 border max-w-min rounded-md bg-primaria-900 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-gray-800 font-medium">
            Exportar NF-e Recente (XML)
          </h3>
          <button
            onClick={onClose}
            className="text-gray-800 hover:text-gray-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p className="px-2 pt-7 pb-4 w-full whitespace-normal text-neutral-700 text-sm">
          O arquivo exportado contém NF-es das empresas e será automaticamente
          dividido entre pastas.
        </p>

        <form className="pt-0 pb-4 px-2" onSubmit={handleSubmit}>
            <div className="flex">
                <label className="w-28 text-sm text-gray-800 mt-1">Exportar por</label>
                <div className="flex flex-col gap-8">
                    <div className="flex gap-3">
                    <div className="flex items-center gap-2">
                        <input
                        type="radio"
                        id="mes"
                        name="exportarPor"
                        value="mes"
                        className="cursor-pointer"
                        onChange={() => setExportarPor("mes")}
                        checked={exportarPor === "mes"}
                        />
                        <label htmlFor="mes" className="w-40 text-sm text-gray-800">
                        Mês
                        </label>
                        <select
                        className="ml-2 border rounded p-1 text-sm"
                        name="mes"
                        id="mesSelect"
                        onChange={(e) => setMes(e.target.value)}
                        disabled={exportarPor !== "mes"}
                        >
                        <option value="01">Janeiro</option>
                        <option value="02">Fevereiro</option>
                        <option value="03">Março</option>
                        <option value="04">Abril</option>
                        <option value="05">Maio</option>
                        <option value="06">Junho</option>
                        <option value="07">Julho</option>
                        <option value="08">Agosto</option>
                        <option value="09">Setembro</option>
                        <option value="10">Outubro</option>
                        <option value="11">Novembro</option>
                        <option value="12">Dezembro</option>
                        </select>
                        <select
                        className="ml-2 border rounded p-1 text-sm"
                        name="tipoMes"
                        id="tipoMesSelect"
                        onChange={(e) => setTipoMes(e.target.value)}
                        disabled={exportarPor !== "mes"}
                        >
                        <option value="tudo">Tudo</option>
                        <option value="normal">Normal</option>
                        <option value="devolucao">Devolução</option>
                        <option value="cce">CC-e</option>
                        <option value="invalidar">Invalidar N da NF-e</option>
                        </select>
                    </div>
                    </div>

                    <div className="flex items-center gap-2">
                    <input
                        type="radio"
                        id="dataPersonalizada"
                        name="exportarPor"
                        value="dataPersonalizada"
                        className="cursor-pointer"
                        onChange={() => setExportarPor("dataPersonalizada")}
                        checked={exportarPor === "dataPersonalizada"}
                    />
                    <label
                        htmlFor="dataPersonalizada"
                        className="w-40 text-sm text-gray-800"
                    >
                        Data Personalizada
                    </label>
                    <input
                        type="date"
                        className="ml-2 border rounded p-1 text-sm"
                        name="dataInicial"
                        id="dataInicial"
                        onChange={(e) => setDataInicial(e.target.value)}
                        disabled={exportarPor !== "dataPersonalizada"}
                    />
                    <span className="text-sm text-gray-800">até</span>
                    <input
                        type="date"
                        className="ml-2 border rounded p-1 text-sm"
                        name="dataFinal"
                        id="dataFinal"
                        onChange={(e) => setDataFinal(e.target.value)}
                        disabled={exportarPor !== "dataPersonalizada"}
                    />
                    <select
                        className="ml-2 border rounded p-1 text-sm"
                        name="tipoData"
                        id="tipoDataSelect"
                        onChange={(e) => setTipoData(e.target.value)}
                        disabled={exportarPor !== "dataPersonalizada"}
                    >
                        <option value="tudo">Tudo</option>
                        <option value="normal">Normal</option>
                        <option value="devolucao">Devolução</option>
                        <option value="cce">CC-e</option>
                        <option value="invalidar">Invalidar N da NF-e</option>
                    </select>
                    </div>
                </div>
            </div>
          <div className="flex justify-end mt-5">
            <button
              type="submit"
              className="px-4 py-2 bg-segundaria-900 text-white rounded-md text-sm"
            >
              Exportar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExportarNFDataModal;