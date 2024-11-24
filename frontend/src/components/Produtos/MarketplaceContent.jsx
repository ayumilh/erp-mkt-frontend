import React, { useState } from 'react';
import Image from 'next/image';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const MarketplaceContent = ({setRoute}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMarketplace, setSelectedMarketplace] = useState({
        src: '/img/marketplace/mercado-livre.png',
        alt: 'Mercado Livre',
        width: 150,
        height: 40
    });

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectMarketplace = (marketplace) => {
        setSelectedMarketplace(marketplace);
        setIsOpen(false);
        if(marketplace.alt === 'Mercado Livre') {
            setRoute('mercadolivre');
        } else if (marketplace.alt === 'Shopee') {
            setRoute('shopee');
        }
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="flex items-center justify-center max-w-32 h-10 px-2 md:px-3 border-b-2 border-segundaria-900 hover:border-b-2 hover:border-gray-300 transform focus:-translate-y-0.5 focus:scale-60 transition duration-300 ease-in-out"
            >
                {selectedMarketplace ? (
                    <Image src={selectedMarketplace.src} alt={selectedMarketplace.alt} width={selectedMarketplace.width} height={selectedMarketplace.height} />
                ) : (
                    'Marketplaces'
                )}
                <KeyboardArrowDownIcon sx={{
                    width: '20px',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.4s ease-in-out'
                }} className="-mr-1 ml-2 text-segundaria-900" aria-hidden="true" />
            </button>

            {isOpen && (
                <div className="absolute mt-2 rounded-md shadow-lg bg-primaria-900 dark:bg-dark-primaria-900 ring-1 ring-black ring-opacity-5">
                    <div className="py-1 px-2 w-full" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button
                            className="flex w-full text-gray-700 hover:bg-gray-200 items-center h-10"
                            role="menuitem"
                            onClick={() => handleSelectMarketplace({ src: '/img/marketplace/mercado-livre.png', alt: 'Mercado Livre', width: 150, height: 40 })}
                        >
                            <Image src="/img/marketplace/mercado-livre.png" alt="Mercado Livre" width={150} height={40} />
                        </button>
                        <button
                            className="flex w-full text-gray-700 hover:bg-gray-200 items-center h-10"
                            role="menuitem"
                            onClick={() => handleSelectMarketplace({ src: '/img/marketplace/shopee.png', alt: 'Shopee', width: 150, height: 40 })}
                        >
                            <Image src="/img/marketplace/shopee.png" alt="Shopee" width={150} height={40} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarketplaceContent;