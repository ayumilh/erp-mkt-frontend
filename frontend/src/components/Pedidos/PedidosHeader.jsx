import { useState } from "react";
import { DropdownHeader } from "./Actions/DropdownHeader";
import { BtnSincronizarHeader } from "./Actions/BtnSincronizarHeader";
import SuccessNotification from "../Geral/Notifications/SuccessNotification";
import ErrorNotification from "../Geral/Notifications/ErrorNotification";
import BtnRoute from "../Geral/Button/BtnRoute";

export const PedidosHeader = ({ setActiveTable }) => {
    const [statusRequestSync, setStatusRequestSync] = useState('');
    return (
        <div className="w-full lg:w-[876px] xl:w-[1270px] flex justify-between mb-6">
            <div className="flex gap-4">
                <DropdownHeader setActiveTable={setActiveTable} />
                <BtnRoute route="/pedidos/nf" size='full' btn='base' txt='base'>
                    Notas fiscais
                </BtnRoute>
            </div>
            <div className="flex pr-3 md:pr-0 justify-end">
                <BtnSincronizarHeader statusRequestSync={statusRequestSync} setStatusRequestSync={setStatusRequestSync} />
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
