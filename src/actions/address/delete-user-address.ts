'use server'
import prisma from '@/lib/prisma'

export const deleteUserAddress = async (userId: string) => {
  try {
    const userAddress = await prisma.userAddress.findUnique({ where: { userId } })

    if (userAddress) {
      await prisma.userAddress.delete({ where: { userId } })
      return {
        ok: true,
        message: 'Dirección eliminada',
      }
    }

    return { ok: true, message: 'dirección no encontrada para ese userId' }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo eliminar la dirección',
    }
  }
}
