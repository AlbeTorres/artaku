import { ProductGrid, Title } from '@/components'
import { Category } from '@/interfaces'
import { initialData } from '@/seed/seed'

type Props = {
  params: {
    id: Category
  }
}

export default function CategoryPage({ params }: Props) {
  const { id } = params
  const products = initialData.products.filter(p => p.gender === id)

  const labels = {
    men: 'hombres',
    women: 'mujeres',
    kid: 'niños',
    unisex: 'unisex',
  }

  // if (id === 'kids') {
  //   notFound()
  // }

  return (
    <>
      <Title title={`Articulos de ${labels[id]}`} />
      <ProductGrid products={products} />
    </>
  )
}
