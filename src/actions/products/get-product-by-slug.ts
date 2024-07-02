import prisma from '@/lib/prisma'

export const getProductbySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImages: {
          select: {
            url: true,
          },
        },
      },
      where: {
        slug: slug,
      },
    })

    if (!product) {
      return null
    }

    return {
      ...product,
      images: product.ProductImages.map(image => image.url),
    }
  } catch (error) {
    throw new Error('No se pudo encontrar producto por slug')
  }
}
