'use client'
import clsx from 'clsx'
import { UseFormRegister } from 'react-hook-form'

interface Props {
  className?: string
  labelText?: string
  color: 'green' | 'red' | 'purple' | 'gray' | 'yellow' | 'blue' | 'black'
  checked?: boolean
  register: UseFormRegister<any>
  name: string
}
export const CheckBox = ({ register, name, className, labelText, color = 'blue' }: Props) => {
  return (
    <div className='inline-flex items-center'>
      <label className='relative flex cursor-pointer items-center rounded-full p-3'>
        <input
          {...register(name)}
          type='checkbox'
          className={clsx(
            'peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-500 transition-all checked:border-purple-500 checked:bg-purple-500',
            className
          )}
          id='checkbox'
        />
        <div className='pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-3.5 w-3.5'
            viewBox='0 0 20 20'
            fill='currentColor'
            stroke='currentColor'
            strokeWidth='1'
          >
            <path
              fillRule='evenodd'
              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
              clipRule='evenodd'
            ></path>
          </svg>
        </div>
      </label>
      <span>{labelText}</span>
    </div>
  )
}
