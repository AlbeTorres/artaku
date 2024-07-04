import { ProductsInCart, Title } from '@/components'
import { CartSummary } from '@/components/CartSummary'

export default function CartPage() {
  return (
    <div className='flex justify-center items-center mb-72 '>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Carrito' />
        <div className='grid sm:grid-cols-2 gap-10'>
          {/* carrito */}
          <ProductsInCart />
          <CartSummary />
        </div>
      </div>
    </div>
  )
}
