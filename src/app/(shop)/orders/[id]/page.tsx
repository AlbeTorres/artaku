import { getOrderbyId } from '@/actions'
import { PaypalButton, Title } from '@/components'
import clsx from 'clsx'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { IoCardOutline } from 'react-icons/io5'

interface Props {
  params: {
    id: string
  }
}

export default async function OrderPage({ params }: Props) {
  const { id } = params
  const { ok, order } = await getOrderbyId(id)
  if (!ok) {
    notFound()
  }
  //Todo: verificar
  //redirect

  return (
    <div className='flex justify-center items-center mb-72 md:px-10'>
      <div className='flex flex-col w-[1000px]'>
        <Title title={`Orden #${order?.id}`} />
        <div className='grid sm:grid-cols-2 gap-10'>
          {/* carrito */}
          <div className='flex flex-col mt-5 gap-y-2 order-last md:order-1'>
            <div className='mt-4'>
              <div
                className={clsx(
                  'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',

                  order?.isPaid ? 'bg-green-500' : 'bg-red-500'
                )}
              >
                <IoCardOutline size={30} />
                <span className='mx-2'>{order?.isPaid ? 'Pagada' : 'Pendiente de pago'}</span>
              </div>
            </div>
            {/* items */}
            {order?.OrderItem.map(product => (
              <div key={product.product.slug + '-' + product.size} className='flex'>
                <Image
                  src={`/products/${product.product.ProductImages[0].url}`}
                  alt={product.product.title}
                  width={100}
                  height={100}
                  className='mr-5 rounded object-cover'
                />
                <div className='space-y-4 md:space-y-2'>
                  <p className='line-clamp-1'>{product.product.title}</p>
                  <p>{`$${product.price} x ${product.quantity}`}</p>
                  <p>
                    <span className='font-bold'>Subtotal: </span>
                    {'$' + product.price * product.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className='bg-white rounded-md h-fit shadow-xl p-7 order-2'>
            <h2 className='text-2xl mb-2'>Dirección de entrega</h2>
            <div className='mb-10'>
              <p>{`${order?.OrderAddress?.firstName} ${order?.OrderAddress?.lastName} `}</p>
              <p>{order?.OrderAddress?.address}</p>
              <p>{order?.OrderAddress?.address2}</p>
              <p>{order?.OrderAddress?.zipcode}</p>
              <p>{order?.OrderAddress?.city}</p>
              <p>{order?.OrderAddress?.countryId}</p>
              <p>{order?.OrderAddress?.phone}</p>
            </div>

            <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />

            <h2 className='text-2xl mb-2'>Resumen de orden</h2>
            <div className='grid grid-cols-2 gap-y-1'>
              <span>{'No. productos'}</span>
              <span className='text-right'>{`${order?.itemsInOrder} articulos`}</span>
              <span>{'Subtotal'}</span>
              <span className='text-right'>{`$${order?.subtotal.toFixed(2)}`}</span>
              <span>{'Impuestos'}</span>
              <span className='text-right'>{`$${order?.tax.toFixed(2)}`}</span>

              <span className=''>{'Total'}</span>
              <span className='text-right'>{`$${order?.total.toFixed(2)}`}</span>
            </div>

            <div className='mt-4'>
              {!order!.isPaid && <PaypalButton amount={order!.total} orderId={order!.id} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
