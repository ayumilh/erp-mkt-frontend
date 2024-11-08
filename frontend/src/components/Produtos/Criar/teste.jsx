"use client";
import { useState } from "react";
import axios from "axios";
import { searchUserId } from '@/utils/searchUserId';
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import BtnActions from "@/components/Geral/Button/BtnActions";

const steps = [
  { titulo: "Informações Basica", subtitulo: "Preencha as informações básicas do seu produto" },
  { titulo: "Venda", subtitulo: "Defina a marca, garantia e o código GTIN" },
  { titulo: "Mídia", subtitulo: "Adicione fotos e vídeos do seu produto" },
];

function CriarAnuncioContent() {
  const [input, setInputs] = useState({
    title: "",
    price: "",
    quantity: "",
    listing: "",
    condition: "",
    description: "",
    // video_id: "",
    garantia: "",
    tempo_garantia: "",
    pictures: "",
    marca: "",
    gtin: "",
  });

  const inputChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleCriar = async (e) => {
    e.preventDefault();

    const userId = searchUserId();
    if (!userId) return;

    try {
      await axios.post(
        "https://erp-mkt.vercel.app/api/mercadolivre/criar-anuncio", {
          formData: input,
          userId: userId 
        });
    } catch (error) {
      console.error(error);
    }
  };

  const [garantia, setGarantia] = useState("");
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "garantia") {
      setGarantia(value);
    }
  };

  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className='lg:flex lg:gap-28'>
      <form className="rounded-xl w-[373px] md:w-[620px] lg:w-[548px] md:p-6 py-5 px-4">
        <div className="flex flex-col gap-4">
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.titulo}>
                <div>
                  <h2 className="text-lg font-semibold opacity-90">{step.titulo}</h2>
                  {activeStep === index && (<>
                    <p className="text-sm md:text-base font-medium opacity-90">{step.subtitulo}</p>
                    {index === 0 && (
                      <div className="flex flex-col gap-6 mt-8 mb-7 ml-4">
                        <input
                          onChange={inputChange}
                          name="title"
                          className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                          type="text"
                          placeholder="Nome do Produto"
                        />

                        <input
                          onChange={inputChange}
                          name="description"
                          className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                          type="text"
                          placeholder="Descrição"
                        />

                        <input
                          onChange={inputChange}
                          name="quantity"
                          className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                          type="text"
                          placeholder="Quantidade"
                        />

                        <input
                          onChange={inputChange}
                          name="price"
                          className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                          type="text"
                          placeholder="R$ 00,00"
                        />

                        <div className="flex flex-col">
                          <span className="mb-2 font-medium opacity-90">
                            Listagem
                          </span>
                          <div className="flex flex-col md:flex-row gap-4">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                value="gold_pro"
                                name="listing"
                                onChange={inputChange}
                                className="text-segundaria-800"
                              />
                              <span className="font-normal ml-2">
                                Premium
                              </span>
                            </label>
                            <label>
                              <input
                                type="radio"
                                value="gold_special"
                                name="listing"
                                onChange={inputChange}
                              />
                              <span className="font-normal ml-2">
                                Clássico
                              </span>
                            </label>
                            <label>
                              <input
                                type="radio"
                                value="free"
                                name="listing"
                                onChange={inputChange}
                              />
                              <span className="font-normal ml-2">Grátis</span>
                            </label>
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <span className="mb-2 font-medium opacity-90">
                            Condição
                          </span>
                          <div className="flex flex-col md:flex-row gap-4">
                            <label>
                              <input
                                type="radio"
                                value="new"
                                name="condition"
                                onChange={inputChange}
                              />
                              <span className="font-normal ml-2">Novo</span>
                            </label>
                            <label>
                              <input
                                type="radio"
                                value="used"
                                name="condition"
                                onChange={inputChange}
                              />
                              <span className="font-normal ml-2">Usado</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                    {index === 1 && (
                      <div className="flex flex-col gap-6 mt-8 mb-7 ml-4">
                        <div className="flex flex-col">
                          <span className="mb-2 font-medium opacity-90">
                            Garantia
                          </span>
                          <div className="flex flex-col md:flex-row gap-4">
                            <label>
                              <input
                                type="radio"
                                value="Garantia do vendedor"
                                name="garantia"
                                onChange={inputChange}
                              />
                              <span className="font-normal ml-2">
                                Garantia do vendedor
                              </span>
                            </label>
                            <label>
                              <input
                                type="radio"
                                value="De Fábrica"
                                name="garantia"
                                onChange={inputChange}
                              />
                              <span className="font-normal ml-2">
                                De Fábrica
                              </span>
                            </label>
                            <label>
                              <input
                                type="radio"
                                value="Sem garantia"
                                name="garantia"
                                onChange={inputChange}
                              />
                              <span className="font-normal ml-2">
                                Sem garantia
                              </span>
                            </label>
                          </div>
                        </div>

                        {garantia !== "Sem garantia" && (
                          <div className="flex flex-col">
                            <input
                              onChange={inputChange}
                              name="tempo_garantia"
                              className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                              type="text"
                              placeholder="Tempo de garantia"
                            />
                          </div>
                        )}

                        <input
                          onChange={inputChange}
                          name="marca"
                          className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                          type="text"
                          placeholder="Marca"
                        />

                        <input
                          onChange={inputChange}
                          name="gtin"
                          className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                          type="text"
                          placeholder="GTIN"
                        />
                      </div>
                    )}
                    {index === 2 && (
                      <div className="flex flex-col gap-6 mt-8 mb-7 ml-4">
                        <input
                          onChange={inputChange}
                          name="video_id"
                          className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                          type="url"
                          placeholder="Vídeo ID"
                        />

                        <input
                          onChange={inputChange}
                          name="pictures"
                          className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                          type="url"
                          placeholder="Pictures"
                        />
                      </div>
                    )}
                  </>)}
                </div>
              </Step>
            ))}
          </Stepper>
          <div className='flex gap-3 my-9'>
            {activeStep > 0 && (
              <BtnActions title="Voltar" onClick={handleBack} color="desativado" />
            )}
            {activeStep < 3 ? (
              <BtnActions title="Próximo" onClick={handleNext} color="ativado" />
            ) : (
              <BtnActions title="Criar anúncio" onClick={handleCriar} color="ativado" />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default CriarAnuncioContent;
