'use client'
import { useAddressStore } from '@/store/address/address-store'
import { regexps } from '@/utils/validations'
import { Country } from '@prisma/client'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FaUser } from 'react-icons/fa'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { Button } from './Button'
import { CheckBox } from './Checkbox'
import { Select } from './Select'
import { PhoneTextField, TextField } from './TextField'

interface Props {
  countries: Country[]
}

interface AddressForm {
  firstName: string
  lastName: string
  address: string
  address2?: string
  zipcode: number
  city: string
  country: string
  phone: string
  rememberaddress: boolean
}

export const AddressForm = ({ countries }: Props) => {
  const setAddress = useAddressStore(state => state.setAddress)
  const address = useAddressStore(state => state.address)
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressForm>({
    defaultValues: {},
  })

  useEffect(() => {
    console.log(address)
    if (address.firstName) {
      reset(address)
    }
  }, [address]) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (data: AddressForm) => {
    setAddress(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2'
    >
      <TextField
        required
        label='Nombre'
        placeholder='Jhon '
        icon={FaUser}
        error={errors.firstName?.message}
        {...register('firstName', {
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
        error={errors.lastName?.message}
        {...register('lastName', {
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
        error={errors.address?.message}
        {...register('address', {
          required: {
            value: true,
            message: 'Dirección requerida',
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
        error={errors.address2?.message}
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
        error={errors.zipcode?.message}
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
        error={errors.city?.message}
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
        required
        error={errors.country?.message}
        items={countries}
        label='País'
        register={register}
        name='country'
        getOptionLabel={item => item.name}
        getOptionValue={item => item.id}
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
        <CheckBox
          name='rememberaddress'
          register={register}
          color='purple'
          className=''
          labelText='¿Recordar dirección?'
        />
        <Button type='submit' className='btn-primary flex w-full sm:w-1/2 justify-center '>
          Siguiente
        </Button>
      </div>
    </form>
  )
}
