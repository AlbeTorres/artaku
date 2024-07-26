import { getPaginateAdminAllUsers } from '@/actions'
import { Pagination, Title } from '@/components'
import { UsersTable } from '@/components/UsersTable'

import { redirect } from 'next/navigation'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function AdminOrdersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { users, totalPages } = await getPaginateAdminAllUsers({ page })
  if (users!.length === 0) {
    redirect('/')
  }
  return (
    <>
      <Title title='Usuarios' />

      <div className='mb-10'>
        <UsersTable users={users} />
        <Pagination totalPages={totalPages!} />
      </div>
    </>
  )
}
