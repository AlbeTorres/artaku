import { auth } from '@/auth.config'
import { Title } from '@/components'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user) {
    // redirect('/auth/login?returnTo=/profile')
    redirect('/')
  }

  return (
    <div>
      <Title title='Perfil' />

      <div className='p-4 space-y-4'>
        <img src={session.user.image} className='w-10 h-10' />
        <p>
          <span>{'id: '}</span>
          {session.user.id}
        </p>
        <p>
          <span>{'name: '}</span>
          {session.user.name}
        </p>
        <p>
          <span>{'email: '}</span>
          {session.user.email}
        </p>
        <p>
          <span>{'verificado: '}</span>
          {session.user.emailVerified ? 'true' : 'false'}
        </p>
        <p>
          <span>{'role: '}</span>
          {session.user.role}
        </p>
      </div>
    </div>
  )
}
