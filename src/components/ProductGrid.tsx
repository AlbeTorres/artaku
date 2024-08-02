import { Product } from '@/interfaces'
import { ProductItem } from './ProductItem'

interface Props {
  products: Product[]
}
export const ProductGrid = ({ products }: Props) => {
  if (products.length === 0) {
    return (
      <>
        <h1>No hay productos ...comming soon</h1>
      </>
    )
  }

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-10 mb-10'>
      {products.map(p => (
        <ProductItem key={p.slug} product={p} />
      ))}
    </div>
  )
}
