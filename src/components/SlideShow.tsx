'use client'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io'

interface Props {
  images: string[]
  className?: string
}

export const SlideShow = ({ images, className }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }

  return (
    <div className={clsx('w-full h-full m-auto py-16 px-4 relative group', `${className}`)}>
      {/* <Image
        alt='product image'
        src={`/products/${images[currentIndex]}`}
        width={500}
        height={500}
        className='w-full h-full rounded-2xl object-cover select-none'
      /> */}
      <div
        style={{ backgroundImage: `url(/products/${images[currentIndex]})` }}
        className='w-full h-full rounded-md bg-center bg-cover duration-500'
      ></div>
      {/* Left Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <IoMdArrowDropleft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <IoMdArrowDropright onClick={nextSlide} size={30} />
      </div>
      <div className='flex top-4 py-2 gap-2'>
        {images.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer'
          >
            <Image
              alt='product image'
              src={`/products/${slide}`}
              width={150}
              height={150}
              className='w-full'
            />
          </div>
        ))}
      </div>
    </div>
  )
}
