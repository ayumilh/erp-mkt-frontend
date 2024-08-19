'use client'
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

const ModalCopiarAnuncio = ({ onClose }) => {
    const [link, setLink] = useState("");
    const [productInfo, setProductInfo] = useState({ name: "", price: "" });

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
        onClose();
    };

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-700 bg-opacity-70">
            <div className="relative bg-white max-w-xl -top-52 p-6 rounded shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg text-gray-800 font-medium">Copiar Anúncio</h3>
                    <button onClick={onClose}><CloseIcon /></button>
                </div>
                <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Colar o link do anúncio"
                    className="w-80 p-2 border border-gray-300 rounded"
                />
                <div className="w-full flex justify-end mt-6">
                    <button onClick={handleCopy} className="px-3 py-2 bg-segundaria-900 text-white rounded-md hover:bg-segundaria-800 cursor-pointer transition duration-300 ease-in-out">
                        Copiar
                    </button>
                </div>
                {productInfo.name && productInfo.price && (
                    <div className="mt-4">
                        <p><strong>Nome:</strong> {productInfo.name}</p>
                        <p><strong>Preço:</strong> {productInfo.price}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalCopiarAnuncio;