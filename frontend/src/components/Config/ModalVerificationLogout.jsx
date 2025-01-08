'use client'
import { useContext } from "react";
import { signOut } from "next-auth/react";
import { AuthContext } from "@/contexts/AuthContext";
import Cookies from 'js-cookie';

const ModalVerificationLogout = () => {
  const { isModalOpen, setIsModalOpen } = useContext(AuthContext);
  if (!isModalOpen) return null;

  const handleSignOut = () => {
    Cookies.remove("userId");
    signOut({ callbackUrl: '/login' });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50"
      onClick={handleCloseModal}
    >
      <div
        className="bg-white dark:bg-dark-primaria-900 py-5 px-6 rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-800 dark:text-gray-300">Confirmar Saída</h2>
          <button
            onClick={handleCloseModal}
            className="text-neutral-800 dark:text-gray-200 hover:text-gray-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

        </div>
        <p className="mt-5 ml-2 text-lg text-neutral-800 dark:text-gray-200">
          Você tem certeza que deseja sair?
        </p>
        <div className="mt-8 flex gap-4 justify-end" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleSignOut}
            className="px-3 py-2 bg-segundaria-900 text-white rounded hover:bg-segundaria-800 cursor-pointer transition duration-300 ease-in-out"
          >
            Sim, sair
          </button>
          <button
            onClick={handleCloseModal}
            className="px-3 py-2 font-medium border border-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 dark:text-gray-200 rounded-md cursor-pointer transition duration-300 ease-in-out"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalVerificationLogout;