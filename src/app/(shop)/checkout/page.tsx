import { CheckoutOrder, Title } from '@/components'

export default async function CheckoutPage() {
  return (
    <div className='flex justify-center items-center mb-72 md:px-10'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Verificar orden' />
        <CheckoutOrder />
      </div>
    </div>
  )
}
