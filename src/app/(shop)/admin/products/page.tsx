import { getPaginateProductWithImage } from '@/actions'
import { CustomImage, Pagination, Title } from '@/components'
import { parseProducts } from '@/utils/product.parse'

import Link from 'next/link'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function AdminOrdersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { totalPages, ...response } = await getPaginateProductWithImage({ page })

  const products = parseProducts(response.products)

  return (
    <>
      <Title title='Administrar productos' />

      <div>
        <Link href={'/admin/products/new'}>Añadir producto</Link>
      </div>

      <div className='mb-10 '>
        <div className='mb-10 overflow-auto shadow rounded'>
          <table className='w-full'>
            <thead className='bg-gray-200 border-b'>
              <tr>
                <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  Imagen
                </th>
                <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  Título
                </th>
                <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  Precio
                </th>
                <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  Género
                </th>
                <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  Inventario
                </th>
                <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  Tallas
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.map(product => (
                <tr
                  key={product.id}
                  className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'
                >
                  <td className='p-2 w-20 whitespace-nowrap text-sm font-medium text-gray-900'>
                    <Link
                      className='cursor-pointer hover:text-purple-700'
                      href={`/admin/products/${product.id}`}
                    >
                      <CustomImage
                        src={product.images[0]?.url}
                        height={80}
                        width={80}
                        alt='Producto imagen'
                        className='h-20 w-20 object-cover rounded'
                      />
                    </Link>
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6  whitespace-nowrap'>
                    <Link
                      className='cursor-pointer hover:text-purple-700'
                      href={`/admin/products/${product.id}`}
                    >{`${product.title}`}</Link>
                  </td>

                  <td className='text-sm text-gray-900 font-light w-10 text-center px-2'>
                    ${product.price.toFixed(2)}
                  </td>
                  <td className='text-sm w-10  text-center text-gray-900 font-light'>
                    {product.gender}
                  </td>
                  <td className='text-sm w-10  text-center text-gray-900 font-light'>
                    {product.inStock}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 '>
                    {product.sizes.join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination totalPages={totalPages!} />
      </div>
    </>
  )
}
