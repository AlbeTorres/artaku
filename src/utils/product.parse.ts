import { Gender, Size } from '@/interfaces'

interface ProductDB {
  category: {
    name: string
    id: string
  }
  ProductImages: {
    url: string
    id: number
  }[]
  id: string
  title: string
  description: string
  inStock: number
  price: number
  sizes: Size[]
  slug: string
  tags: string[]
  gender: Gender
  categoryId: string
}

export const parseProducts = (products: ProductDB[]) => {
  return products.map(p => parseProduct(p))
}

export const parseProduct = (product: ProductDB) => {
  return {
    images: product.ProductImages,
    id: product.id,
    description: product.description,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes,
    slug: product.slug,
    tags: product.tags,
    title: product.title,
    gender: product.gender,
    category: product.category.name,
    categoryId: product.categoryId,
  }
}
