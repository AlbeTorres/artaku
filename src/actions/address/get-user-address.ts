'use server'

import prisma from '@/lib/prisma'

export const getUserAddress = async (userId: string) => {
  try {
    const userAddres = await prisma.userAddress.findUnique({ where: { userId } })

    return userAddres
  } catch (error) {
    console.log(error)
    return null
  }
}
