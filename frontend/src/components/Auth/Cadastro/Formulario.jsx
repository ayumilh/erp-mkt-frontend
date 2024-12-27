'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import * as Yup from 'yup'
import WithGoogle from '../WithGoogle'
import HeaderForm from "./HeaderForm";
import { Email } from "@mui/icons-material"
import LockIcon from "@mui/icons-material/Lock"
import { IconButton } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

const YupValidation = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  senha: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
});

const Formulario = () => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();
  const [errors, setErrors] = useState({})
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loggingLoading, setLoggingLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isPasswordsValid, setIsPasswordsValid] = useState(null);
  const [requestError, setRequestError] = useState('');

  const [inputs, setInputs] = useState({
    email: '',
    senha: '',
    telefone: '',
    cnpj: '',
  });

  const inputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }


  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setInputs((prev) => ({ ...prev, senha: value }));
    setErrors((prev) => ({ ...prev, senha: '' }));
    validatePasswords(value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    validatePasswords(inputs.senha, value);
  };

  const handleTelefoneChange = (e) => {
    const value = e.target.value;
    const regex = /^\d{0,11}$/;

    if (value === '' || regex.test(value)) {
      setInputs((prev) => ({ ...prev, telefone: value }));
      setErrors((prevErrors) => {
        const { telefone, ...rest } = prevErrors;
        return rest;
      });
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        telefone: 'Telefone inválido'
      }));
    }
  };

  const handleCnpjChange = (e) => {
    const value = e.target.value;
    const regex = /^\d{0,14}$/;

    if (regex.test(value)) {
      setInputs((prev) => ({ ...prev, cnpj: value }));
      setErrors((prevErrors) => {
        const { cnpj, ...rest } = prevErrors;
        return rest;
      });
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cnpj: 'CNPJ inválido'
      }));
    }
  };

  // validações
  const validateInputs = async () => {
    try {
      await YupValidation.validate(inputs, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const validatePasswords = (senha, confirmarSenha) => {
    if (senha !== confirmarSenha) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmarSenha: 'As senhas digitadas são diferentes. Por favor, verifique e tente novamente.'
      }));
      setIsButtonDisabled(true);
      setIsPasswordsValid(false);
      return false;
    } else {
      setErrors((prevErrors) => {
        const { confirmarSenha, ...rest } = prevErrors;
        return rest;
      });
      setIsButtonDisabled(false);
      setIsPasswordsValid(true);
      return true;
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoggingLoading(true)

    const isValid = await validateInputs()
    const isPasswordsValid = validatePasswords(inputs.senha, confirmPassword);

    if (!isValid || !isPasswordsValid) {
      setLoggingLoading(false)
      return
    }

    try {
      await axios.post(`${BACKEND_URL}/api/auth/register`, inputs)
      router.push('/login')
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setRequestError('Recurso não encontrado. Por favor, verifique a URL ou tente novamente mais tarde.')
      } else if (error.response && error.response.status === 500) {
        setRequestError('Erro interno do servidor. Por favor, tente novamente mais tarde.')
      } else if (error.response && error.response.status === 400) {
        setRequestError('Erro ao criar a conta. Por favor, verifique os dados e tente novamente.')
      } else {
        setRequestError('Erro desconhecido. Por favor, tente novamente mais tarde.')
      }
    } finally {
      setLoggingLoading(false)
    }
  }

  const handleClickShowPassword = () => (
    setShowPassword(!showPassword)
  )

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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
        <HeaderForm />
        {requestError && <span className='text-red-500 relative text-sm mt-1'>{requestError}</span>}
        <div className="flex flex-col space-y-8 items-end">
          {/* email */}
          <div className="w-full">
            <label className="block text-sm md:base font-medium mb-2" htmlFor="email">
              E-mail <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Email className="h-5 w-5 text-neutral-700" />
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
            {errors.email && <span className="text-red-500 relative text-sm mt-1">{errors.email}</span>}
          </div>

          {/* senha */}
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
                onChange={handlePasswordChange}
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
            {errors.senha && <span className='text-red-500 relative text-sm mt-1'>{errors.senha}</span>}
          </div>

          {/* confirmar senha */}
          <div className="w-full mt-4">
            <label className="block text-sm md:text-base font-medium mb-2" htmlFor="confirmarSenha">
              Confirmar Senha <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 relative rounded-md hover:bg-transparent">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none mb-2">
                <LockIcon className="h-5 w-5 text-neutral-700" />
              </div>
              <input
                className="self-stretch form-input block w-full pl-10 leading-5 border-b-2 bg-transparent hover:border-segundaria-800 focus:border-segundaria-800 focus:outline-none"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmarSenha"
                onChange={handleConfirmPasswordChange}
                placeholder='********'
                minLength={6}
                required
                onBlur={() => validatePasswords(inputs.senha, confirmPassword)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center mb-1 md:mb-2 cursor-pointer">
              {isPasswordsValid === null ? null : isPasswordsValid ? (
        <CheckIcon className="text-green-500" />
      ) : (
        <ErrorIcon className="text-red-500" />
      )}
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showConfirmPassword ? <Visibility className='dark:text-neutral-700' /> : <VisibilityOff className='dark:text-neutral-700' />}
                </IconButton>
              </div>
            </div>
            {errors.confirmarSenha && <span className='text-red-500 relative text-sm mt-1'>{errors.confirmarSenha}</span>}
          </div>

          {/* telefone */}
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
                placeholder='000000000'
                maxLength={11}
                onChange={handleTelefoneChange}
              />
            </div>
            {errors.telefone && <span className="text-red-500 relative text-sm mt-1">{errors.telefone}</span>}
          </div>

          {/* cnpj */}
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
                placeholder='00000000000000'
                maxLength={14}
                onChange={handleCnpjChange}
              />
            </div>
            {errors.cnpj && <span className="text-red-500 relative text-sm mt-1">{errors.cnpj}</span>}
          </div>
        </div>

        <button type='submit' onClick={handleLogin} disabled={isButtonDisabled} className={`w-full bg-gradient-to-r from-gradient-start to-gradient-end hover:bg-gradient-to-b hover:from-gradient-start-hover hover:to-gradient-end-hover rounded-full hover:shadow-segundaria text-white text-base py-3 md:text-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-60 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {loggingLoading ? <><CircularProgress color="inherit" className="text-white" size={12} /> Criando...</> : 'Criar minha conta'}
        </button>
        <WithGoogle loginType='cadastro' />
      </form>
    </div>
  )
}

export default Formulario