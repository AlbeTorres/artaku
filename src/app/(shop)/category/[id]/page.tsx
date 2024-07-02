export const revalidate = 300
import { getPaginateProductWithImage } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'
import { Category } from '@/interfaces'
import { notFound, redirect } from 'next/navigation'

type Props = {
  params: {
    id: Category
  }
  searchParams: {
    page?: string
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { id } = params
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products, totalPages } = await getPaginateProductWithImage({
    page,
    category: id,
  })

  if (products.length === 0) {
    redirect(`/category/${id}`)
  }

  const labels = {
    men: 'hombres',
    women: 'mujeres',
    kid: 'niños',
    unisex: 'unisex',
  }

  if (!(id in labels)) {
    notFound()
  }

  return (
    <>
      <Title title={`Articulos de ${labels[id]}`} />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  )
}
