'use server'

import { auth } from '@/auth.config'
import { Role } from '@/interfaces'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const changeUserRol = async (userId: string, rol: Role) => {
  const session = await auth()

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'No tiene permisos suficientes',
    }
  }
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: rol,
      },
    })

    revalidatePath('/admin/users')

    return {
      ok: true,
      message: 'rol actualizado correctamente',
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo actualizar el rol del usuario',
    }
  }
}
