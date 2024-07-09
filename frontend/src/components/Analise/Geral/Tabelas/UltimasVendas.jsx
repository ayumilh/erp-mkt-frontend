const UltimasVendas = () => {
  const vendas = [
    { data: '2023-04-01', valor: 'R$ 1.200,00' },
    { data: '2023-04-02', valor: 'R$ 1.500,00' },
    { data: '2023-04-03', valor: 'R$ 1.750,00' },
    { data: '2023-04-04', valor: 'R$ 900,00' },
    { data: '2023-04-05', valor: 'R$ 2.000,00' },
    { data: '2023-04-06', valor: 'R$ 1.250,00' },
    { data: '2023-04-07', valor: 'R$ 1.800,00' },
  ];
  return (
    <div className="bg-primaria-900 shadow-md rounded-3xl max-w-full lg:max-w-[320px] xl:w-[340px] mt-7 lg:mt-0 p-5 md:px-4 md:py-8 xl:px-6">
      <h2 className='text-base text-neutral-800 font-semibold'>Últimas Vendas</h2>
      <div className="overflow-y-auto max-h-[470px] pr-3 mt-4">
        <table className="min-w-full leading-normal">
          <thead className="sticky top-0 bg-primaria-900">
            <tr>
              <th className="px-3 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                Data
              </th>
              <th className="px-3 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                Valor
              </th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda, index) => (
              <tr key={index}>
                <td className="px-3 py-5 text-center text-neutral-700 border-b border-gray-200 text-sm">
                  {venda.data}
                </td>
                <td className="px-3 py-5 text-center text-neutral-700 border-b border-gray-200 text-sm">
                  {venda.valor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UltimasVendas;