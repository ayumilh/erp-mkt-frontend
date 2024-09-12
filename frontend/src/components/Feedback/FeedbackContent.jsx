import HamburgerContent from '../Drawer/mobile/HamburgerContent';
import ActionsHeader from '../ActionsHeader';
import TitlePage from '../Geral/TitlePage';
import FeedbackHeader from './FeedbackHeader';
import FeedbackActionsFilter from './FeedbackActionsFilter';
import FeedbackTabela from './FeedbackTabela';

const FeedbackContent = () => {
  return (
    <div className='max-w-[373px] md:max-w-[740px] lg:max-w-[760px] xl:max-w-screen-xl 2xl:max-w-screen-2xl px-4 lg:px-0 lg:mx-4 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center'>
      <div className="w-full flex justify-between items-center h-12 pt-5">
        <div className='flex items-center'>
          <HamburgerContent/>
          <TitlePage title='Feedback central'/>
        </div>
        <ActionsHeader/>
      </div>

      <div className='max-w-[373px] md:max-w-[740px] lg:max-w-[760px] xl:max-w-screen-xl 2xl:max-w-screen-2xl flex flex-col items-center lg:mb-10' style={{height: '1500px'}}>
        <FeedbackHeader />
        <FeedbackActionsFilter />
        <FeedbackTabela />
      </div>
    </div>
  )
}

export default FeedbackContent;