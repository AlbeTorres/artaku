import { getCategories, getProductbyId } from '@/actions'
import { ProductForm, Title } from '@/components'
import { parseProduct } from '@/utils/product.parse'
import { redirect } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = params

  const response = await getProductbyId(id)
  const { categories } = await getCategories()

  //TODO new
  if (!response?.product) {
    redirect('/admin/products')
  }

  const product = parseProduct(response.product)

  const title = 'Editar producto'

  return (
    <>
      <Title title={title} />
      <ProductForm product={product} categories={categories} />
    </>
  )
}
