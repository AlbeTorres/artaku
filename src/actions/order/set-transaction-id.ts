'use server'

import prisma from '@/lib/prisma'

export const setTransactionId = async (transactionId: string, orderId: string) => {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId,
      },
    })

    return {
      ok: true,
      data: order,
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo añadir el transactionid',
    }
  }
}
