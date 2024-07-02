import BtnBackPage from '@/components/Geral/Button/BtnBackPage';

const SincronizarHeader = () => {
  return (
    <div className="w-[373px] md:w-[720px] lg:w-[876px] xl:w-[1264px] flex flex-col mx-auto lg:mx-0 mb-10">
      <div className="flex mb-8 ml-6 gap-6 xs:ml-0">
        <div style={{ display: 'inline-block' }}>
          <BtnBackPage title='' modal={false}/>
        </div>
      </div>
    </div>
  )
}

export default SincronizarHeader