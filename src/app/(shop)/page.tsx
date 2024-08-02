export const revalidate = 300
import { getPaginateProductWithImage } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'
import { parseProducts } from '@/utils/product.parse'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { products, totalPages } = await getPaginateProductWithImage({ page })

  return (
    <>
      <Title title='Tienda' subtitle='Todos los productos' />
      <ProductGrid products={parseProducts(products)} />
      <Pagination totalPages={totalPages} />
    </>
  )
}
