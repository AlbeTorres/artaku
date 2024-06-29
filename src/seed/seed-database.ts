import prisma from '../lib/prisma'
import { initialData } from './seed'

import { config } from 'dotenv'
config()

async function main() {
  // 1.Borrar registros viejos
  await prisma.product.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.category.deleteMany()

  const { categories, products } = initialData

  // 2.Insertar categorias
  const categorydata = categories.map(name => ({ name }))

  await prisma.category.createMany({ data: categorydata })

  const categoriesDB = await prisma.category.findMany()

  // 3.Insertar productos e imagenes
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id
    return map
  }, {} as Record<string, string>)

  products.forEach(async product => {
    const { type, images, ...rest } = product

    // products
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    })

    // images
    const imagesData = images.map(image => ({ url: image, productId: dbProduct.id }))

    await prisma.productImage.createMany({ data: imagesData })
  })

  console.log('seed ejecutado correctamente')
}

;(() => {
  if (process.env.NODE_ENV === 'production') return

  main()
})()
