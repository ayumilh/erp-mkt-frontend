'use client'
import { useRouter } from "next/navigation"
import Image from "next/image"

const WithGoogle = ({ loginType }) => {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center">
      <p className="text-base md:text-lg font-medium">ou continuar com</p>
      <span className="mt-7 mb-7">
        <Image src="img/icon-google.svg" alt="Google Logo" width={42} height={42}/>
      </span>
      {loginType === 'login' ? (
        <p className="font-medium text-sm md:text-base">
          Não tem uma conta? 
          <span className="text-blue-700 font-semibold cursor-pointer ml-1" onClick={() => router.push('cadastro')}>Criar conta!</span> 
        </p>
      ) : (
        <p className="text-blue-700 font-semibold cursor-pointer text-sm md:text-base" onClick={() => router.push('login')}>
          Já tem uma conta? 
        </p>
      )}
    </div>
  )
}

export default WithGoogle