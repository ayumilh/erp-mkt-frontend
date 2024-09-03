'use client'
import { useRef, useState, useEffect } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const DropdownList = () => {
	const [isOpenLista, setIsOpenLista] = useState(false);
	const dropdownListaRef = useRef(null);


	const handleClickLista = () => {
		setIsOpenLista(!isOpenLista);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownListaRef.current && !dropdownListaRef.current.contains(event.target)) {
				setIsOpenLista(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		}
	}, [dropdownListaRef])

	return (
		<div className="relative inline-block text-left" ref={dropdownListaRef}>
			<div>
				<button
					type="button"
					className="flex items-center justify-center px-2 md:px-3 py-2 border-b-2 border-segundaria-900 hover:border-b-2 hover:border-gray-300 transform focus:-translate-y-0.5 focus:scale-60 transition duration-300 ease-in-out"
					id="options-menu"
					aria-haspopup="true"
					aria-expanded="true"
					onClick={handleClickLista}
				>
					<span className="hover:text-black font-medium text-sm md:text-base">Lista</span>
                    <KeyboardArrowDownIcon sx={{
                        width: '20px',
                        transform: isOpenLista ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.4s ease-in-out'
                    }} className="-mr-1 ml-2 text-segundaria-900" aria-hidden="true" />
				</button>
			</div>

			{isOpenLista && (
				<div className="origin-top-center absolute mt-2 rounded-md shadow-lg bg-primaria-900 ring-1 ring-black ring-opacity-5">
					<div className="w-[86px] my-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
						<button className="flex justify-between w-full text-sm font-medium pl-4 py-2 hover:text-black hover:bg-gray-200 active:bg-gray-100 rounded-sm transition duration-200 ease-in-out" role="menuitem">
							SKU
						</button>
						<button className="flex justify-between w-full text-sm font-medium pl-4 py-2 hover:text-black hover:bg-gray-200 active:bg-gray-100 rounded-sm transition duration-200 ease-in-out" role="menuitem">
							KIT SKU
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
