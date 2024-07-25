'use server'

import { PayPalOrderStatusResponse } from '@/interfaces'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const paypalCheckPayment = async (transactionId: string) => {
  const authToken = await getPayPalBearerToken()

  if (!authToken) {
    return { ok: false, message: 'No se pudo aobtener el token de verificacion' }
  }

  const resp = await verifyPaypalPayment(transactionId, authToken)

  if (!resp) {
    return {
      ok: !false,
      message: 'Error al vrificar el pago',
    }
  }

  const { status, purchase_units } = resp
  const { invoice_id } = purchase_units[0]

  try {
    await prisma.order.update({
      where: {
        id: invoice_id,
      },
      data: { isPaid: true, paidAt: new Date() },
    })

    revalidatePath(`/orders/${invoice_id}`)

    return {
      ok: true,
      message: 'orden pagada',
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'El pago no se pudo actualizar en la base de datos',
    }
  }
}

const getPayPalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? ''

  const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`, 'utf-8').toString(
    'base64'
  )

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
  myHeaders.append('Authorization', `Basic ${base64Token}`)

  const urlencoded = new URLSearchParams()
  urlencoded.append('grant_type', 'client_credentials')

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
  }

  try {
    const result = await fetch(oauth2Url, {
      ...requestOptions,
      cache: 'no-store',
    }).then(r => r.json())
    return result.access_token
  } catch (error) {
    console.log(error)
    return null
  }
}

const verifyPaypalPayment = async (
  transactionId: string,
  authToken: string
): Promise<PayPalOrderStatusResponse | null> => {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`

  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${authToken}`)

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  }

  try {
    const resp = await fetch(paypalOrderUrl, {
      ...requestOptions,
      cache: 'no-store',
    }).then(r => r.json())
    return resp
  } catch (error) {
    console.log(error)
    return null
  }
}
