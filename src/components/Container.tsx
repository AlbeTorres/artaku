import { ReactNode } from 'react'

export const Container = ({ children }: { children: ReactNode }) => {
  return <div className='w-11/12 mx-auto'>{children}</div>
}
