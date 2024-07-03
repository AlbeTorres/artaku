import { ProductsInCart, Title } from '@/components'

import { initialData } from '@/seed/seed'

import Link from 'next/link'
import { redirect } from 'next/navigation'

const productCart = [initialData.products[0], initialData.products[2], initialData.products[3]]

export default function CartPage() {
  if (productCart.length === 0) {
    redirect('/empty')
  }

  const subtotal = productCart.reduce((s, p) => s + p.price, 0)
  const impuesto = 0.15

  return (
    <div className='flex justify-center items-center mb-72 '>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Carrito' />
        <div className='grid sm:grid-cols-2 gap-10'>
          {/* carrito */}
          <ProductsInCart />

          <div className='bg-white rounded-md h-fit shadow-xl p-7 order-2'>
            <h2 className='text-2xl mb-2'>Resumen de orden</h2>
            <div className='grid grid-cols-2 gap-y-1'>
              <span>{'No. productos'}</span>
              <span className='text-right'>{`${productCart.length} articulos`}</span>
              <span>{'Subtotal'}</span>
              <span className='text-right'>{`$${subtotal.toFixed(2)}`}</span>
              <span>{'Impuestos'}</span>
              <span className='text-right'>{`$${(subtotal * impuesto).toFixed(2)}`}</span>
            </div>
            <div className='mt-4'>
              <Link className='flex justify-center btn-primary' href={'/checkout/address'}>
                Confirmar compra
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
