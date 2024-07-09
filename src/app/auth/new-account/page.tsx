import { RegisterFrom } from '@/components'
import { titleFont } from '@/config/fonts'

export default function RegisterPage() {
  return (
    <div className='flex flex-col min-h-screen justify-center'>
      <h1 className={`${titleFont.className} text-2xl mb-5`}>Nueva cuenta</h1>

      <RegisterFrom />
    </div>
  )
}
