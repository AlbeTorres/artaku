'use client'
import { Product } from '@/interfaces'
import Link from 'next/link'
import { useState } from 'react'
import { CustomImage } from './CustomImage'

interface Props {
  product: Product
}

export const ProductItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]?.url)
  return (
    <div className='rounded-md overflow-hidden fade-in'>
      <Link href={`/product/${product.slug}`}>
        <CustomImage
          src={displayImage}
          alt={product.title}
          className='w-full  aspect-square object-cover rounded'
          width={500}
          height={500}
          onMouseEnter={() => setDisplayImage(product.images[1].url)}
          onMouseLeave={() => setDisplayImage(product.images[0].url)}
          priority={false}
        />
      </Link>
      <div className='p-4 flex flex-col'>
        <Link className='hover:text-purple-700' href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <span className='font-bold'>${product.price}</span>
      </div>
    </div>
  )
}
