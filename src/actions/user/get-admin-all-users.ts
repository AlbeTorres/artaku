'use server'
import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

interface Props {
  take?: number
  page?: number
}

export const getPaginateAdminAllUsers = async ({ take = 12, page = 1 }: Props) => {
  const session = await auth()

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'No tiene permisos suficientes',
    }
  }

  if (isNaN(Number(page))) page = 1
  if (page < 1) page = 1

  const fetchAllUser = () =>
    prisma.user.findMany({
      orderBy: {
        name: 'desc',
      },
      take: take,
      skip: (page - 1) * take,
    })

  const fetchTotalCount = () => prisma.user.count({})

  try {
    const [users, totalCount] = await Promise.all([fetchAllUser(), fetchTotalCount()])

    const totalPages = Math.ceil(totalCount / take)

    return {
      currentPage: page,
      totalPages: totalPages,
      users: users,
    }
  } catch (error) {
    throw new Error('No se pudo encontrar')
  }
}
