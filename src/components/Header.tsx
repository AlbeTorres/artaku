'use client'
import { Session } from 'next-auth'
import { useState } from 'react'
import { NavBar } from './Navbar'
import { SideBar } from './SideBar'

export const Header = ({ session }: { session: Session | null }) => {
  const [menuState, setMenuState] = useState(false)
  return (
    <>
      <NavBar openMenu={() => setMenuState(true)} />
      <SideBar session={session} isSideMenuOpen={menuState} closeMenu={() => setMenuState(false)} />
    </>
  )
}
