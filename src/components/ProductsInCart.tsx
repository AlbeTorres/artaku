'use client'
import { useCartStore } from '@/store'
import Image from 'next/image'
import Link from 'next/link'
import { QuantitySelector } from '.'

export const ProductsInCart = () => {
  const productsInCart = useCartStore(state => state.cart)
  const updateProductQuantity = useCartStore(state => state.updateProductQuantity)
  return (
    <div className='flex flex-col mt-5 gap-y-2 order-last md:order-1'>
      <span className='text-xl'>Agregar más items</span>
      <Link href={'/'} className='underline mb-5'>
        Continúa comprando
      </Link>
      {/* items */}
      {productsInCart.map(product => (
        <div key={`${product.slug}${product.size} `} className='flex'>
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            width={100}
            height={100}
            className='mr-5 rounded object-cover h-auto w-auto'
            priority
          />
          <div className='space-y-4 md:space-y-2'>
            <Link href={`/product/${product.slug}`}>
              <p className='line-clamp-1'>{product.title}</p>
            </Link>
            <div className='flex items-center gap-x-5'>
              <p>{`Talla: ${product.size}`} </p> <p>${product.price}</p>
            </div>

            <QuantitySelector
              quantity={product.quantity}
              maxStock={product.inStock}
              setQuantity={quantity => updateProductQuantity(product, quantity)}
            />
            <p>{product.inStock}</p>
            <button className='underline'>Remove</button>
          </div>
        </div>
      ))}
    </div>
  )
}
