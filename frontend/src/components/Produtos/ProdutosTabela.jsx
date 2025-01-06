'use client'
import { useEffect, useState, useRef } from "react";
import { searchUserId } from '@/utils/searchUserId';
import axios from "axios";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModalDetailsProdutos from "./Actions/ModalDetailsProdutos";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SkeletonLoader from "@/components/Geral/SkeletonTableRow"
import ModalGerarProdutos from "./Actions/ModalGerarProdutos";
import { ProdutosMenuMoreResponsive } from "./Actions/ProdutosMenuMoreResponsive";


const ProdutosTabela = ({ searchTerm, onFilterStatus, route }) => {
  const [products, setProducts] = useState([]);
  const [isModalTr, setIsModalTr] = useState(false);
  const [selectedSku, setSelectedSku] = useState(null);
  const [idProduct, setIdProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalGerar, setIsModalGerar] = useState(false);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [showCheckboxesAll, setShowCheckboxesAll] = useState(false);
  const router = useRouter();

  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const userId = searchUserId();
      if (!userId) return;

      try {
        const params = { userId };
        if (searchTerm && searchTerm.trim() !== '') {
          params.searchTerm = searchTerm.toLowerCase();
        }

        let response;
        if (route === 'mercadolivre') {
          response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mercadolivre/products`, { params });
        } else if (route === 'shopee') {
          response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/shopee/products`, { params: { userId } });
        }
        if (response.data && Array.isArray(response.data.products)) {
          const restructuredData = response.data.products.map((product) => {
            return {
              pictureUrls: product.pictureurls,
              sku: product.product_sku,
              title: product.title,
              price: product.price,
              estoque: product.available_quantity,
              diameter: product.product_sku,
              status: product.status,
            };
          });
          setProducts(restructuredData);
          console.log(response.data.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error(`Error: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [route, searchTerm]);


  // selecionar todos os checkboxes
  useEffect(() => {
    if (showCheckboxesAll) {
      const allOrderIds = products.map(products => products.sku);
      setIdProduct(allOrderIds);
      setSelectedProducts(allOrderIds);
    }
  }, [showCheckboxesAll, products, setIdProduct]);

  const updateSelectedProducts = (isChecked, sku) => {
    if (!sku) return;

    let updatedSelectedProducts;
    if (isChecked) {
      updatedSelectedProducts = [...selectedProducts, sku];
    } else {
      updatedSelectedProducts = selectedProducts.filter(o => o !== sku);
    }

    setSelectedProducts(updatedSelectedProducts);
    setShowCheckboxes(updatedSelectedProducts.length > 0);
  };

  const handleCheckboxChange = (event, sku) => {
    event.stopPropagation();
    const isChecked = event.target.checked;

    updateSelectedProducts(isChecked, sku);

    if (showCheckboxesAll || isChecked) {
      setIdProduct(prevItems => [...new Set([...prevItems, sku])]);
    } else {
      setIdProduct(prevItems => prevItems.filter(i => i !== sku));
    }
  };

  const handleSelectAllChange = () => {
    setShowCheckboxesAll(!showCheckboxesAll);
  };

  const openProductDetailsModal = (sku) => {
    setSelectedSku(sku);
    setIsModalTr(true);
  };

  const closeModal = () => {
    setIsModalTr(false);
  };

  const storeSkuAndOpenEditModal = (event, sku) => {
    event.stopPropagation();
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
        return 'bg-green-200 text-green-600';
      case 'under_review':
        return 'bg-yellow-200 text-yellow-700';
      case 'paused':
        return 'bg-red-200 text-red-700';
      default:
        return '';
    }
  }

  function translateStatus(status) {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'under_review':
        return 'Revisão';
      case 'paused':
        return 'Pausado';
      default:
        return status;
    }
  }

  const produtosFiltrados = onFilterStatus === 'all'
    ? products
    : products.filter((product) => product.status === onFilterStatus);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(Math.ceil(produtosFiltrados.length / rowsPerPage));

  useEffect(() => {
    setTotalPages(Math.ceil(produtosFiltrados.length / rowsPerPage));
  }, [rowsPerPage, produtosFiltrados, setTotalPages]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const paginatedProducts = produtosFiltrados.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = Number(event.target.value);
    setRowsPerPage(newRowsPerPage);
    setTotalPages(Math.ceil(paginatedProducts.length / newRowsPerPage));
    handlePageChange(1);
  };

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuMoreVertRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuMoreVertRef.current && !menuMoreVertRef.current.contains(event.target)) {
        setIsOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuMoreVertRef])

  return (
    <div className="bg-primaria-900 dark:bg-dark-primaria-900 rounded-2xl w-full flex flex-col mt-4 mb-10 overflow-x-auto">
      <ProdutosMenuMoreResponsive
        idProduct={idProduct}
        setIsModalGerar={setIsModalGerar}
        showCheckboxes={showCheckboxes}
        setShowCheckboxes={setShowCheckboxes}
        setShowCheckboxesAll={setShowCheckboxesAll}
        showCheckboxesAll={showCheckboxesAll}
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
      />
      <div className='overflow-x-auto'>
        <table className="table-auto min-w-full">
          <thead className='sticky top-0 z-0 bg-primaria-900 dark:bg-dark-primaria-900'>
            <tr className="z-0">
              <td className="pl-4">
                <input
                  type="checkbox"
                  checked={showCheckboxesAll}
                  onChange={handleSelectAllChange}
                />
              </td>
              <th className="pr-4 pl-6 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">SKU</th>
              <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Nome</th>
              <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Preço</th>
              <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Estoque</th>
              <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Status</th>
              <th className="pl-4 pr-6 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <SkeletonLoader numColumns={7} />
            ) : paginatedProducts.length > 0 ? (
              paginatedProducts.slice(0, rowsPerPage).map((product, index) => (
                <tr
                  key={index}
                  className='border-b border-gray-200 dark:border-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-800'
                >
                  <td className="pl-4">
                    {!showCheckboxesAll && (
                      <input
                        type="checkbox"
                        onClick={() => setShowCheckboxes(true)}
                        onChange={(event) => { handleCheckboxChange(event, product.sku) }} />
                    )}
                    {showCheckboxesAll && (
                      <input type="checkbox" checked={true} onChange={() => { }} />
                    )}
                  </td>
                  <td className="w-[200px] xl:w-auto flex items-center gap-3 pl-6 pr-4 py-4 md:py-5">
                    {product.pictureUrls &&
                      <Image src={product.pictureUrls} alt='Imagem do produto' width='42' height='42' className="w-10 h-10" />
                    }
                    <button
                      className="text-blue-600 font-medium hover:underline focus:outline-none cursor-pointer"
                      onClick={() => openProductDetailsModal(product.sku)}
                    >
                      {product.sku}
                    </button>
                  </td>
                  <td className="break-words md:break-normal px-4 py-4 md:py-5"><p className="font-medium dark:text-gray-200">{product.title}</p></td>
                  <td className="px-4 py-4 md:py-5 text-center dark:text-gray-200">{product.price}</td>
                  <td className="px-4 py-4 md:py-5 text-center dark:text-gray-200">{product.estoque}</td>
                  <td className="px-4 py-4 md:py-5 text-center dark:text-gray-200">
                    <span className={`${getStatusColor(product.status)} w-24 rounded-full px-3 py-2 text-sm`}>{translateStatus(product.status)}</span>
                  </td>
                  <td className="flex pl-4 pr-6 py-2 md:py-5 justify-center gap-3">
                    <button onClick={(event) => storeSkuAndOpenEditModal(event, product.sku)} className="flex text-center items-center justify-center active:bg-gray-200 dark:active:bg-neutral-700 bg-opacity-80 rounded-full p-2">
                      <EditIcon
                        className="text-neutral-600 dark:text-gray-200 hover:text-black transition duration-500 ease-in-out"
                        fontSize="small"
                      />
                    </button>
                    <button onClick={() => openProductDetailsModal(product.sku)} className="flex text-center items-center justify-center active:bg-gray-200 dark:active:bg-neutral-700 bg-opacity-80 rounded-full p-2">
                      <MoreVertIcon
                        className='text-neutral-600 dark:text-gray-200 hover:text-black transition duration-500 ease-in-out'
                        fontSize="small"
                        sx={{
                          transform: isOpenMenu ? 'rotate(90deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease-in-out'
                        }} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center" colSpan="7">
                  <div className="w-full ml-10 md:ml-0 md:px-10 md:w-full py-12">
                    <span><ProductionQuantityLimitsIcon className="dark:text-gray-200" style={{ width: 46, height: 46 }} /></span>
                    <p className="mt-8 dark:text-gray-200">Ops! Parece que as prateleiras estão vazias. Volte em breve para mais produtos!</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isModalGerar && <ModalGerarProdutos onClose={() => setIsModalGerar(false)} idProduct={idProduct} />}
      {isModalTr && <ModalDetailsProdutos onClose={closeModal} selectedSku={selectedSku} />}
    </div>
  );
};

export default ProdutosTabela;