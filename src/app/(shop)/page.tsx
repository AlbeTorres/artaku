import { getPaginateProductWithImage } from '@/actions'
import { ProductGrid, Title } from '@/components'
import { redirect } from 'next/navigation'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { products, currentPage, totalPage } = await getPaginateProductWithImage({ page })

  if (products.length === 0) {
    redirect('/')
  }

  return (
    <>
      <Title title='Tienda' subtitle='Todos los productos' />
      <ProductGrid products={products} />
    </>
  )
}
