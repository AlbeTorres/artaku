import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  address: {
    firstName: string
    lastName: string
    address: string
    address2?: string
    zipcode: number
    city: string
    country: string
    phone: string
  }
  setAddress: (address: State['address']) => void
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        zipcode: 0,
        city: '',
        country: '',
        phone: '',
      },
      setAddress: address => {
        set({ address })
      },
    }),
    { name: 'address' }
  )
)
