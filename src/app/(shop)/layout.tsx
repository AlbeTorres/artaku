import { Container, NavBar, SideBar } from '@/components'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='min-h-screen'>
      <NavBar />
      <SideBar />
      <Container>
        <div className='px-0 sm:px-10'>{children}</div>
      </Container>
    </main>
  )
}
