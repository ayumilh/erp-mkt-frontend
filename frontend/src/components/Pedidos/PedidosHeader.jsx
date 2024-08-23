import { useState } from "react";
import { useRouter } from 'next/navigation';  
import { DropdownHeader } from "./Actions/DropdownHeader";
import { BtnSincronizarHeader } from "./Actions/BtnSincronizarHeader";
import SuccessNotification from "../Geral/Notifications/SuccessNotification";
import ErrorNotification from "../Geral/Notifications/ErrorNotification";

export const PedidosHeader = ({ setActiveTable }) => {
  const [statusRequestSync, setStatusRequestSync] = useState('');
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/pedidos/nf');
  };
  return (
    <div className="w-full lg:w-[876px] xl:w-[1270px] flex justify-between mb-6">
      <div className="flex gap-6">
        <DropdownHeader setActiveTable={setActiveTable} />
        <div style={{ display: 'inline-block' }}>
          <p onClick={handleRedirect} className="hover:text-black font-medium hover:cursor-pointer">Notas fiscais</p>
          {/* <hr className="border-segundaria-900 border-[1.5px]" /> */}
        </div>
      </div>
      <div className="flex pr-3 md:pr-0 justify-end">
        <BtnSincronizarHeader statusRequestSync={statusRequestSync} setStatusRequestSync={setStatusRequestSync}/>
      </div>
      {
        statusRequestSync === true && <SuccessNotification message='Pedidos sincronizados com sucesso!' />
      }
      {
        statusRequestSync === false && <ErrorNotification message='Não foi possível sincronizar os pedidos!' />
      }
    </div>
  )
}
