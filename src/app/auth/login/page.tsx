import { LoginForm } from '@/components/LoginForm'
import { titleFont } from '@/config/fonts'

export default function LoginPage() {
  return (
    <div className='flex flex-col min-h-screen justify-center'>
      <h1 className={`${titleFont.className} text-2xl mb-5`}>Ingresar</h1>
      <LoginForm />
    </div>
  )
}
