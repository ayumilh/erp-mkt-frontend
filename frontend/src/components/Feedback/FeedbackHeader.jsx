import { DropdownList } from "./Actions/DropdownList";
import { BtnSincronizarPerguntas } from "./Actions/BtnSincronizarPerguntas";
import BtnRoute from "../Geral/Button/BtnRoute";

const FeedbackHeader = () => {
    return (
        <div className="w-full lg:w-[876px] xl:w-[1270px] flex justify-between mb-6">
            <div className="flex gap-4">
                <DropdownList />
                <BtnRoute route="/feedback" size='full' btn='base' txt='base'>
                    Mensagem
                </BtnRoute>
                <BtnRoute route="/feedback" size='full' btn='base' txt='base'>
                    Reclamações e Devoluções
                </BtnRoute>
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