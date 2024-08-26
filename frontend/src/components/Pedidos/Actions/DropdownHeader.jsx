'use client'
import { useEffect, useRef, useState } from 'react';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const DropdownHeader = ({ setActiveTable }) => {
	const [isOpenLista, setIsOpenLista] = useState(false);
	const [currentText, setCurrentText] = useState('Pedidos');
	const dropdownPedidosRef = useRef(null);

	const handleClickLista = () => {
		setIsOpenLista(!isOpenLista);
	};

	const handleClickEmitir = (text) => {
		setActiveTable(text);
		setCurrentText(text);
	};


	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownPedidosRef.current && !dropdownPedidosRef.current.contains(event.target)) {
				setIsOpenLista(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		}
	}, [dropdownPedidosRef])

	return (
		<div className="relative inline-block text-left z-50" ref={dropdownPedidosRef}>
			<div>
				<button
					type="button"
					className="flex items-center justify-center rounded-lg px-2 md:px-3"
					id="options-menu"
					aria-haspopup="true"
					aria-expanded="true"
					onClick={handleClickLista}
				>
					<span className="hover:text-black font-medium text-sm md:text-base">{currentText}</span>
					<KeyboardArrowDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
				</button>
				<hr className="border-segundaria-900 border-[1.5px]" />
			</div>

			{isOpenLista && (
				<div className="origin-top-center absolute mt-2 px-2 rounded-md bg-primaria-900">
					<div className="w-28 my-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
						<button
							className="flex justify-between w-full text-sm font-medium px-2 py-1 hover:text-black hover:bg-white ho rounded-smver:bg-opacity-80"
							role="menuitem"
							onClick={() => handleClickEmitir('Pedidos')}
						>
							<span>Pedidos</span>
							<span className='font-medium text-neutral-600 opacity-90'>0</span>
						</button>
						<button
							className="flex justify-between w-full text-sm font-medium px-2 py-1 hover:text-black hover:bg-white ho rounded-smver:bg-opacity-80"
							role="menuitem"
							onClick={() => handleClickEmitir('Emitir')}
						>
							<span>Emitir</span> 
							<span className='font-medium text-neutral-600 opacity-90'>0</span>
						</button>
						<button className="flex justify-between w-full text-sm font-medium px-2 py-1 hover:text-black hover:bg-white hover:bg-opacity-80 rounded-sm" role="menuitem">
							<span>Enviar</span> 
							<span className='font-medium text-neutral-600 opacity-90'>0</span>
						</button>
						<button
							onClick={() => handleClickEmitir('Imprimir')}
							className="flex justify-between w-full text-sm font-medium px-2 py-1 hover:text-black hover:bg-white hover:bg-opacity-80 rounded-sm" role="menuitem">
							<span>Imprimir</span>
							<span className='font-medium text-neutral-600 opacity-90'>0</span>
						</button>
						<button
							onClick={() => handleClickEmitir('Retirada')}
							className="flex justify-between w-full text-sm font-medium px-2 py-1 hover:text-black hover:bg-white hover:bg-opacity-80 rounded-sm" role="menuitem">
							<span>Retirada</span> 
							<span className='font-medium text-neutral-600 opacity-90'>0</span>
						</button>
						<button
							onClick={() => handleClickEmitir('Enviados')}
							className="flex justify-between w-full text-sm font-medium px-2 py-1 hover:text-black hover:bg-white hover:bg-opacity-80 rounded-sm" role="menuitem">
							<span>Enviados</span> 
							<span className='font-medium text-neutral-600 opacity-90'>0</span>
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
