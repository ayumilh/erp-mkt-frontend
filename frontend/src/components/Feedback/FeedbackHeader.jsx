import {DropdownList} from "./Actions/DropdownList";
import { BtnSincronizarPerguntas } from "./Actions/BtnSincronizarPerguntas";

const FeedbackHeader = () => {
  return (
    <div className="w-full lg:w-[876px] xl:w-[1270px] flex justify-between mb-6">
      <div className="flex gap-4">
        <DropdownList />
        <div className="group" style={{ display: 'inline-block' }}>
          <p className="hover:text-black font-medium hover:cursor-pointer">Mensagem</p>
          {/* <hr className="border-segundaria-900 border-[1.5px]" /> */}
          <hr className="border-transparent group-hover:border-gray-300 border-[1.5px] transition duration-300 ease-in-out" />
        </div>
        <div className="group" style={{ display: 'inline-block' }}>
          <p className="hover:text-black font-medium hover:cursor-pointer">Reclamações e Devoluções</p>
          {/* <hr className="border-segundaria-900 border-[1.5px]" /> */}
          <hr className="border-transparent group-hover:border-gray-300 border-[1.5px] transition duration-300 ease-in-out" />
        </div>
      </div>

      <div className="flex justify-center md:justify-end px-4 md:px-0 md:gap-6">
        <div>
          <BtnSincronizarPerguntas />
        </div>
      </div>
    </div>
  )
}

export default FeedbackHeader