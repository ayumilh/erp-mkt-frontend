'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import EditIcon from '@mui/icons-material/Edit';
import ModalDetailsProdutos from "./Actions/ModalDetailsProdutos";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SkeletonLoader from "@/components/Geral/SkeletonTableRow"
import ModalGerarProdutos from "./Actions/ModalGerarProdutos";
import { ProdutosMenuMoreResponsive } from "./Actions/ProdutosMenuMoreResponsive";


const ProdutosTabela = () => {
  const [products, setProducts] = useState([]);
  const [isModalTr, setIsModalTr] = useState(false);
  const [selectedSku, setSelectedSku] = useState(null);
  const [idProduct, setIdProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalGerar, setIsModalGerar] = useState(false);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [showCheckboxesAll, setShowCheckboxesAll] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://erp-mkt.vercel.app/api/mercadolivre/products");
        if (response.data && Array.isArray(response.data.products)) {
          const restructuredData = response.data.products.map((product) => {
            return {
              pictureUrls: product.pictureurls,
              sku: product.product_sku,
              title: product.title,
              price: product.product_sku,
              diameter: product.product_sku,
              status: product.status,
            };
          });
          setProducts(restructuredData);
        } else {
          console.error('Não foi possível obter os produtos');
          setProducts([]);
        }
      } catch (error) {
        console.error(`Error: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();

    const fetchSyncProducts = async () => {
      try {
        await axios.get("https://erp-mkt.vercel.app/api/mercadolivre/productsSync");
      } catch (syncError) {
        console.error(`Erro de sincronização: ${syncError}`);
      }
    };
    fetchSyncProducts();
  }, []);


  // selecionar todos os checkboxes
  useEffect(() => {
    if (showCheckboxesAll) {
      const allOrderIds = products.map(products => products.sku);
      setIdProduct(allOrderIds);
    }
  }, [showCheckboxesAll, products]);

  const handleCheckboxChange = (event, sku) => {
    event.stopPropagation(); 
    if (showCheckboxesAll || event.target.checked) {
      setIdProduct(prevItems => [...prevItems, sku]);
    } else {
      setIdProduct(prevItems => prevItems.filter(i => i !== sku));
    }
  };


  // modal da tabela
  const handleModal = (sku) => {
    setSelectedSku(sku);
    setIsModalTr(true);
  };
  const closeModal = () => {
    setIsModalTr(false);
  };

  const handleButtonClick = (sku) => {
    console.log('sku: ', sku);
    try {
      Cookies.set('selectedSku', sku);
      router.push('/produtos/editar');
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-200';
      case 'under_review':
        return 'bg-yellow-200';
      case 'paused':
        return 'bg-red-200';
      default:
        return '';
    }
  }

  return (
    <div className="bg-primaria-900 rounded-2xl w-[345px] md:w-[728px] lg:w-[903px] xl:w-[1270px] flex flex-col my-10 overflow-x-auto">
      <ProdutosMenuMoreResponsive 
        idProduct={idProduct}
        setIsModalGerar={setIsModalGerar}
        showCheckboxes={showCheckboxes} 
        setShowCheckboxes={setShowCheckboxes}
        setShowCheckboxesAll={setShowCheckboxesAll} 
        showCheckboxesAll={showCheckboxesAll}
      />
      <table>
        <thead>
          <tr>
            {(showCheckboxes || showCheckboxesAll) && <td className="pl-4"></td>}
            <th className="pr-4 pl-6 py-2 md:py-5 text-sm font-semibold text-center">SKU</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center">Nome</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center">Preço</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center">Pacote</th>
            <th className="pr-6 pl-4 py-2 md:py-5 text-sm font-semibold text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <SkeletonLoader numColumns={5}/>
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <tr key={product.sku} onClick={() => handleModal(product.sku)} className='border-b border-gray-200 hover:bg-gray-100 cursor-pointer'>
                {showCheckboxes && <td className="pl-4"><input type="checkbox" onClick={(event) => handleCheckboxChange(event, product.sku)} /></td>}
                {showCheckboxesAll && <td className="pl-4"><input type="checkbox" checked={true} onChange={() => {}}/></td>}
                <td className="w-[200px] xl:w-auto flex items-center gap-3 pl-6 pr-4 py-4 md:py-5">
                  {product.pictureUrls && <Image src={product.pictureUrls} alt='Imagem do produto' width='42' height='42' className="w-10 h-10" />} {product.sku}
                </td>
                <td className="break-words md:break-normal px-4 py-4 md:py-5"><p className="font-medium">{product.title}</p></td>
                <td className="px-4 py-4 md:py-5 text-center">{product.price}</td>
                <td className="px-4 py-4 md:py-5 text-center">{product.pacote}</td>
                <td className="px-4 py-4 md:py-5 text-center">
                  <span className={`${getStatusColor(product.status)} rounded-full px-3 py-2`}>{product.status}</span>
                </td>
                <td className="pl-4 pr-6 py-2 md:py-5 text-center">
                  <button
                    onClick={() => handleButtonClick(product.sku)}
                    className="flex items-center justify-center"
                  >
                    <EditIcon className="mr-1 h-4 md:h-5 w-4 md:w-5"/>
                  </button>     
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center" colSpan="7">
                <div className="w-52 ml-10 md:ml-0 md:px-10 md:w-full py-12">
                  <span><ProductionQuantityLimitsIcon style={{ width: 46, height: 46 }}/></span>
                  <p className="mt-8">Ops! Parece que as prateleiras estão vazias. Volte em breve para mais produtos!</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {isModalGerar && (
        <ModalGerarProdutos onClose={() => setIsModalGerar(false)} idProduct={idProduct} />
      )}
      {isModalTr && <ModalDetailsProdutos onClose={closeModal} selectedSku={selectedSku} />}
    </div>
  );
};

export default ProdutosTabela;