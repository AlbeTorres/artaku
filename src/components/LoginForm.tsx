'use client'
import { authenticate } from '@/actions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { FaEnvelope } from 'react-icons/fa'
import { PasswordTextField, TextField } from './TextField'

export const LoginForm = () => {
  const router = useRouter()
  const [state, dispatch] = useFormState(authenticate, undefined)

  useEffect(() => {
    if (state === 'Success') {
      router.replace('/')
    }
  }, [state]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <form action={dispatch} className='flex flex-col gap-y-4'>
      <TextField name='email' placeholder='Correo electónico' icon={FaEnvelope} />
      <PasswordTextField
        name='password'
        className='w-full'
        placeholder='Contraseña'
        error={state === 'CredentialsSignin' ? 'Credenciales invalidas' : ''}
      />

      <button type='submit' className='btn-primary'>
        Ingresar
      </button>

      <Link href={'/recoverypassemail'}>
        <p className='text-xs text-center hover:text-purple-700 hover:underline mt-2'>
          Olvidé mi contraseña
        </p>
      </Link>

      {/* divisor line */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link href='/auth/new-account' className='btn-secondary text-center'>
        Crear una nueva cuenta
      </Link>
    </form>
  )
}
