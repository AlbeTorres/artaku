'use client'
import clsx from 'clsx'
import { useRef, useState } from 'react'
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io'
import { RxDotFilled } from 'react-icons/rx'

interface Props {
  images: string[]
  className?: string
}

export const SlideShow = ({ images, className }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide()
    }

    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide()
    }
  }

  return (
    <div className={clsx('w-full relative max-w-[726px] mx-auto md:py-16 md:px-4 ')}>
      <div
        className='relative group'
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{ backgroundImage: `url(/products/${images[currentIndex]})` }}
          className={clsx(
            'w-full h-full rounded-md bg-center bg-cover duration-500',
            `${className}`
          )}
        ></div>
        {/* Left Arrow */}
        <div className='hidden md:group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <IoMdArrowDropleft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className='hidden md:group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <IoMdArrowDropright onClick={nextSlide} size={30} />
        </div>
      </div>
      <div className='flex justify-center w-full md:justify-start py-2 gap-2 absolute bottom-2 md:static'>
        {images.map((slide, slideIndex) => (
          <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className=' cursor-pointer'>
            <img // eslint-disable-line @next/next/no-img-element
              alt='product image'
              src={`/products/${slide}`}
              className='hidden md:block rounded-md w-40 h-40 hover:scale-105 transition-all duration-500 '
            />

            <RxDotFilled
              className={clsx('text-3xl md:hidden ', {
                'text-purple-700': currentIndex === slideIndex,
              })}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
