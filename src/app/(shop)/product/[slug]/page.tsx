export const revalidate = 604800
import { getProductbySlug } from '@/actions'
import { QuantitySelector, SizeSelector, SlideShow } from '@/components'
import { titleFont } from '@/config/fonts'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductbySlug(params.slug)

  if (!product) {
    notFound()
  }

  const { title, price, description, sizes, images } = product

  return (
    <div className='mt-5 mb-20 grid md:grid-cols-3'>
      {/* slideshow */}
      <div className='md:col-span-2'>
        <SlideShow className='!h-[500px] md:!h-[600px]' images={images} />
      </div>

      {/* detalles */}
      <div className='px-5 pt-8 md:pt-0'>
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{title}</h1>
        <p className='text-lg mb-5'>{price}</p>

        {/* selector de tallas */}
        <SizeSelector availableSize={sizes} selectedSize={sizes[0]} />
        {/* selector de cantidad */}
        <QuantitySelector quantity={1} />

        <button className='btn-primary my-5'>Agregar al carrito</button>

        <h3 className='font-bold text-sm'>Descripción</h3>
        <p className='font-light'>{description}</p>
      </div>
    </div>
  )
}
