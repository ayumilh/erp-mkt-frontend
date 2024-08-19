import React, { useState } from "react";

const ModalCopiarAnuncio = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [link, setLink] = useState("");
    const [productInfo, setProductInfo] = useState({ name: "", price: "" });

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCopy = async () => {
        try {
            const response = await fetch(`/api/screenshot`);
            const data = await response.json();
            console.log('Data:', data);
            // if (data.name && data.price) {
            //     setProductInfo(data);
            //     alert(`Anúncio copiado: ${data.name} - ${data.price}`);
            // } else {
            //     alert('Erro ao copiar anúncio');
            // }
        } catch (error) {
            alert('Erro ao copiar anúncio');
        }
        handleCloseModal();
    };

    return (
        <>
            <button onClick={handleOpenModal} className="hover:text-black cursor-pointer font-medium overflow-hidden text-sm lg:text-base">
                Copiar Anúncio
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-700 bg-opacity-70">
                    <div className="relative bg-white max-w-xl -top-52 p-6 rounded shadow-lg">
                        <div className="flex items-center justify-between pb-1">
                            <h3 className="text-lg text-gray-800 font-medium">Copiar Anúncio</h3>
                            <button onClick={handleCloseModal}>Fechar</button>
                        </div>
                        <input
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Cole o link do produto aqui"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <button onClick={handleCopy} className="mt-4 bg-blue-500 text-white p-2 rounded">
                            Copiar
                        </button>
                        {productInfo.name && productInfo.price && (
                            <div className="mt-4">
                                <p><strong>Nome:</strong> {productInfo.name}</p>
                                <p><strong>Preço:</strong> {productInfo.price}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalCopiarAnuncio;