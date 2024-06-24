import Link from 'next/link'
import { IoCartOutline } from 'react-icons/io5'

export default function EmptyPage() {
  return (
    <div className='flex flex-col md:flex-row justify-center items-center h-[80vh] gap-y-4'>
      <IoCartOutline size={80} className='mx-5' />
      <div className='flex flex-col items-center gap-y-2'>
        <h2 className='text-xl font-semibold'>Tu carrito está vacío</h2>
        <Link className='btn-primary' href={'/'}>
          Regresar
        </Link>
      </div>
    </div>
  )
}
