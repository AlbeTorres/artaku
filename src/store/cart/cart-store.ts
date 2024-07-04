import { CartProduct } from '@/interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  addProductToCart,
  getTotalItems,
  removeProductToCart,
  updateProductQuantity,
} from './cart-store-actions'

export interface State {
  cart: CartProduct[]
  getTotalItems: () => number
  addProductToCart: (product: CartProduct) => void
  updateProductQuantity: (product: CartProduct, quantity: number) => void
  removeProductToCart: (product: CartProduct) => void
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => getTotalItems(get()),
      addProductToCart: (product: CartProduct) => addProductToCart(get(), set, product),
      updateProductQuantity: (product: CartProduct, quantity: number) =>
        updateProductQuantity(get(), set, product, quantity),
      removeProductToCart: (product: CartProduct) => removeProductToCart(get(), set, product),
    }),
    { name: 'shopping-cart' }
  )
)
