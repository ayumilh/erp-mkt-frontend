import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../../app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default async function authmercado() {
  // const session = await getServerSession(nextAuthOptions)
  // if(!session) {
  //   redirect('/login')
  // }

  const router = useRouter();
  const [codigo, setCodigo] = useState('');

  useEffect(() => {
    const { code } = router.query;

    if (code) {
      console.log("Código recebido:", code);
      setCodigo(code); 
    }
  }, [router.query]);

  console.log("Rota de autenticação do Mercado Livre");
  console.log(router.query);
  console.log("Código armazenado:", codigo);

  return (
    <main className="flex min-h-screen flex-row items-center justify-evenly">
    </main>
  );
}
