/* eslint-disable react/no-unescaped-entities */
import { Title } from '@/components'
import { initialData } from '@/seed/seed'
import Image from 'next/image'
import Link from 'next/link'

const orden = {
  nombre: 'Alberto',
  dir: {
    dir1: '1922 Alexander Dr',
    dir2: null,
    apto: null,
    codigo_postal: '33803',
    estado: 'Fl',
    pais: 'EEUU',
  },
  movil: '7896664532',
  productos: [initialData.products[0], initialData.products[2], initialData.products[3]],
}

export default function CheckoutPage() {
  const subtotal = orden.productos.reduce((s, p) => s + p.price, 0)
  const impuesto = 0.15
  const cant = 3

  return (
    <div className='flex justify-center items-center mb-72 md:px-10'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Verificar orden' />
        <div className='grid sm:grid-cols-2 gap-10'>
          {/* carrito */}
          <div className='flex flex-col mt-5 gap-y-2 order-last md:order-1'>
            <span className='text-xl'>Lista de productos</span>
            <Link href={'/'} className='underline mb-5'>
              Editar pedido
            </Link>
            {/* items */}
            {orden.productos.map(product => (
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
                  <p>{`$${product.price} x ${cant}`}</p>
                  <p>
                    <span className='font-bold'>Subtotal: </span>
                    {'$' + product.price * cant}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className='bg-white rounded-md h-fit shadow-xl p-7 order-2'>
            <h2 className='text-2xl mb-2'>Dirección de entrega</h2>
            <div className='mb-10'>
              <p>{orden.nombre}</p>
              <p>{orden.dir.dir1}</p>
              {orden.dir.apto !== null && <p>{orden.dir.dir1}</p>}
              <p>{orden.dir.codigo_postal}</p>
              <p>{orden.dir.estado}</p>
              <p>{orden.dir.pais}</p>
              <p>{orden.movil}</p>
            </div>

            <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />

            <h2 className='text-2xl mb-2'>Resumen de orden</h2>
            <div className='grid grid-cols-2 gap-y-1'>
              <span>{'No. productos'}</span>
              <span className='text-right'>{`${orden.productos.length} articulos`}</span>
              <span>{'Subtotal'}</span>
              <span className='text-right'>{`$${subtotal.toFixed(2)}`}</span>
              <span>{'Impuestos'}</span>
              <span className='text-right'>{`$${(subtotal * impuesto).toFixed(2)}`}</span>

              <span className=''>{'Total'}</span>
              <span className='text-right'>{`$${(subtotal * impuesto + subtotal).toFixed(
                2
              )}`}</span>
            </div>
            <div className='mt-4'>
              <p className='mb-4 text-xs'>
                Al hacer click en "Pagar", aceptas nuestros{' '}
                <Link href={'/'} className='underline'>
                  Terminos y condiciones de uso
                </Link>{' '}
                y nuestra{' '}
                <Link className='underline' href={'/'}>
                  Politica de privacidad
                </Link>
              </p>
              <Link className='flex justify-center btn-primary' href={'/orders/123'}>
                Pagar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
