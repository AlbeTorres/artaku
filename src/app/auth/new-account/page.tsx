import { PasswordTextField, TextField } from '@/components'
import { titleFont } from '@/config/fonts'
import Link from 'next/link'
import { FaEnvelope, FaUser } from 'react-icons/fa'

export default function RegisterPage() {
  return (
    <div className='flex flex-col min-h-screen justify-center'>
      <h1 className={`${titleFont.className} text-2xl mb-5`}>Nueva cuenta</h1>

      <div className='flex flex-col gap-y-4'>
        <TextField placeholder='Nombre Completo' icon={FaUser} />
        <TextField placeholder='Correo electónico' icon={FaEnvelope} autoComplete='new-password' />
        <PasswordTextField
          className='w-full'
          placeholder='Nueva contraseña'
          autoComplete='new-password'
        />
        <PasswordTextField
          className='w-full'
          placeholder='Validar contraseña'
          autoComplete='new-password'
        />

        <button className='btn-primary'>Confirmar</button>
        <Link href={'/auth/login'}>
          <p className='text-xs text-center hover:text-purple-700 hover:underline mt-2'>
            Ya tengo una cuenta
          </p>
        </Link>
      </div>
    </div>
  )
}
