'use client'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { FaEnvelope, FaUser } from 'react-icons/fa'

import { login, regsiterUser } from '@/actions'
import { regexps } from '@/utils/validations'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Button } from './Button'
import { PasswordTextField, TextField } from './TextField'

interface SingupFrom {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export const RegisterFrom = () => {
  const router = useRouter()
  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingupFrom>()

  const handleSingup = async (data: SingupFrom) => {
    const { name, email, password } = data

    const rest = await regsiterUser(name, email, password)
    if (!rest.ok) {
      toast.error('No se pudo crear el usuario')
      setValue('email', '')
      setValue('password', '')
      setValue('passwordConfirmation', '')
    } else {
      toast.success('Usuario creado correctamente')
      await login(email.toLocaleLowerCase(), password)
      router.replace('/')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSingup)} className='flex flex-col gap-y-4'>
      <TextField
        placeholder='Nombre Completo'
        icon={FaUser}
        error={errors.name?.message}
        {...register('name', {
          required: {
            value: true,
            message: 'Nombre requerido',
          },
          pattern: {
            value: regexps.name,
            message: 'Nombre inválido',
          },
        })}
      />
      <TextField
        placeholder='Correo electónico'
        icon={FaEnvelope}
        autoComplete='new-password'
        error={errors.email?.message}
        {...register('email', {
          required: {
            value: true,
            message: 'Correo requerido',
          },
          pattern: {
            value: regexps.email,
            message: 'correo inválido',
          },
        })}
      />
      <PasswordTextField
        className='w-full'
        placeholder='Nueva contraseña'
        autoComplete='new-password'
        error={errors.password?.message}
        {...register('password', {
          required: 'Contraseña requerida',
          setValueAs: (v: string) => v.trim(),
          pattern: {
            value: regexps.password,
            message: 'Debe contener más de 8 caracteres',
          },
        })}
      />
      <PasswordTextField
        className='w-full'
        placeholder='Validar contraseña'
        autoComplete='new-password'
        error={errors.passwordConfirmation?.message}
        {...register('passwordConfirmation', {
          required: 'Confirmación de la contraseña requerida',
          setValueAs: (v: string) => v.trim(),
          pattern: {
            value: regexps.password,
            message: 'Debe contener más de 8 caracteres',
          },
          validate: v => v === getValues('password') || 'Las contraseñas no coinciden',
        })}
      />

      <Button type='submit' className='btn-primary w-full' loading={false} disabled={false}>
        Confirmar
      </Button>
      <Link href={'/auth/login'}>
        <p className='text-xs text-center hover:text-purple-700 hover:underline mt-2'>
          Ya tengo una cuenta
        </p>
      </Link>
    </form>
  )
}
