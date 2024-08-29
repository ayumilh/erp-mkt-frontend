'use client'
import HamburgerContent from '../../Drawer/mobile/HamburgerContent';
import ActionsHeader from '../../ActionsHeader';
import TitlePage from '../../Geral/TitlePage';
import NfActionsFilter from './NfActionsFilter';
import NfTabela from './NfTabela';
import NfHeader from './NfHeader';


const NfContent = () => {
  return (
    <div className='w-full px-4 lg:px-0 lg:mx-5 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center'>
      <div className="w-full lg:w-[876px] xl:w-[1270px] flex justify-between items-center h-12 pt-4 mb-8">
        <div className='flex items-center'>
          <HamburgerContent/>
          <TitlePage title='Notas fiscais'/>
        </div>
        <ActionsHeader/>
      </div>

      <div className='w-full flex flex-col items-center' style={{height: '1000px'}}>
        <NfHeader/>
        <NfActionsFilter />
        <NfTabela />
      </div>
    </div>
  )
}

export default NfContent