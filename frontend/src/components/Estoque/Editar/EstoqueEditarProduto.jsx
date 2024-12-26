"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import BtnActions from "@/components/Geral/Button/BtnActions";

const steps = [
  {
    titulo: "Informações Basica",
    subtitulo: "Preencha as informações básicas do seu produto",
  },
];

export default function EstoqueEditarProduto() {
  const [input, setInputs] = useState({
    sku: "",
    categorias: "",
    nome_do_produto: "",
    custo_de_compra: "",
    peso_do_pacote: "",
    data_de_lancamento: "",
  });
  const inputChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const productSKU = Cookies.get("selectedSku");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stock/products/${productSKU}`);
        setInputs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [productSKU]);


  const handleEditar = async () => {
    try { 
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stock/update/products`, {
        ...input,
        productSKU,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="lg:flex lg:gap-28">
      <form className="rounded-xl w-[373px] md:w-[620px] lg:w-[548px] md:p-6 py-5 px-4">
        <div className="flex flex-col gap-4">
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.titulo}>
                <div>
                  <h2 className="text-lg font-semibold opacity-90">
                    {step.titulo}
                  </h2>
                  {activeStep === index && (
                    <>
                      <p className="text-sm md:text-base font-medium opacity-90">
                        {step.subtitulo}
                      </p>
                      {index === 0 && (
                        <div className="flex flex-col gap-6 mt-8 mb-7 ml-4">
                          <input
                            onChange={inputChange}
                            name="sku"
                            value={input.sku}
                            className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                            type="text"
                            placeholder="SKU"
                          />

                          <input
                            onChange={inputChange}
                            name="nome_do_produto"
                            value={input.nome_do_produto || ""}
                            className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                            type="text"
                            placeholder="Nome do produto"
                          />

                          <input
                            onChange={inputChange}
                            name="categorias"
                            value={input.categorias || ""}
                            className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                            type="text"
                            placeholder="Categorias"
                          />

                          <input
                            onChange={inputChange}
                            name="custo_de_compra"
                            value={input.custo_de_compra || ""}
                            className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                            type="text"
                            placeholder="Custo de compra"
                          />

                          <input
                            onChange={inputChange}
                            name="peso_do_pacote"
                            value={input.peso_do_pacote || ""}
                            className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                            type="text"
                            placeholder="Peso do pacote"
                          />

                          <input
                            onChange={inputChange}
                            name="data_de_lancamento"
                            value={input.data_de_lancamento || ""}
                            className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                            type="text"
                            placeholder="Data de lançamento"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </Step>
            ))}
          </Stepper>

          <div className="flex gap-3 my-9">
            <BtnActions title="Editar Produto" color="ativado" onClick={handleEditar} />
          </div>
        </div>
      </form>
    </div>
  );
}
