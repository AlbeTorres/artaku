'use server'

import prisma from '@/lib/prisma'
import { uploadImages } from '@/utils/imagesUploader'
import { Gender, Product, Size } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const productSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform(val => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform(val => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform(val => val.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
})

export const UpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData)
  const parsedProduct = productSchema.safeParse(data)

  if (!parsedProduct.success) {
    console.log(parsedProduct.error)
    return { ok: false }
  }
  const product = parsedProduct.data
  product.slug = product.slug.toLocaleLowerCase().replace(/ /g, '-').trim()
  const { id, ...rest } = product

  try {
    const prismaTx = await prisma.$transaction(async tx => {
      let productDB: Product
      const tagsArray = rest.tags.split(',').map(t => t.trim().toLowerCase())

      //actualizar
      productDB = await prisma.product.update({
        where: {
          id,
        },
        data: {
          ...rest,
          sizes: { set: rest.sizes as Size[] },
          tags: { set: tagsArray },
        },
      })

      if (formData.getAll('images')) {
        const images = await uploadImages(formData.getAll('images') as File[])
        if (!images) {
          throw new Error('No se pudo cargar las imagenes, rollingback')
        }
        await prisma.productImage.createMany({
          data: images.map(image => ({ url: image!, productId: productDB.id })),
        })
      }

      return productDB
    })

    revalidatePath('/admin/products')
    return { ok: true, product: prismaTx }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'something went wrong',
    }
  }
}
