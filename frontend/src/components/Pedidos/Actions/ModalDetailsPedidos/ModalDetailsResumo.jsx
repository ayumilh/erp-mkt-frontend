import { FaHashtag, FaListAlt, FaRegCalendarAlt, FaTag, FaUser, FaUserTie } from 'react-icons/fa'
export const ModalDetailsResumo = ({ order }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr className='flex flex-row gap-4 mb-4'>
            <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
              <FaListAlt className="mr-2 text-cyan-500 h-3 w-3" /> 
              N° do pedido
            </td>
            <td className='w-40'>{Array.isArray(order) ? order[0].order_id : order.order_id}</td>
          </tr>
          <tr className='flex flex-row gap-4 mb-4'>
            <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
              <FaUser className="mr-2 text-cyan-500 h-3 w-3" />
              Comprador
            </td>
            <td className='w-40'>{Array.isArray(order) ? order[0].receiver_name : order.receiver_name}</td>
          </tr>
          <tr className='flex flex-row gap-4 mb-4'>
            <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
              <FaUserTie className="mr-2 text-cyan-500 h-3 w-3" />
              Vendedor
            </td>
            <td className='w-40'>{Array.isArray(order) ? order[0].seller_nickname : order.seller_nickname}</td>
          </tr>
          <tr className='flex flex-row gap-4 mb-4'>
            <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
              <FaTag className="mr-2 text-cyan-500 h-4 w-4" />
              Preço do produto
            </td>
            <td className='w-40'>{Array.isArray(order) ? order[0].total_paid_amount : order.total_paid_amount}</td>
          </tr>
          <tr className='flex flex-row gap-4 mb-4'>
            <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
              <FaHashtag className="mr-2 text-cyan-500 h-3 w-3" />
              Quantidade
            </td>
            <td className='w-40'>{Array.isArray(order) ? order[0].quantity : order.quantity}</td>
          </tr>
          <tr className='flex flex-row gap-4 mb-4'>
            <td className='w-28 md:w-full lg:w-40 flex justify-start items-center'>
              <FaRegCalendarAlt className="mr-2 text-cyan-500 h-4 w-4" />
              <span className='text-sm font-medium'>Última atualização</span>
            </td>
            <td className='w-28 md:w-full lg:w-40'>{new Date(Array.isArray(order) ? order[0].date_last_modified : order.date_last_modified).toLocaleDateString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
