import React from 'react';

const ConfigModal = () => {
  // if (!isOpen) return null;

  return (
    <div
      className="fixed w-full inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50"
    >
      <div
        className="bg-white max-w-screen-lg dark:bg-dark-primaria-900 py-5 px-6 rounded shadow-lg"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-800 dark:text-gray-300">Configuração de impressão</h2>
          <button
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

        </p>

        {/* footer */}
        <div className="mt-8 flex gap-4 justify-end">

        </div>
      </div>
    </div>
  );
};

export default ConfigModal;