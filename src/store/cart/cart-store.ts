import { CartProduct } from '@/interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { addProductToCart, getTotalItems, updateProductQuantity } from './cart-store-actions'

export interface State {
  cart: CartProduct[]
  getTotalItems: () => number
  addProductToCart: (product: CartProduct) => void
  updateProductQuantity: (product: CartProduct, quantity: number) => void
  //   removeProductToCart
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => getTotalItems(get()),
      addProductToCart: (product: CartProduct) => addProductToCart(get(), set, product),
      updateProductQuantity: (product: CartProduct, quantity: number) =>
        updateProductQuantity(get(), set, product, quantity),
    }),
    { name: 'shopping-cart' }
  )
)
