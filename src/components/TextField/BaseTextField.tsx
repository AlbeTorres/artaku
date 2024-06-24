import { cn } from '@/utils'
import { ComponentProps, ComponentType, ForwardedRef, forwardRef } from 'react'

import { IconType } from 'react-icons'

export type BaseTextFieldProps = JSX.IntrinsicElements['input'] & {
  required?: boolean
  label?: string
  labelHelp?: string
  password?: boolean
  error?: string
  icon?: ComponentType<BaseTextFieldProps['iconProps']> | IconType
  iconProps?: ComponentProps<'svg'>
  inputClassName?: string
  inputWrapperClassName?: string
}

const classes = {
  root: 'flex flex-col w-full ',
  label: {
    standard: 'label',
    span: 'label-text',
  },
  inputWrapper: {
    base: 'flex items-center w-full relative border-2 rounded-lg ',
  },
  input: {
    base: 'input !h-10 w-full pr-8 pl-2 !outline-none autofill:!bg-black',
  },
  icon: {
    base: ' absolute right-3 text-primary',
    standard: 'mr-2 absolute z-10 right-0',
  },
}

const BaseTextField = (
  {
    required,
    value,
    label,
    labelHelp,
    name,
    placeholder,
    password,
    error,
    className,
    inputClassName,
    inputWrapperClassName,
    icon: Icon,
    iconProps,
    ...props
  }: BaseTextFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) => (
  <div className={classes.root}>
    <label className={classes.label.standard}>
      <span className={classes.label.span}>
        {label} {required && <span className='text-red-500 '>*</span>}
      </span>
    </label>
    <div
      className={cn(
        classes.inputWrapper['base'],
        inputWrapperClassName ? inputWrapperClassName : ''
      )}
    >
      <input
        type={password ? 'password' : 'text'}
        placeholder={placeholder}
        name={name}
        value={value}
        className={classes.input.base}
        {...props}
        ref={ref}
      />
      {Icon && (
        <Icon
          width={18}
          height={18}
          {...iconProps}
          className={cn(classes.icon['base'], iconProps?.className ? iconProps?.className : '')}
        />
      )}
    </div>
    {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
  </div>
)

export default forwardRef(BaseTextField)
