'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

export const getOrderbyId = async (id: string) => {
  const session = await auth()

  if (!session?.user) {
    return {
      ok: false,
      message: 'Debe estar autenticado',
    }
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,
                ProductImages: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    })

    if (!order) {
      throw new Error('orden not found')
    }

    if (session.user.role === 'user') {
      if (session.user.id !== order.userId) {
        throw new Error('la orden no pertenecer al usuario que la solicita')
      }
    }

    return {
      ok: true,
      order: order,
    }
  } catch (error) {
    return {
      ok: false,
      message: 'error 500',
    }
  }
}
