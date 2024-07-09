import { FaCity, FaEnvelope, FaGlobe, FaHome, FaMapMarkerAlt, FaRoad, FaUserTie } from 'react-icons/fa'
export const ModalDetailsEndereco = ({ order }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr className='flex flex-row gap-4 mb-4'>
            <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
              <FaUserTie className="mr-2 text-cyan-500 h-4 w-4" />
              Destinatario
            </td>
            <td className='w-28 md:w-full lg:w-40'><p>{Array.isArray(order) ? order[0].receiver_name : order.receiver_name}</p></td>
          </tr>
          <tr className='flex flex-row gap-4 mb-4'>
            <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
              <FaRoad className="mr-2 text-cyan-500 h-4 w-4" />
              Rua
            </td>
            <td className='w-28 md:w-full lg:w-40'>{Array.isArray(order) ? order[0].street_name : order.street_name}</td>
          </tr>
          <tr className='flex flex-row gap-4 mb-4'> 
            <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
              <FaMapMarkerAlt className="mr-2 text-cyan-500 h-4 w-4" />
              Endereço
            </td>
            <td className='w-28 md:w-full lg:w-40'>{Array.isArray(order) ? order[0].address_line : order.address_line}</td>
          </tr>
          <tr className='flex flex-row gap-4 mb-4'>
            <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
              <FaHome className="mr-2 text-cyan-500 h-4 w-4" />
              Bairro
            </td>
            <td className='w-40'>{Array.isArray(order) ? order[0].neighborhood : order.neighborhood}</td>
          </tr>
          <tr className='flex flex-row gap-4 mb-4'>
            <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
              <FaCity className="mr-2 text-cyan-500 h-4 w-4" />
              Cidade
            </td>
            <td className='w-28 md:w-full lg:w-40'>{Array.isArray(order) ? order[0].city : order.city}</td>
          </tr>
          <tr className='flex flex-row gap-4 mb-4'>
            <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
              <FaMapMarkerAlt className="mr-2 text-cyan-500 h-4 w-4" />
              Estado
            </td>
            <td className='w-28 md:w-full lg:w-40'>{Array.isArray(order) ? order[0].state : order.state}</td>
          </tr>
          <tr className='flex flex-row gap-4 mb-4'>
            <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
              <FaEnvelope className="mr-2 text-cyan-500 h-4 w-4" />
              CEP
            </td>
            <td className='w-28 md:w-full lg:w-40'>{Array.isArray(order) ? order[0].zip_code : order.zip_code}</td>
          </tr>
          <tr className='flex flex-row gap-4 mb-4'>
            <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
              <FaGlobe className="mr-2 text-cyan-500 h-4 w-4" />
              País
            </td>
            <td className='w-28 md:w-full lg:w-40'>{Array.isArray(order) ? order[0].country : order.country}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
