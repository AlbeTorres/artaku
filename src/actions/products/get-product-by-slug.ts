import prisma from '@/lib/prisma'

export const getProductbySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImages: {
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
        slug: slug,
      },
    })

    if (!product) {
      return null
    }

    return {
      ok: true,
      product,
    }
  } catch (error) {
    throw new Error('No se pudo encontrar producto por slug')
  }
}
