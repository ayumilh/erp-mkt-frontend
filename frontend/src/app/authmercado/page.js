import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../../app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export default function authmercado() {
  const session = await getServerSession(nextAuthOptions)
  if(!session) {
    redirect('/login')
  }

  return (
    <main className="flex min-h-screen flex-row items-center justify-evenly">
    </main>
  );
}
