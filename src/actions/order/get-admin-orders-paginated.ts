'use server'
import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

interface Props {
  take?: number
  page?: number
}

export const getPaginateAdminAllOrders = async ({ take = 12, page = 1 }: Props) => {
  const session = await auth()

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'No tiene permisos suficientes',
    }
  }

  if (isNaN(Number(page))) page = 1
  if (page < 1) page = 1

  const fetchAllOrders = () =>
    prisma.order.findMany({
      orderBy: {
        createAt: 'desc',
      },
      take: take,
      skip: (page - 1) * take,
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    })

  const fetchTotalCount = () => prisma.order.count({})

  try {
    const [orders, totalCount] = await Promise.all([fetchAllOrders(), fetchTotalCount()])

    const totalPages = Math.ceil(totalCount / take)

    return {
      currentPage: page,
      totalPages: totalPages,
      orders: orders,
    }
  } catch (error) {
    throw new Error('No se pudo encontrar')
  }
}
