'use client'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

type PhonetextFieldProps = {
  value: any
  onChange(event: any): void
  errors?: string
  required?: boolean
  label: string
  placeholder: string
  defaultCountry: 'CU' | 'US'
}

export const PhoneTextField = ({
  value,
  onChange,
  errors,
  required,
  label,
  placeholder,
  defaultCountry,
}: PhonetextFieldProps) => {
  return (
    <div className='flex w-full flex-col items-start'>
      <label className='label label-text' htmlFor='phone'>
        {label}
        {required && <span className='text-red-500 ml-1 '>*</span>}
      </label>
      <PhoneInput
        placeholder={placeholder}
        numberInputProps={{
          className:
            '!w-full !bg-white !h-10 !border-2 !border-gray-200 focus:!outline-none  bg-transparent font-regular focus:!ring-0',
          id: 'phone',
        }}
        className='w-full'
        defaultCountry={defaultCountry}
        value={value}
        onChange={onChange}
      />
      {errors && <p className='mt-1 text-red-500'>{errors}</p>}
    </div>
  )
}
