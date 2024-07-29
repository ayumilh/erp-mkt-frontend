import dynamic from 'next/dynamic'

const ChartLine = dynamic(() => import('./ChartLine'), { ssr: false });

export const ChartContent = () => {
  return (
    <div className='w-full'>
      <div className=''>
        <h2 className='text-lg font-semibold'>vendas</h2>
        <span className='text-sm text-neutral-600 font-medium'>Uma visão geral dos dados da loja</span>
      </div>
      <ChartLine />
    </div>
  )
}
