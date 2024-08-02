'use client'
import { useCartStore } from '@/store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const CartSummary = () => {
  const productCart = useCartStore(state => state.cart)
  const router = useRouter()

  useEffect(() => {
    if (productCart.length === 0) {
      router.replace('/empty')
    } else {
      router.replace('/cart')
    }
  }, [productCart]) // eslint-disable-line react-hooks/exhaustive-deps

  const subTotal = productCart.reduce(
    (subTotal, product) => product.quantity * product.price + subTotal,
    0
  )
  const itemsInCart = productCart.reduce((subTotal, product) => product.quantity + subTotal, 0)
  const impuesto = 0.15
  return (
    <div className='bg-white rounded-md h-fit shadow-xl p-7 order-2'>
      <h2 className='text-2xl mb-2'>Resumen de orden</h2>
      <div className='grid grid-cols-2 gap-y-1'>
        <span>{'No. productos'}</span>
        <span className='text-right'>{`${itemsInCart} articulos`}</span>
        <span>{'Subtotal'}</span>
        <span className='text-right'>{`$${subTotal.toFixed(2)}`}</span>
        <span>{'Impuestos'}</span>
        <span className='text-right'>{`$${(subTotal * impuesto).toFixed(2)}`}</span>
        <span>{'Total'}</span>
        <span className='text-right'>{`$${(subTotal * impuesto + subTotal).toFixed(2)}`}</span>
      </div>
      <div className='mt-4'>
        <Link className='flex justify-center btn-primary' href={'/checkout/address'}>
          Confirmar compra
        </Link>
      </div>
    </div>
  )
}
