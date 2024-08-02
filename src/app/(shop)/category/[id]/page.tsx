export const revalidate = 300

import { getPaginateProductWithImage } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'
import { Gender } from '@/interfaces'
import { parseProducts } from '@/utils/product.parse'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound, redirect } from 'next/navigation'

type Props = {
  params: {
    id: Gender
  }
  searchParams: {
    page?: string
  }
}

const labels = {
  men: 'hombres',
  women: 'mujeres',
  kid: 'niños',
  unisex: 'unisex',
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  //read route params
  const id = params.id

  //fetch data
  // const product = await getProductbySlug(slug)

  //optionally access and extend (rater than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `Productos otakus para ${labels[id]}`,
    description: `Mejores precios en productos otakus para ${labels[id]}`,
    openGraph: {
      title: `Productos otakus para ${labels[id]}`,
      description: `Mejores precios en productos otakus para ${labels[id]}`,
      images: [`/img/zombi-sama.png`],
    },
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { id } = params
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products, totalPages } = await getPaginateProductWithImage({
    page,
    gender: id,
  })

  if (products.length === 0) {
    redirect(`/category/${id}`)
  }

  if (!(id in labels)) {
    notFound()
  }

  return (
    <>
      <Title title={`Articulos de ${labels[id]}`} />
      <ProductGrid products={parseProducts(products)} />
      <Pagination totalPages={totalPages} />
    </>
  )
}
