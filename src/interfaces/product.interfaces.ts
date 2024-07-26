export interface Product {
  id: string
  description: string
  images: string[]
  inStock: number
  price: number
  sizes: Size[]
  slug: string
  tags: string[]
  title: string
  // type: Type
  gender: Category
}

export interface CartProduct {
  id: string
  slug: string
  image: string
  size: Size
  title: string
  price: number
  quantity: number
  inStock: number
}

export type Category = 'men' | 'women' | 'kid' | 'unisex'
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
export type Type = 'shirts' | 'pants' | 'hoodies' | 'hats'

export interface Country {
  name: string
  id: string
}

export interface Address {
  firstName: string
  lastName: string
  address: string
  address2?: string
  zipcode: number
  city: string
  country: string
  phone: string
}

export interface User {
  id: string
  name: string
  email: string
  emailVerified?: Date | null
  password: string
  role: string
  image?: string | null
}
