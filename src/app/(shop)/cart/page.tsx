import { QuantitySelector, Title } from '@/components'
import { initialData } from '@/seed/seed'
import Image from 'next/image'
import Link from 'next/link'

const productCart = [initialData.products[0], initialData.products[2], initialData.products[3]]

export default function CartPage() {
  const subtotal = productCart.reduce((s, p) => s + p.price, 0)
  const impuesto = 0.15

  return (
    <div className='flex justify-center items-center mb-72 md:px-10'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Carrito' />
        <div className='grid sm:grid-cols-2 gap-10'>
          {/* carrito */}
          <div className='flex flex-col mt-5 gap-y-2 order-last md:order-1'>
            <span className='text-xl'>Agregar más items</span>
            <Link href={'/'} className='underline mb-5'>
              Continúa comprando
            </Link>
            {/* items */}
            {productCart.map(product => (
              <div key={product.slug} className='flex'>
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  className='mr-5 rounded object-cover'
                />
                <div className='space-y-4 md:space-y-2'>
                  <p className='line-clamp-1'>{product.title}</p>
                  <p>${product.price}</p>
                  <QuantitySelector quantity={1} />
                  <button className='underline'>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className='bg-white rounded-md h-fit shadow-xl p-7 order-2'>
            <h2 className='text-2xl mb-2'>Resumen de órdenes</h2>
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
