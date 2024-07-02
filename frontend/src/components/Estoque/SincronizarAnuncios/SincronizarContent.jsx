import HamburgerContent from "@/components/Drawer/mobile/HamburgerContent"
import ActionsHeader from "../../ActionsHeader"
import SincronizarActionsFilter from "./SincronizarActionsFilter"
import Sincronizartabela from "./Sincronizartabela"
import SincronizarHeader from "./SincronizarHeader"
import TitlePage from "@/components/Geral/TitlePage"


const SincronizarContent = () => {
  return (
    <div className='w-full xl:mx-0 lg:pt-6'>
      <div className="w-full xl:max-w-[1264px] flex justify-between items-center h-12 pt-4 px-6 xl:px-0 mx-auto mb-8">
        <div className='flex items-center'>
          <HamburgerContent/>
          <TitlePage title='Sincronizar'/>
        </div>
        <ActionsHeader/>
      </div>

      <div className='mx-auto flex flex-col justify-start items-center' style={{height: '1000px'}}>
        <SincronizarHeader/>
        <SincronizarActionsFilter/>
        <Sincronizartabela/>
      </div>
    </div>
  )
}

export default SincronizarContent