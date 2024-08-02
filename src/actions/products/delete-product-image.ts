'use server'

import prisma from '@/lib/prisma'
import { deleteImage } from '@/utils/imagesUploader'
import { revalidatePath } from 'next/cache'

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? ''

  try {
    await deleteImage(imageName)
    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    })

    revalidatePath('/admin/products')
    revalidatePath(`/admin/products/${deletedImage.product.slug}`)
    revalidatePath(`/products/${deletedImage.product.slug}`)
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'error al eliminar',
    }
  }
}
