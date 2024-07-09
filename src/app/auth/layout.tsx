import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (session?.user) {
    redirect('/')
  }

  return (
    <div className='flex justify-center'>
      <div className='w-11/12 md:w-1/4 xl:w-[20%]'>{children}</div>
    </div>
  )
}
