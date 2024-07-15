'use server'

import { Address } from '@/interfaces'
import prisma from '@/lib/prisma'

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const userAddress = await createOrReplaceAddress(address, userId)

    return {
      ok: true,
      data: userAddress,
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo agregar la dirección',
    }
  }
}

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storeAddress = await prisma.userAddress.findUnique({
      where: { userId },
    })

    const { country, ...rest } = address

    if (!storeAddress) {
      const newAddress = await prisma.userAddress.create({
        data: { ...rest, userId: userId, countryId: country },
      })

      return newAddress
    }

    const updateAddress = await prisma.userAddress.update({
      where: { userId },
      data: { ...rest, userId: userId, countryId: country },
    })

    return updateAddress
  } catch (error) {
    console.log(error)
    throw new Error('No se pudo agregar la dirección')
  }
}
