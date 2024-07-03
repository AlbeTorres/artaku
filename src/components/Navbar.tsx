'use client'
import { titleFont } from '@/config/fonts'
import { useCartStore } from '@/store'
import { useUIStore } from '@/store/ui-store'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'
import { Container } from './Container'

export const NavBar = () => {
  const openMenu = useUIStore(state => state.openSideMenu)
  const cartItems = useCartStore(state => state.getTotalItems())

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div className='sticky top-0 bg-base-100/80 backdrop-blur-lg shadow-sm z-10 w-full'>
      <Container>
        <nav className='flex px-5 justify-between items-center w-full '>
          <div>
            <Link href={'/'}>
              <span className={`${titleFont.className} antialiased font-bold`}>Artaku</span>
            </Link>
          </div>
          <div className='hidden sm:block'>
            <Link href={'/category/men'} className='m-2 p-2 transition-all hover:text-purple-700 '>
              Hombres
            </Link>
            <Link href={'/category/women'} className='m-2 p-2 transition-all hover:text-purple-700'>
              Mujeres
            </Link>
            <Link href={'/category/kid'} className='m-2 p-2 transition-all hover:text-purple-700'>
              Niños
            </Link>
          </div>
          <div className='flex items-center gap-x-2'>
            <Link href={'/search'}>
              <IoSearchOutline className='w-5 h-5' />
            </Link>
            <Link href={'/cart'}>
              <div className='relative'>
                {cartItems > 0 && loaded && (
                  <span className='absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-purple-700 text-white'>
                    {cartItems}
                  </span>
                )}
                <IoCartOutline className='w-5 h-5' />
              </div>
            </Link>
            <button
              onClick={() => openMenu()}
              className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
            >
              Menú
            </button>
          </div>
        </nav>
      </Container>
    </div>
  )
}
