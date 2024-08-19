'use client'
import React, { useState } from "react";
import BtnActive from "../../Geral/Button/BtnActive";
import ModalCopiarAnuncio from "./ModalCopiarAnuncio";

const AnuncioCopiadoHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full lg:w-[876px] xl:w-[1270px] flex flex-col mb-6">
      <div className="flex gap-3 justify-end">
        <div>
          <BtnActive title="Copiar anúncio" onClick={handleOpenModal} size='btnHeader' width='full'/>
          {isModalOpen && <ModalCopiarAnuncio onClose={handleCloseModal} />}
        </div>
      </div>
    </div>
  );
};

export default AnuncioCopiadoHeader;