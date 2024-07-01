import prisma from '@/lib/prisma'

export const getPaginateProductWithImage = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        ProductImages: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    })

    return {
      products: products.map(p => ({
        ...p,
        images: p.ProductImages.map(i => i.url),
      })),
    }
  } catch (error) {
    throw new Error('No se pudo encontrar')
  }
}
