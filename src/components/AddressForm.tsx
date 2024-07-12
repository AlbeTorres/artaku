'use client'
import { regexps } from '@/utils/validations'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { FaUser } from 'react-icons/fa'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { CheckBox } from './Checkbox'
import { Select } from './Select'
import { PhoneTextField, TextField } from './TextField'

interface AddressForm {
  name: string
  lastname: string
  address: string
  address2?: string
  zipcode: number
  city: string
  country: string
  phone: string
}

export const AddressForm = () => {
  const {
    control,
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressForm>()
  return (
    <form className='grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2'>
      <TextField
        required
        label='Nombre'
        placeholder='Jhon '
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
        required
        label='Apellido'
        placeholder='Doe'
        icon={FaUser}
        error={errors.name?.message}
        {...register('lastname', {
          required: {
            value: true,
            message: 'Apellido requerido',
          },
          pattern: {
            value: regexps.name,
            message: 'Apellido inválido',
          },
        })}
      />
      <TextField
        required
        label='Dirección'
        placeholder='1922 Alexander Dr'
        icon={FaUser}
        error={errors.name?.message}
        {...register('address', {
          required: {
            value: true,
            message: 'Dirección requerido',
          },
          pattern: {
            value: regexps.name,
            message: 'Dirección inválida',
          },
        })}
      />
      <TextField
        label='Dirección 2'
        placeholder='1922 Alexander Dr'
        icon={FaUser}
        error={errors.name?.message}
        {...register('address2', {
          pattern: {
            value: regexps.name,
            message: 'Dirección inválida',
          },
        })}
      />
      <TextField
        required
        label='Código postal'
        placeholder='33147'
        icon={FaUser}
        error={errors.name?.message}
        {...register('zipcode', {
          required: {
            value: true,
            message: 'Código postal requerido',
          },
          pattern: {
            value: regexps.name,
            message: 'Código postal inválida',
          },
        })}
      />
      <TextField
        required
        label='Ciudad'
        placeholder='Miami'
        icon={FaUser}
        error={errors.name?.message}
        {...register('city', {
          required: {
            value: true,
            message: 'Ciudad requerido',
          },
          pattern: {
            value: regexps.name,
            message: 'Ciudad inválida',
          },
        })}
      />
      <Select
        error={errors.country?.message}
        items={['EEUU']}
        placeholder='Cuba'
        label='País'
        register={register}
        name='provincia'
      />

      <Controller
        name='phone'
        rules={{
          required: 'Debe introducir un número de teléfono',
          validate: v => isValidPhoneNumber(v) || 'Número de teléfono incorrecto',
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <PhoneTextField
            defaultCountry='US'
            placeholder='(786) 626 5467'
            required
            label='Teléfono'
            value={value}
            onChange={onChange}
            errors={errors.phone?.message}
          />
        )}
      />

      <div className='flex flex-col mb-2 gap-y-4 sm:mt-10'>
        <CheckBox color='purple' className='' labelText='¿Recordar dirección?' />
        <Link href='/checkout' className='btn-primary flex w-full sm:w-1/2 justify-center '>
          Siguiente
        </Link>
      </div>
    </form>
  )
}
