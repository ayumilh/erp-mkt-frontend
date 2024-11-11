'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

import WithGoogle from '../WithGoogle'
import HeaderForm from "./HeaderForm";

import { Email } from "@mui/icons-material"
import LockIcon from "@mui/icons-material/Lock"
import { IconButton } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";

const Formulario = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    email: '',
    senha: '',
    telefone: '',
    cnpj: '',
  });

  const inputChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await axios.post("https://erp-mkt.vercel.app/api/auth/register", inputs)
      router.push('/login')
    } catch (error) {
      console.error(error)
    }
  }

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => (
    setShowPassword(!showPassword)
  )
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const emailInputRef = useRef(null);
  useEffect(() => {
      emailInputRef.current.focus();
  }, []);

  return (
    <div>
      <form className="bg-primaria-900 w-[350px] md:w-[500px] lg:w-[450px] xl:w-[540px] h-full py-8 md:py-12 px-6 md:px-11 lg:px-8 xl:px-11 space-y-8 rounded-[32px] relative bottom-8">    
        <HeaderForm/>  
        <div className="flex flex-col space-y-8 items-end">
          <div className="w-full">
            <label className="block text-sm md:base font-medium mb-2" htmlFor="email">
              E-mail <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Email className="h-5 w-5 text-neutral-700"/>
              </div>
              <input
                className="self-stretch form-input block w-full pl-10 leading-5 border-b-2 bg-transparent hover:border-segundaria-800 focus:border-segundaria-800 focus:outline-none"
                ref={emailInputRef}
                type="email"
                name="email"
                placeholder='mail@example.com'
                maxLength={255}
                onChange={inputChange}
                required
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm md:text-base font-medium mb-2" htmlFor="senha">
              Senha <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 relative rounded-md hover:bg-transparent">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none mb-2">
                <LockIcon className="h-5 w-5 text-neutral-700" />
              </div>
              <input
                className="self-stretch form-input block w-full pl-10 leading-5 border-b-2 bg-transparent hover:border-segundaria-800 focus:border-segundaria-800 focus:outline-none"
                type={showPassword ? 'text' : 'password'}
                name="senha"
                onChange={inputChange}
                placeholder='********'
                minLength={6}
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center mb-1 md:mb-2 cursor-pointer">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility className='dark:text-neutral-700' /> : <VisibilityOff className='dark:text-neutral-700' />}
                </IconButton>
              </div>
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm md:text-base font-medium mb-2" htmlFor="senha">
              Telefone
            </label>
            <div className="mt-1 relative rounded-md hover:bg-transparent">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none mb-2">
                <PhoneIcon className="h-5 w-5 text-neutral-700" />
              </div>
              <input
                className="self-stretch form-input block w-full pl-10 leading-5 border-b-2 bg-transparent hover:border-segundaria-800 focus:border-segundaria-800 focus:outline-none"
                type="text"
                name="telefone"
                placeholder='(00) 00000-0000'
                maxLength={15}
                onChange={inputChange}
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm md:text-base font-medium mb-2" htmlFor="senha">
              CNPJ
            </label>
            <div className="mt-1 relative rounded-md hover:bg-transparent">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none mb-2">
                <BusinessIcon className="h-5 w-5 text-neutral-700" />
              </div>
              <input
                className="self-stretch form-input block w-full pl-10 leading-5 border-b-2 bg-transparent hover:border-segundaria-800 focus:border-segundaria-800 focus:outline-none"
                type="text"
                name="cnpj"
                maxLength={14}
                onChange={inputChange}
              />
            </div>
          </div>
        </div>
        <button type='submit' onClick={handleLogin} className="w-full bg-gradient-to-r from-gradient-start to-gradient-end hover:bg-gradient-to-b hover:from-gradient-start-hover hover:to-gradient-end-hover rounded-full hover:shadow-segundaria text-white text-base py-3 md:text-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-60">Criar minha conta</button>
        <WithGoogle loginType='cadastro'/>
      </form>
    </div>
  )
}

export default Formulario