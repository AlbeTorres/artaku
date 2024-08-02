'use client'

import { CartProduct, Product, Size } from '@/interfaces'
import { useCartStore } from '@/store'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { QuantitySelector, SizeSelector } from '.'

interface Props {
  product: Product
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore(state => state.addProductToCart)
  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState<number>(1)

  const onAddToCart = () => {
    if (!size) {
      toast.error('Debes seleccionar una talla', {
        duration: 1500,
        className: 'text-xs',
      })
      return
    }

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      image: product.images[0].url,
      size: size,
      title: product.title,
      price: product.price,
      quantity: quantity,
      inStock: product.inStock,
    }
    addProductToCart(cartProduct)
    setSize(undefined)
    setQuantity(1)
  }

  return (
    <>
      {/* selector de tallas */}
      <SizeSelector availableSize={product.sizes} selectedSize={size} selectSize={setSize} />
      {/* selector de cantidad */}
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} maxStock={product.inStock} />
      <button onClick={onAddToCart} className='btn-primary my-5'>
        Agregar al carrito
      </button>
    </>
  )
}
