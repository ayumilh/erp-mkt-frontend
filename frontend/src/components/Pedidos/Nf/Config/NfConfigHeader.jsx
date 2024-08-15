import { useRouter } from "next/navigation";
import { BtnExportarNF } from "../Actions/BtnExportarNF";

const NfConfigHeader = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/pedidos/nf");
  };

  return (
    <div className="w-full lg:w-[876px] xl:w-[1270px] flex flex-col mb-6">
      <div className="flex mb-8 gap-6">
        <div style={{ display: "inline-block" }}>
          <p onClick={handleRedirect} className="hover:text-black font-medium hover:cursor-pointer">
            Todas as NF-e
          </p>
          {/* <hr className="border-segundaria-900 border-[1.5px]" /> */}
        </div>
        <div style={{ display: "inline-block" }}>
          <p
            className="hover:text-black font-medium hover:cursor-pointer"
          >
            Invalidar Nº da NF-e
          </p>
          {/* <hr className="border-segundaria-900 border-[1.5px]" /> */}
        </div>
        <div style={{ display: "inline-block" }}>
          <p className="hover:text-black font-medium hover:cursor-pointer">
            Configurar
          </p>
          <hr className="border-segundaria-900 border-[1.5px]" />
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <div>
          <BtnExportarNF />
        </div>
      </div>
    </div>
  );
};

export default NfConfigHeader;
