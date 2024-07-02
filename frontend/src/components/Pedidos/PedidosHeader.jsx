import { useState } from "react";
import { DropdownHeader } from "./Actions/DropdownHeader";
import { BtnSincronizarHeader } from "./Actions/BtnSincronizarHeader";
import SuccessNotification from "../Geral/Notifications/SuccessNotification";
import ErrorNotification from "../Geral/Notifications/ErrorNotification";


export const PedidosHeader = ({ setActiveTable }) => {
  const [statusRequestSync, setStatusRequestSync] = useState('');

  return (
    <div className="w-full lg:w-[876px] xl:w-[1270px] flex flex-col mb-6">
      <div className="flex mb-8 gap-6">
        <DropdownHeader setActiveTable={setActiveTable} />
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
