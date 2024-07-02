'use client'
import { useState, useContext } from 'react'
import { useRouter } from 'next/navigation';

import {AuthContext} from '@/contexts/AuthContext' 

import WithGoogle from "../WithGoogle";
import HeaderForm from "./HeaderForm";

import * as Yup from 'yup'

import CircularProgress from '@mui/material/CircularProgress';
import { Email } from "@mui/icons-material"
import LockIcon from "@mui/icons-material/Lock"
import { IconButton } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { signIn } from 'next-auth/react';


const YupValidation = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  senha: Yup.string()
    .min(5, 'A senha deve ter pelo menos 8 caracteres')
    .required('Senha é obrigatória'),
});

const Formulario = () => {
  const { login } = useContext(AuthContext)
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState({})
  const [loggingLoading, setLoggingLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoggingLoading(true)
    try {
      await YupValidation.validate({ email, senha }, { abortEarly: false });
      setErrors({})

      await login({ email, senha })
      const result = await signIn('credentials', {
        email,
        senha,
        redirect: false
      });
      
      if (result?.error) {
        setErrors({ login: 'Login inválido. Verifique seu e-mail e senha.' })
        console.log('Erro ao logar:', result)
        return
      } else {
        router.push('/dashboard')
      }
      
    } catch (validationError) {
      const yupErrors = {}
      if (validationError && validationError.inner) {
        validationError.inner.forEach(err => {
          yupErrors[err.path] = err.message
        })
      }
      setErrors(yupErrors)
    } finally {
      setLoggingLoading(false)
    }
  }

  // mostrar senha
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => (
    setShowPassword(!showPassword)
  )
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-primaria-900 form-login w-[350px] md:w-[500px] lg:w-[450px] xl:w-[540px] h-full py-8 md:py-12 px-6 md:px-11 lg:px-8 xl:px-11 space-y-8 rounded-[32px] my-6">    
        <HeaderForm/>  
        <div className="flex flex-col space-y-8 items-end">
          <div className="w-full">
            <label className="block text-sm md:base font-medium mb-2" htmlFor="email">
              E-mail
            </label>
            <div className="mt-1 relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Email className="h-5 w-5 text-colorFont-200"/>
              </div>
              <input
                className="self-stretch form-input block w-full pl-10 leading-5 border-b-2 bg-transparent hover:border-segundaria-800 focus:border-segundaria-800 focus:outline-none"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {errors.email && <span className='text-red-500 text-sm'>{errors.email}</span>}
          </div>

          <div className="w-full">
            <label className="block text-sm md:text-base font-medium mb-2" htmlFor="senha">
              Senha
            </label>
            <div className="mt-1 relative rounded-md hover:bg-transparent">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none mb-2">
                <LockIcon className="h-5 w-5 text-colorFont-200" />
              </div>
              <input
                className="self-stretch form-input block w-full pl-10 leading-5 border-b-2 bg-transparent hover:border-segundaria-800 focus:border-segundaria-800 focus:outline-none"
                type={showPassword ? "text" : "password"}
                name="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center mb-1 md:mb-2 cursor-pointer">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
            </div>
            {errors.senha && <span className='text-red-500 text-sm'>{errors.senha}</span>}
          </div>
          {errors.login && <span className='text-red-500 text-sm'>{errors.login}</span>}
          <p className="text-blue-500 text-sm md:text-base"><a href="#">Esqueceu a senha?</a></p>
        </div>
        <button type='submit' className="w-full bg-gradient-to-r from-gradient-start to-gradient-end hover:bg-gradient-to-b hover:from-gradient-start-hover hover:to-gradient-end-hover focus:bg-gradient-to-r focus:from-gradient-start-focus focus:to-gradient-end-focus rounded-full hover:shadow-lg text-white text-base py-3 md:text-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-60"> 
          {loggingLoading ? <><CircularProgress color="inherit" className="text-white" size={12} /> Entrando...</> : 'Entrar'}
        </button>
        <WithGoogle loginType='login'/>
      </form>
    </div>
  )
}

export default Formulario