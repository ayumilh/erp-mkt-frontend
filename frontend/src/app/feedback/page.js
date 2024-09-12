import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

import Content from '@/components/Drawer/desktop/SidebarContent'
import FeedbackContent from '@/components/Feedback/FeedbackContent';

const Feedback = async () => { 
  const session = await getServerSession(nextAuthOptions)
  if(!session) {
    redirect('/login')
  }
  
  return (
    <main className="flex max-w-full h-screen">
      <Content />
      <FeedbackContent/>
    </main>
  );
}

export default Feedback;