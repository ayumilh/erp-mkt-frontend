"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import BtnActions from "@/components/Geral/Button/BtnActions";
import { searchUserId } from '@/utils/searchUserId';

const steps = [
  {
    titulo: "Informações Basica",
    subtitulo: "Preencha as informações básicas do seu produto",
  },
  { titulo: "Venda", subtitulo: "Defina a marca, garantia e o código GTIN" },
  { titulo: "Mídia", subtitulo: "Adicione fotos e vídeos do seu produto" },
];

const EditarAnuncioContent = () => {
  const [input, setInputs] = useState({
    title: "",
    price: "",
    quantity: "",
    // listing: "",
    condition: "",
    // description: "",
    // video_id: "",
    warrantyType: "",
    warrantyTemp: "",
    pictureUrls: "",
    brand: "",
    gtin: "",
  });
  const inputChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const productSKU = Cookies.get("selectedSku");

  // buscando produto pelo sku
  useEffect(() => {
    const fetchProduct = async () => {
      const userId = searchUserId();
      if (!userId) {
        return;
      }

      try {
        const response = await axios.get(
          `https://erp-mkt.vercel.app/api/mercadolivre/productid?sku=${productSKU}`, {
          params: { userId }
        });
        setInputs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [productSKU]);


  // editar produto
  const handleEditar = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://erp-mkt.vercel.app/api/mercadolivre/update-anuncio`, {
        ...input,
        productSKU,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // condição da garantia
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
                          <input onChange={inputChange} name='title' value={input.title} className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Nome do Produto" />
                          {/* 
                          <input onChange={inputChange} name='description' value={input.description} className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Descrição"/> */}

                          <input
                            onChange={inputChange}
                            name="quantity"
                            value={input.quantity}
                            className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                            type="text"
                            placeholder="Quantidade"
                          />

                          <input
                            onChange={inputChange}
                            name="price"
                            value={input.price}
                            className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                            type="text"
                            placeholder="R$ 00,00"
                          />

                          {/* <div className="flex flex-col">
                            <span className='mb-2 font-medium opacity-90'>Listagem</span>
                            <div className='flex flex-col md:flex-row gap-4'>
                              <label className='flex items-center'>
                                <input type="radio" value="gold_pro" name="listing" checked={input.listing === 'gold_pro'} onChange={inputChange} className="text-segundaria-800"/>
                                <span className='font-normal ml-2'>Premium</span>
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  value="gold_special"
                                  name="listing"
                                  checked={input.listing === "gold_special"}
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
                                  checked={input.listing === "free"}
                                  onChange={inputChange}
                                />
                                <span className="font-normal ml-2">Grátis</span>
                              </label>
                            </div>
                          </div> */}

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
                                  checked={input.condition === "new"}
                                  onChange={inputChange}
                                />
                                <span className="font-normal ml-2">Novo</span>
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  value="used"
                                  name="condition"
                                  checked={input.condition === "used"}
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
                                  checked={
                                    input.warrantyType ===
                                    "Garantia do vendedor"
                                  }
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
                                  checked={input.warrantyType === "De Fábrica"}
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
                                  checked={
                                    input.warrantyType === "Sem garantia"
                                  }
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
                                value={input.warrantyTemp}
                                className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                                type="text"
                                placeholder="Tempo de garantia"
                              />
                            </div>
                          )}

                          <input
                            onChange={inputChange}
                            name="marca"
                            value={input.brand}
                            className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                            type="text"
                            placeholder="Marca"
                          />

                          <input
                            onChange={inputChange}
                            name="gtin"
                            value={input.gtin}
                            className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                            type="text"
                            placeholder="GTIN"
                          />
                        </div>
                      )}
                      {index === 2 && (
                        <div className="flex flex-col gap-6 mt-8 mb-7 ml-4">
                          {/* <input onChange={inputChange} name='video_id' value={input.video_id} className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="url" placeholder="Vídeo ID"/> */}

                          <input
                            onChange={inputChange}
                            name="pictures"
                            value={input.pictureUrls}
                            className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                            type="url"
                            placeholder="Fotos"
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
            {activeStep > 0 && (
              <BtnActions title="Voltar" onClick={handleBack} color="desativado" />
            )}
            {activeStep < 2 ? (
              <BtnActions title="Próximo" onClick={handleNext} color="ativado" />
            ) : (
              <BtnActions title="Editar anúncio" onClick={handleEditar} color="ativado" />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditarAnuncioContent;
