import { checkSession } from '@/utils/checkSession';
import Content from '@/components/Drawer/desktop/SidebarContent'
import FeedbackContent from '@/components/Feedback/FeedbackContent';

const Feedback = async () => { 
  await checkSession();
  
  return (
    <main className="flex max-w-full h-screen">
      <Content />
      <FeedbackContent/>
    </main>
  );
}

export default Feedback;