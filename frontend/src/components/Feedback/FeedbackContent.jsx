import HamburgerContent from '../Drawer/mobile/HamburgerContent';
import ActionsHeader from '../ActionsHeader';
import TitlePage from '../Geral/TitlePage';
import FeedbackHeader from './FeedbackHeader';
import FeedbackActionsFilter from './FeedbackActionsFilter';
import FeedbackTabela from './FeedbackTabela';

const FeedbackContent = () => {
  return (
    <div className='w-full px-4 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center'>
      <div className="w-full flex justify-between items-center h-12 pt-5">
        <div className='flex items-center'>
          <HamburgerContent/>
          <TitlePage title='Feedback central'/>
        </div>
        <ActionsHeader/>
      </div>

      <div className='w-full flex flex-col items-center mt-7 lg:mb-10' style={{height: '1500px'}}>
        <FeedbackHeader />
        <FeedbackActionsFilter />
        <FeedbackTabela />
      </div>
    </div>
  )
}

export default FeedbackContent;