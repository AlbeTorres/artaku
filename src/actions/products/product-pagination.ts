import prisma from '@/lib/prisma'
import { Gender } from '@prisma/client'

interface Props {
  take?: number
  page?: number
  category?: Gender
}

export const getPaginateProductWithImage = async ({ take = 12, page = 1, category }: Props) => {
  if (isNaN(Number(page))) page = 1
  if (page < 1) page = 1

  const fetchProducts = () =>
    prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImages: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      where: {
        gender: category,
      },
    })

  const fetchTotalCount = () =>
    prisma.product.count({
      where: {
        gender: {
          equals: category,
        },
      },
    })

  try {
    const [products, totalCount] = await Promise.all([fetchProducts(), fetchTotalCount()])

    const totalPages = Math.ceil(totalCount / take)

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map(p => ({
        ...p,
        images: p.ProductImages.map(i => i.url),
      })),
    }
  } catch (error) {
    throw new Error('No se pudo encontrar')
  }
}
