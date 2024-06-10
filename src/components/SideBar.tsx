'use client'
import { useUIStore } from '@/store/ui-store'
import { admin_options, options } from '@/utils'
import clsx from 'clsx'
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5'
import { MenuItem } from './MenuItem'

export const SideBar = () => {
  const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen)
  const closeMenu = useUIStore(state => state.closeSideMenu)

  return (
    <div>
      {/* background_black */}
      <div
        className={clsx({
          'fixed z-10 top-0 left-0 w-screen h-screen bg-black opacity-30': isSideMenuOpen,
        })}
      />

      {/* background_blur */}
      <div
        onClick={closeMenu}
        className={clsx({
          'fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm':
            isSideMenuOpen,
        })}
      />

      {/* sidemenu */}
      <nav
        className={clsx(
          'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          { 'translate-x-full': !isSideMenuOpen }
        )}
      >
        <IoCloseOutline
          size={50}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={closeMenu}
        />

        {/* input */}
        <div className='relative mt-14'>
          <IoSearchOutline size={20} className='absolute top-3 left-2' />
          <input
            type='text'
            placeholder='Buscar'
            className='w-full bg-gray-50 rounded px-10 py-2 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500 '
          />
        </div>

        {options.map(option => (
          <MenuItem key={option.title} icon={option.icon} title={option.title} href={option.href} />
        ))}

        <div className='w-full h-px bg-gray-200 my-10' />
        {admin_options.map(option => (
          <MenuItem key={option.title} icon={option.icon} title={option.title} href={option.href} />
        ))}
      </nav>
    </div>
  )
}
