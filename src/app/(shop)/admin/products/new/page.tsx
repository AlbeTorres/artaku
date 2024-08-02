import { getCategories } from '@/actions'
import { ProductForm, Title } from '@/components'

export default async function NewProductPage() {
  const { categories } = await getCategories()

  //TODO new

  const title = 'Nuevo producto'
  const product = {
    title: '',
    slug: '',
    description: '',
    price: 0,
    tags: [''],
    sizes: [],
    gender: undefined,
    inStock: 0,
    categoryId: '',
    images: undefined,
  }

  return (
    <>
      <Title title={title} />
      <ProductForm product={product} categories={categories} />
    </>
  )
}
