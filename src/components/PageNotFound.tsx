import { titleFont } from '@/config/fonts'
import Image from 'next/image'
import Link from 'next/link'

export const PageNotFound = () => {
  return (
    <div className='flex flex-col md:flex-row  h-[800px] w-full justify-center items-center align-middle'>
      <div className='flex flex-col gap-y-2 items-center md:items-start'>
        <h2 className={`${titleFont.className} antialiased text-9xl`}>404</h2>
        <p className='font-semibold text-xl'>Whoops! Lo sentimos mucho</p>

        <Link
          className='px-2 md:w-fit py-1 bg-purple-700 text-white  hover:bg-purple-900 transition-all rounded-md'
          href={'/'}
        >
          {' '}
          Regresar
        </Link>
      </div>
      <div className='px-5 mx-5'>
        <Image
          src={'/imgs/zombi-sama.png'}
          width={550}
          height={550}
          alt='zombi-sama'
          className='p-5 sm:p-0'
        />
      </div>
    </div>
  )
}
