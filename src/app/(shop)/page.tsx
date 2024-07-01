import { getPaginateProductWithImage } from '@/actions'
import { ProductGrid, Title } from '@/components'

export default async function Home() {
  const { products } = await getPaginateProductWithImage()

  return (
    <>
      <Title title='Tienda' subtitle='Todos los productos' />
      <ProductGrid products={products} />
    </>
  )
}
