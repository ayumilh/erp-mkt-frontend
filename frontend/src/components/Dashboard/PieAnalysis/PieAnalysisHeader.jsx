import MoreVertIcon from '@mui/icons-material/MoreVert';
const PieAnalysisHeader = () => {
  return (
    <div className='flex justify-between mb-5'>
      <h2 className='text-base text-colorFont-200 font-semibold'>Analises</h2> 
      <MoreVertIcon sx={{ width: '34px', color: '#2D3748'}}/>
    </div>
  )
}

export default PieAnalysisHeader