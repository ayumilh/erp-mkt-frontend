import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../app/api/auth/[...nextauth]/route';

export const checkSession = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect('/login');
  }
  return session;
};