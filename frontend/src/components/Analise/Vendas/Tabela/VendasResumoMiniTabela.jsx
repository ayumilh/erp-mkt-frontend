export const VendasResumoMiniTabela = () => {
  const produtos = [
    { id: 1, nome: "Produto A", margemLucroUnitaria: "10%", lucrosTotais: 1000 },
    { id: 2, nome: "Produto B", margemLucroUnitaria: "15%", lucrosTotais: 1500 },
    { id: 3, nome: "Produto C", margemLucroUnitaria: "20%", lucrosTotais: 2000 },
    { id: 4, nome: "Produto D", margemLucroUnitaria: "25%", lucrosTotais: 2500 },
    { id: 5, nome: "Produto E", margemLucroUnitaria: "30%", lucrosTotais: 3000 },
    { id: 6, nome: "Produto F", margemLucroUnitaria: "35%", lucrosTotais: 3500 },
    { id: 7, nome: "Produto G", margemLucroUnitaria: "40%", lucrosTotais: 4000 },
    { id: 8, nome: "Produto H", margemLucroUnitaria: "45%", lucrosTotais: 4500 },
    { id: 9, nome: "Produto I", margemLucroUnitaria: "50%", lucrosTotais: 5000 },
  ];
  return (
    <div className="bg-primaria-900 shadow-md rounded-3xl w-full xl:w-[320px] mt-7 xl:mt-0 p-5 md:px-4 md:py-5 lg:pt-7 lg:px-7">
      <h2 className='text-base text-neutral-800 font-semibold'>Vendas por Produtos</h2>
      <div className="overflow-auto h-[380px] xl:h-[670px]">
        <table className="min-w-full leading-normal">
          <thead className="sticky top-0 bg-primaria-900">
            <tr>
              <th className="px-3 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                Produto
              </th>
              <th className="px-3 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                Vendidos
              </th>
              <th className="px-3 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                Total de vendas
              </th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td className="px-3 py-5 text-center text-neutral-700 border-b border-gray-200 text-sm">
                  {produto.nome}
                </td>
                <td className="px-3 py-5 text-center text-neutral-700 border-b border-gray-200 text-sm">
                  {produto.margemLucroUnitaria}
                </td>
                <td className="px-3 py-5 text-center text-neutral-700 border-b border-gray-200 text-sm">
                  {produto.lucrosTotais}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
