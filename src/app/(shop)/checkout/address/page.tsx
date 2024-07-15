import { getCountries, getUserAddress } from '@/actions'
import { auth } from '@/auth.config'
import { AddressForm, Title } from '@/components'
import { parseAddress } from '@/utils/address.parse'

export default async function NamePage() {
  const contries = await getCountries()
  const session = await auth()
  const address = await getUserAddress(session!.user.id)

  return (
    <div className='flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0'>
      <div className='w-full  xl:w-[1000px] flex flex-col justify-center text-left'>
        <Title title='Dirección' subtitle='Dirección de entrega' />

        <AddressForm
          countries={contries}
          userId={session?.user.id}
          address={parseAddress(address)}
        />
      </div>
    </div>
  )
}
