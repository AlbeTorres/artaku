import { NavBar, SideBar } from '@/components'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='min-h-screen'>
      <NavBar />
      <SideBar />
      <div className='px-0 sm:px-10'>{children}</div>
    </main>
  )
}
