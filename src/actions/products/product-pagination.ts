import prisma from '@/lib/prisma'
import { Gender } from '@prisma/client'

interface Props {
  take?: number
  page?: number
  gender?: Gender
}

export const getPaginateProductWithImage = async ({ take = 12, page = 1, gender }: Props) => {
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
            id: true,
          },
        },
        category: {
          select: {
            name: true,
            id: true,
          },
        },
      },
      where: {
        gender: gender,
      },
    })

  const fetchTotalCount = () =>
    prisma.product.count({
      where: {
        gender: {
          equals: gender,
        },
      },
    })

  try {
    const [products, totalCount] = await Promise.all([fetchProducts(), fetchTotalCount()])

    const totalPages = Math.ceil(totalCount / take)

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products,
    }
  } catch (error) {
    throw new Error('No se pudo encontrar')
  }
}
