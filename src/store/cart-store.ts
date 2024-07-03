import { CartProduct } from '@/interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  cart: CartProduct[]
  getTotalItems: () => number
  addProductToCart: (product: CartProduct) => void
  //   updateProductQuantity
  //   removeProductToCart
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => getTotalItems(get()),
      addProductToCart: (product: CartProduct) => addProductToCart(get(), set, product),
    }),
    { name: 'shopping-cart' }
  )
)

export function addProductToCart(
  state: State,
  set: (newState: Partial<State>) => void,
  product: CartProduct
) {
  const { cart } = state
  //Revizar si el producto esta en el carrito o si tiene la misma talla que el del carrito
  const productInCart = cart.some(item => item.id === product.id && item.size === product.size)

  if (!productInCart) {
    set({ cart: [...cart, product] })
    return
  }
  // se que el producto existe por talla en el cart y tengo que aumentar su cantidad
  const updateCartProduct = cart.map(item => {
    if (item.id === product.id && item.size === product.size) {
      return { ...item, quantity: item.quantity + product.quantity }
    }
    return item
  })

  set({ cart: updateCartProduct })
}

export function getTotalItems(state: State) {
  const { cart } = state
  return cart.reduce((total, item) => total + item.quantity, 0)
}
