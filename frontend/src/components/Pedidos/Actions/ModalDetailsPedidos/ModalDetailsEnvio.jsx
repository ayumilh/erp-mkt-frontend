import { FaTruck } from 'react-icons/fa'

export const ModalDetailsEnvio = ({ order }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr className='flex flex-row gap-4 mb-4'>
            <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
              <FaTruck className="mr-2 text-cyan-500 h-4 w-4" />
              Metodo de Envio
            </td>
            <td className='w-28 md:w-full lg:w-40'>{Array.isArray(order) ? order[0].tracking_method : order.tracking_method}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
