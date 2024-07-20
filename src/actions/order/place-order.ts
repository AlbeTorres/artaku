'use server'

import { auth } from '@/auth.config'
import { Address, Size } from '@/interfaces'
import prisma from '@/lib/prisma'
import { Product } from '@prisma/client'

interface ProductToOrder {
  productId: string
  quantity: number
  size: Size
}

type OrderAddress = Address & { id?: string }

export const placeOrder = async (orderProducts: ProductToOrder[], orderAddress: OrderAddress) => {
  try {
    const session = await auth()
    const userId = session?.user.id

    if (!userId) {
      throw new Error('code 500')
    }

    //obtener info de producto
    //tener en cuenta que pueden venir productos con igual id pero diferente talla

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: orderProducts.map(p => p.productId),
        },
      },
    })

    //calcular los montos
    const subTotal = products.reduce((count, p) => {
      const auxPId = orderProducts.find(pI => pI.productId === p.id)

      if (!auxPId) throw new Error(`${p.id} not found :500`)

      return count + p.price * auxPId!.quantity
    }, 0)

    const tax = subTotal * 0.15
    const total = subTotal * 1.15

    const itemsInOrder = orderProducts.reduce((count, p) => p.quantity + count, 0)

    //insertar en la DB
    return await insertOrderToDB(
      userId,
      orderAddress,
      itemsInOrder,
      subTotal,
      total,
      tax,
      orderProducts,
      products
    )
  } catch (error) {
    console.log(error)
    return {
      ok: false,
    }
  }
}

const insertOrderToDB = async (
  userIdTx: string,
  orderAddress: OrderAddress,
  itemsInOrder: number,
  subTotal: number,
  total: number,
  tax: number,
  orderProducts: ProductToOrder[],
  products: Product[]
) => {
  const { country, id, ...restAddress } = orderAddress

  try {
    const prismaTx = await prisma.$transaction(async tx => {
      //1 actualizar el stock de los productos

      const updateProductsPromises = products.map(product => {
        //acomular valores
        const productQuantity = orderProducts
          .filter(p => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0)

        if (productQuantity === 0) {
          throw new Error(`${product.id}, no tiene cantidad definida`)
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: { decrement: productQuantity },
          },
        })
      })

      const updatedProducts = await Promise.all(updateProductsPromises)

      //verificar valores negativos en las existencia = no hay stock

      updatedProducts.forEach(product => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene inventario suficiente`)
        }
      })

      //2 crear la orden encabezado-detalle
      const order = await tx.order.create({
        data: {
          userId: userIdTx!,
          itemsInOrder: itemsInOrder,
          subtotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: orderProducts.map(p => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price: products.find(product => product.id === p.productId)?.price ?? 0,
              })),
            },
          },
        },
      })
      //3 crear direccion
      const addressTx = await tx.orderAddress.create({
        data: {
          ...restAddress,
          //Relations
          countryId: country,
          orderId: order.id,
        },
      })

      return {
        order: order,
        orderAddress: addressTx,
        updatedproducts: updatedProducts,
      }
    })

    return prismaTx
  } catch (error: any) {
    return { ok: false, message: error.message }
  }
}
