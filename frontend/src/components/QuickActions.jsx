const QuickActions = () => {
  const actions = [
    "Conectar lojas",
    "Gerenciar produtos",
    "Copiar anuncios",
    "Sincronização de Estoque",
    "Impulsionar no Shopee",
    "Notas Fiscais",
  ];

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-[254px] xl:w-[282px] bg-primaria-900 shadow-lg border border-slate-100 rounded-2xl px-5 py-5">
      <h2 className="text-base text-neutral-700 font-semibold mb-2">
        Ações rapidas
      </h2>
      <ul className="space-y-2">
        {actions.map((action, index) => (
          <li
            key={index}
            className="font-medium opacity-90 cursor-pointer hover:opacity-100 py-1 hover:bg-gray-100"
          >
            {action}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickActions;
