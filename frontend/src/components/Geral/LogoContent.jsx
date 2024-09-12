'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const LogoContent = () => {
    const router = useRouter()

    return (
        <div onClick={() => router.push('/dashboard')} className='hidden lg:flex'>
            <Image src="/img/logo.png" alt="logo" width={120} height={120} className="object-cover cursor-pointer" />
        </div>
    )
}

export default LogoContent