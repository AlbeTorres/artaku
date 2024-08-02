export const revalidate = 604800
import { getProductbySlug } from '@/actions'
import { AddToCart, SlideShow } from '@/components'
import { titleFont } from '@/config/fonts'
import { parseProduct } from '@/utils/product.parse'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  //read route params
  const slug = params.slug

  //fetch data
  const response = await getProductbySlug(slug)

  const product = parseProduct(response!.product)

  //optionally access and extend (rater than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title || 'Título no encontrado',
    description: product?.description || 'Descripción no encontrada',
    openGraph: {
      title: product?.title || 'Título no encontrado',
      description: product?.description || 'Descripción no encontrada',
      images: product?.images[1]?.url
        ? [`/products/${product?.images[1].url}`]
        : ['/images/zombi-sama.png'],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const response = await getProductbySlug(params.slug)

  if (!response?.ok) {
    notFound()
  }

  const product = parseProduct(response.product)

  const { title, price, description, images } = product

  const productImages = images.map(i => i.url)

  return (
    <div className='mt-5 mb-20 grid md:grid-cols-3'>
      {/* slideshow */}
      <div className='md:col-span-2'>
        <SlideShow className='!h-[500px] md:!h-[600px]' images={productImages} />
      </div>

      {/* detalles */}
      <div className='px-5 pt-8 md:pt-0'>
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{title}</h1>
        <p className='text-lg mb-5'>${price}</p>

        <AddToCart product={product} />

        <h3 className='font-bold text-sm'>Descripción</h3>
        <p className='font-light'>{description}</p>
      </div>
    </div>
  )
}
