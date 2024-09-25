import ChartMore from '@/components/Geral/Dropdown/ChartMore';

const PieAnalysisHeader = () => {
    return (
        <div className='flex justify-between mb-2'>
            <h2 className='text-base text-neutral-700 dark:text-gray-300 font-semibold'>Analises</h2>
            <ChartMore />
        </div>
    )
}

export default PieAnalysisHeader