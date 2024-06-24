import { forwardRef, ForwardedRef } from 'react'

import BaseTextField, { BaseTextFieldProps } from './BaseTextField'

export type TextFieldProps = Omit<BaseTextFieldProps, 'password'>

const TextField = (props: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => (
  <BaseTextField password={false} {...props} ref={ref} />
)

export default forwardRef(TextField)
