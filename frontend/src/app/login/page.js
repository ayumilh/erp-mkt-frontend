'use client'
import Formulario from "@/components/Auth/Login/Formulario";
import { useRouter } from 'next/navigation';
import Image from 'next/image'

export default function Login() {
    const router = useRouter();

    return (
        <main className="bg-indigo-50 flex min-h-screen flex-col items-center">
            <div className='w-full px-10'>
                <div onClick={() => router.push('/')}>
                    <Image src="/img/logo.png" alt="Logo" width={120} height={120} className="object-cover cursor-pointer" />
                </div>
            </div>
            <Formulario />
        </main>
    );
}
