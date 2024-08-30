import MoreVertIcon from '@mui/icons-material/MoreVert';
const PieAnalysisHeader = () => {
  return (
    <div className='flex justify-between mb-2'>
      <h2 className='text-base text-neutral-700 font-semibold'>Analises</h2> 
      <MoreVertIcon sx={{ width: '34px', color: '#2D3748'}}/>
    </div>
  )
}

export default PieAnalysisHeader