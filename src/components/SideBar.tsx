'use client'
import { logout } from '@/actions'
import { admin_options, options } from '@/utils'
import clsx from 'clsx'
import { Session } from 'next-auth'
import { IoCloseOutline, IoLogOutOutline, IoSearchOutline } from 'react-icons/io5'
import { MenuItem } from './MenuItem'

interface Props {
  isSideMenuOpen: boolean
  closeMenu(): void
  session: Session | null
}

export const SideBar = ({ isSideMenuOpen, closeMenu, session }: Props) => {
  console.log(session)

  const isAuthenticated = !!session?.user

  return (
    <div>
      {/* background_black */}
      <div
        className={clsx({
          'fixed z-20 top-0 left-0 w-screen h-screen bg-black opacity-30': isSideMenuOpen,
        })}
      />

      {/* background_blur */}
      <div
        onClick={closeMenu}
        className={clsx({
          'fade-in fixed top-0 left-0 w-screen h-full z-20 backdrop-filter backdrop-blur-sm':
            isSideMenuOpen,
        })}
      />

      {/* sidemenu */}
      <nav
        className={clsx(
          'fixed p-5 right-0 top-0 w-full md:w-[35%] lg:w-1/4 h-screen bg-white z-30 shadow-2xl transform transition-all duration-300',
          { 'translate-x-full': !isSideMenuOpen }
        )}
      >
        <IoCloseOutline
          size={25}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={closeMenu}
        />

        {/* input */}
        <div className='relative mt-10 mb-5'>
          <IoSearchOutline size={18} className='absolute top-3 left-2' />
          <input
            type='text'
            placeholder='Buscar'
            className='w-full bg-gray-50 rounded px-10 py-2 border-b-2 text-md border-gray-200 focus:outline-none focus:border-blue-500 '
          />
        </div>

        <div className='space-y-5'>
          {options.map(option => (
            <MenuItem
              hide={
                (isAuthenticated && option.title === 'Ingresar') ||
                (!isAuthenticated && option.title === 'Profile')
              }
              close={closeMenu}
              key={option.title}
              icon={option.icon}
              title={option.title}
              href={option.href}
            />
          ))}
          {isAuthenticated && (
            <button
              onClick={() => logout()}
              className='flex items-center p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoLogOutOutline size={25} />
              <span className='ml-3 text-md'>{'Salir'}</span>
            </button>
          )}
        </div>

        <div className='w-full h-px bg-gray-200 my-3' />
        <div className='space-y-5'>
          {admin_options.map(option => (
            <MenuItem
              key={option.title}
              icon={option.icon}
              title={option.title}
              href={option.href}
              close={closeMenu}
            />
          ))}
        </div>
      </nav>
    </div>
  )
}
