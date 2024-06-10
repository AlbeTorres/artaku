import { ProductGrid, SideBar, Title } from '@/components'
import { initialData } from '@/seed/seed'

const products = initialData.products

export default function Home() {
  return (
    <>
      <SideBar />
      <Title title='Tienda' subtitle='Todos los productos' />
      <ProductGrid products={products} />
    </>
  )
}
