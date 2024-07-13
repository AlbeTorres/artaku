import { UseFormRegister } from 'react-hook-form'

// Para un array de strings
// <Select
//   items={['opcion1', 'opcion2', 'opcion3']}
//   getOptionLabel={(item) => item}
//   getOptionValue={(item) => item}
//   // ... otras props
// />

// Para un array de objetos con id y name
// <Select
//   items={[{ id: '1', name: 'Opción 1' }, { id: '2', name: 'Opción 2' }]}
//   getOptionLabel={(item) => item.name}
//   getOptionValue={(item) => item.id}
//   // ... otras props
// />

// Para un array de objetos con cualquier estructura
// <Select
//   items={[{ key: 'a', value: 'Valor A' }, { key: 'b', value: 'Valor B' }]}
//   getOptionLabel={(item) => item.value}
//   getOptionValue={(item) => item.key}
//   // ... otras props
// />

type SelectProps<T extends string | object> = JSX.IntrinsicElements['select'] & {
  placeholder?: string
  items: T[]
  label?: string
  error?: string
  disabled?: boolean
  register: UseFormRegister<any>
  name: string
  required?: boolean
  getOptionLabel: (item: T) => string
  getOptionValue: (item: T) => string
}

export const Select = <T extends string | object>({
  placeholder,
  items,
  label,
  error,
  disabled,
  required,
  register,
  name,
  getOptionLabel,
  getOptionValue,
  ...props
}: SelectProps<T>) => {
  return (
    <div>
      <label className='block'>
        <span className=''>
          {label} {required && <span className='text-red-500 '>*</span>}
        </span>
      </label>
      <select
        {...register(name, {
          required: {
            value: required ? true : false,
            message: `${label} requerido`,
          },
        })}
        className='h-10 select-bordered w-full px-2'
        disabled={disabled}
        {...props}
      >
        {placeholder && (
          <option value='' disabled selected hidden>
            {placeholder}
          </option>
        )}
        {items.map((i, index) => (
          <option value={getOptionValue(i)} key={index}>
            {getOptionLabel(i)}
          </option>
        ))}
      </select>
      <p className='mt-1 text-base text-red-500'>{error}</p>
    </div>
  )
}
