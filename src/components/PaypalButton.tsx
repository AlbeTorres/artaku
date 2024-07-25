'use client'
import { paypalCheckPayment, setTransactionId } from '@/actions'
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from '@paypal/paypal-js'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

interface Props {
  orderId: string
  amount: number
}

export const PaypalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer()

  const rountedAmount = Math.round(amount * 100) / 100

  if (isPending) {
    return (
      <div className='animate-pulse mb-8 '>
        <div className='h-9 bg-gray-300 rounded'></div>
        <div className='h-9 bg-gray-300 rounded mt-2'></div>
        <div className='h-9 bg-gray-300 rounded mt-2'></div>
      </div>
    )
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: `${rountedAmount}`,
            currency_code: 'USD',
          },
        },
      ],
    })

    const response = await setTransactionId(transactionId, orderId)

    if (!response.ok) {
      throw new Error('No se pudo realizar la transacción')
    }

    return transactionId
  }

  const onApprove = async (data: OnApproveData, action: OnApproveActions) => {
    const details = await action.order?.capture()
    if (!details?.id) return

    await paypalCheckPayment(details.id)
  }

  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
}
