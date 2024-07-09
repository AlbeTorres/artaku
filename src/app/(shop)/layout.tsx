import { auth } from '@/auth.config'
import { Container, Footer, Header } from '@/components'

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  return (
    <main className='min-h-screen'>
      <Header session={session} />
      <Container>
        <div className='px-0 sm:px-10'>{children}</div>
        <Footer />
      </Container>
    </main>
  )
}
