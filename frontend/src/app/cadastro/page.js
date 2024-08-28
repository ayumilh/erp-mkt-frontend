'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import Formulario from "@/components/Auth/Cadastro/Formulario";

export default function Cadastro() {
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