import { useEffect, useState } from "react";
import Image from "next/image";
import BtnBackPage from "@/components/Geral/Button/BtnBackPage";
import { SwipeableDrawer } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("body");

export default function ModalDetailsProdutos({ onClose, selectedSku }) {
  const [isOpen, setIsOpen] = useState(true);
  const [product, setProduct] = useState({});
  const productSKU = selectedSku;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://erp-mkt.vercel.app/api/mercadolivre/productid?sku=${productSKU}`
        );
        setProduct(response.data.products[0]);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };
    fetchProduct();
  }, [productSKU]);

  const modalClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <div>
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={modalClose}
        onOpen={() => {}}
        sx={{
          width: ["100%", "560px"],
          "& .MuiDrawer-paper": {
            width: ["100%", "560px"],
          },
        }}
      >
        <div className="mx-4">
          <div className="w-full lg:w-full px-2 mt-11">
            <div className="mt-11">
              <BtnBackPage
                title="Detalhes do Produto"
                modal={true}
                onClose={modalClose}
              />
            </div>
            <div className="rounded-2xl shadow-lg mt-8">
              <div className="flex flex-col items-center pl-5 py-5 lg:px-8 lg:mt-0">
                <div className="w-52 h-52 my-7 flex justify-center items-center overflow-hidden">
                  {product.pictureurls ? (
                    <Image
                      src={product.pictureurls}
                      alt={
                        product.title || "Descrição do produto não disponível"
                      }
                      width={208}
                      height={208}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200">
                      Imagem não disponível
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-start gap-4">
                  <div>
                    <HelpOutlineIcon className="text-cyan-500 w-5 h-5 mr-2" />
                    <span className="text-cyan-500 font-medium">
                      Informações basicas
                    </span>
                  </div>
                  <div className="flex flex-col gap-3 px-2">
                    <div className="flex flex-row gap-4">
                      <span className="w-48 md:w-64 lg:w-[420px] text-neutral-800 dark:text-gray-200 text-lg">
                        {product.title}
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="w-24 lg:w-14 font-semibold dark:text-gray-300">Cores</span>
                      {product.color === "Azul-marinho" ? (
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            backgroundColor: "navy",
                          }}
                        ></div>
                      ) : product.color === "Preto" ? (
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            backgroundColor: "black",
                          }}
                        ></div>
                      ) : product.color === "Cinza" ? (
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            backgroundColor: "gray",
                          }}
                        ></div>
                      ) : product.color === "Cinza-escuro" ? (
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            backgroundColor: "darkgray",
                          }}
                        ></div>
                      ) : product.color === "Bordô" ? (
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            backgroundColor: "maroon",
                          }}
                        ></div>
                      ) : (
                        <span className="w-48 md:w-60 lg:w-60">
                          {product.color}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-row gap-4">
                      <span className="w-48 md:w-64 lg:w-[420px] text-end text-neutral-800 dark:text-gray-300 font-medium text-sm">
                        {product.product_sku}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <span className="text-cyan-500 opacity-90 text-2xl font-medium">
                        R${product.price}
                      </span>
                      <div className="bg-gray-50 dark:bg-neutral-800 rounded-xl px-3 py-2 flex items-center gap-2">
                        <span className="text-neutral-800 dark:text-gray-300 text-sm font-medium">
                          <Inventory2OutlinedIcon className="text-cyan-500 w-5 h-5 mr-2" />
                          Em estoque:
                        </span>
                        <span className="text-neutral-800 dark:text-gray-200 text-sm font-medium">
                          {product.available_quantity}
                        </span>
                      </div>
                    </div>

                    {/* <div className='flex flex-row gap-4'>
                                 <span className='w-24 lg:w-48 text-sm font-medium'>GTIN</span>
                                 <span className='w-48 md:w-64 lg:w-full'>{product.gtin}</span>
                              </div> */}
                  </div>
                  <div />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
}
