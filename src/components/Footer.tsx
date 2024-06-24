import { titleFont } from '@/config/fonts'
import Link from 'next/link'

export const Footer = () => {
  return (
    <div className='flex flex-col w-full justify-center items-center gap-y-2 text-xs pb-4'>
      <div className='flex flex-col gap-2 md:flex-row items-center'>
        <Link href={'/'} className='hover:text-purple-700 hover:underline'>
          Políticas de privacidad
        </Link>
        <Link href={'/'} className='hover:text-purple-700 hover:underline'>
          Terminos y condiciones de uso
        </Link>
      </div>
      <Link href={'/'}>
        <span className={`${titleFont.className} antialiased font-bold`}>Artaku</span>
        <span> | {new Date().getFullYear()}</span>
      </Link>
    </div>
  )
}
