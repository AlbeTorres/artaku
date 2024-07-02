import prisma from '@/lib/prisma'

interface Props {
  take?: number
  page?: number
}

export const getPaginateProductWithImage = async ({ take = 12, page = 1 }: Props) => {
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
    })

  const fetchTotalCount = () => prisma.product.count({})

  try {
    const [products, totalCount] = await Promise.all([fetchProducts(), fetchTotalCount()])

    const totalPage = Math.ceil(totalCount / take)

    return {
      currentPage: page,
      totalPage: totalPage,
      products: products.map(p => ({
        ...p,
        images: p.ProductImages.map(i => i.url),
      })),
    }
  } catch (error) {
    throw new Error('No se pudo encontrar')
  }
}
