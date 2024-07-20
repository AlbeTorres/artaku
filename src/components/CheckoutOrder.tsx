'use client'
import { placeOrder } from '@/actions'
import { useCartStore } from '@/store'
import { useAddressStore } from '@/store/address/address-store'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './Button'

export const CheckoutOrder = () => {
  const useAddress = useAddressStore(addres => addres.address)
  const productsInCart = useCartStore(state => state.cart)

  const { firstName, lastName, address, phone, zipcode, city, country, address2 } = useAddress

  const subtotal = productsInCart.reduce((s, p) => s + p.price * p.quantity, 0)
  const nproducts = productsInCart.reduce((s, p) => s + p.quantity, 0)
  const impuesto = 0.15

  const onPlaceOrder = async () => {
    const productsToOrder = productsInCart.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }))

    const eso = await placeOrder(productsToOrder, useAddress)
    console.log(eso)
  }

  return (
    <div className='grid sm:grid-cols-2 gap-10'>
      <div className='flex flex-col mt-5 gap-y-2 order-last md:order-1'>
        <span className='text-xl'>Lista de productos</span>
        <Link href={'/'} className='underline mb-5'>
          Editar pedido
        </Link>
        {/* items */}
        {productsInCart.map(product => (
          <div key={product.slug} className='flex'>
            <Image
              src={`/products/${product.image}`}
              alt={product.title}
              width={100}
              height={100}
              className='mr-5 rounded object-cover'
            />
            <div className='space-y-4 md:space-y-2'>
              <p className='line-clamp-1'>{product.title}</p>
              <p>{`$${product.price} x ${product.quantity} size-${product.size}`}</p>
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
          <p>{firstName}</p>
          <p>{lastName}</p>
          <p>{address}</p>
          <p>{address2}</p>
          <p>{zipcode}</p>
          <p>{city}</p>
          <p>{country}</p>
          <p>{phone}</p>
        </div>

        <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />

        <h2 className='text-2xl mb-2'>Resumen de orden</h2>
        <div className='grid grid-cols-2 gap-y-1'>
          <span>{'No. productos'}</span>
          <span className='text-right'>{`${nproducts} articulos`}</span>
          <span>{'Subtotal'}</span>
          <span className='text-right'>{`$${subtotal.toFixed(2)}`}</span>
          <span>{'Impuestos'}</span>
          <span className='text-right'>{`$${(subtotal * impuesto).toFixed(2)}`}</span>

          <span className=''>{'Total'}</span>
          <span className='text-right'>{`$${(subtotal * impuesto + subtotal).toFixed(2)}`}</span>
        </div>
        <div className='mt-4'>
          <p className='mb-4 text-xs'>
            {'Al hacer click en "Pagar", aceptas nuestros'}
            <Link href={'/'} className='underline'>
              Terminos y condiciones de uso
            </Link>{' '}
            y nuestra{' '}
            <Link className='underline' href={'/'}>
              Politica de privacidad
            </Link>
          </p>
          <Button className='btn-primary w-full' onClick={onPlaceOrder}>
            Pagar
          </Button>
        </div>
      </div>
    </div>
  )
}
