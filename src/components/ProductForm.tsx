'use client'

import { CreateProduct, deleteProductImage, UpdateProduct } from '@/actions'
import { Gender, Product, Size } from '@/interfaces'
import { regexps } from '@/utils/validations'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaUser } from 'react-icons/fa'
import { Button } from './Button'
import { CustomImage } from './CustomImage'
import { Select } from './Select'
import { TextField } from './TextField'

interface Props {
  product: Partial<Product>
  categories: { id: string; name: string }[]
}

const sizes: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const gender = ['men', 'women', 'kid', 'unisex']

interface ProductForm {
  title: string
  slug: string
  description: string
  price: number
  tags: string
  sizes: Size[]
  gender: Gender
  inStock: number
  categoryId: string
  images?: FileList
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter()

  const {
    setValue,
    getValues,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>({
    defaultValues: { ...product, tags: product.tags?.join(', '), images: undefined },
  })

  watch('sizes')
  watch('images')

  const onSizeChanged = (size: Size) => {
    const sizes = new Set(getValues('sizes'))
    sizes.has(size) ? sizes.delete(size) : sizes.add(size)
    setValue('sizes', Array.from(sizes))
  }

  const onSubmit = async (data: ProductForm) => {
    const { images, ...productToSave } = data

    const formData = new FormData()
    formData.append('id', product.id ?? '')
    formData.append('title', productToSave.title)
    formData.append('slug', productToSave.slug)
    formData.append('description', productToSave.description)
    formData.append('price', productToSave.price.toString())
    formData.append('inStock', productToSave.inStock.toString())
    formData.append('sizes', productToSave.sizes.toString())
    formData.append('tags', productToSave.tags)
    formData.append('categoryId', productToSave.categoryId)
    formData.append('gender', productToSave.gender)

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i])
      }
    }

    let response
    if (product.id) {
      response = await UpdateProduct(formData)
    } else {
      response = await CreateProduct(formData)
    }

    if (!response.ok) {
      toast.error('ups, algo salió mal intentelo de nuevo')
      return
    }

    toast.success('Operación exitosa')
    router.replace('/admin/products')
  }

  const removeImage = (index: number) => {
    const currentImages = getValues('images')
    if (currentImages) {
      const dt = new DataTransfer()
      Array.from(currentImages)
        .filter((_, i) => i !== index)
        .forEach(file => dt.items.add(file))

      setValue('images', dt.files)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid px-5 mb-16 grid-cols-1 sm:px-0 md:grid-cols-2 gap-4'
    >
      {/* Textos */}
      <div className='w-full space-y-4 lg:px-20'>
        <TextField
          required
          label='Titulo'
          placeholder='T-shirt otaku'
          icon={FaUser}
          error={errors.title?.message}
          {...register('title', {
            required: {
              value: true,
              message: 'Titulo requerido',
            },
          })}
        />
        <TextField
          required
          label='Slug'
          placeholder='t-shirt-otaku'
          icon={FaUser}
          error={errors.slug?.message}
          {...register('slug', {
            required: {
              value: true,
              message: 'Slug requerido',
            },
          })}
        />

        <div className='flex flex-col mb-2'>
          <span>Descripción</span>
          <textarea
            {...register('description')}
            rows={5}
            className='p-2 border rounded-md '
          ></textarea>
        </div>

        <TextField
          type='number'
          required
          label='price'
          placeholder='0.00'
          icon={FaUser}
          error={errors.price?.message}
          {...register('price', {
            min: 0,
            required: {
              value: true,
              message: 'Precio requerido',
            },
            pattern: {
              value: regexps.precio,
              message: 'Precio inválido',
            },
          })}
        />

        <TextField
          type='string'
          required
          label='tags'
          placeholder=''
          icon={FaUser}
          error={errors.tags?.message}
          {...register('tags', {
            required: {
              value: true,
              message: 'Etiquetas requeridas',
            },
          })}
        />

        <Select
          required
          error={errors.gender?.message}
          items={gender}
          label='Gender'
          register={register}
          name='gender'
          getOptionLabel={item => item}
          getOptionValue={item => item}
        />
        <Select
          required
          error={errors.categoryId?.message}
          items={categories}
          label='Category'
          register={register}
          name='categoryId'
          getOptionLabel={item => item.name}
          getOptionValue={item => item.id}
        />

        <button className='btn-primary w-full'>Guardar</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className='w-full lg:px-20'>
        {/* As checkboxes */}
        <div className='flex flex-col'>
          <span>Tallas</span>
          <div className='flex flex-wrap'>
            {sizes.map(size => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                onClick={() => onSizeChanged(size)}
                className={clsx(
                  'flex cursor-pointer items-center justify-center w-10 h-10 mr-2 border rounded-md',
                  { 'bg-purple-700 text-white': getValues('sizes').includes(size) }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>
          {errors.sizes && <p className='text-red-500'>{errors.sizes.message}</p>}
          <input
            type='hidden'
            {...register('sizes', {
              validate: value => value.length > 0 || 'Debe seleccionar al menos una talla',
            })}
          />

          <div className='flex flex-col mb-2'>
            <span>Fotos</span>
            <input
              {...register('images')}
              type='file'
              multiple
              className='p-2 border rounded-md bg-gray-200'
              accept='image/png, image/jpeg, image/avif'
            />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            {product.images &&
              product.images?.map(image => (
                <div key={image.id}>
                  <CustomImage
                    src={image.url}
                    width={300}
                    height={300}
                    alt={product.title ?? ''}
                    className='rounded-t shadow-md w-full'
                  />
                  <Button
                    onClick={() => deleteProductImage(image.id, image.url)}
                    className='bg-red-500 rounded-b-md hover:bg-red-700 transition-all duration-300  flex w-full justify-center '
                  >
                    Eliminar
                  </Button>
                </div>
              ))}
            {getValues('images')
              ? Array.from(getValues('images')!).map((file, index) => (
                  <div key={index}>
                    <CustomImage
                      src={URL.createObjectURL(file)}
                      width={300}
                      height={300}
                      alt={product.title ?? ''}
                      className='rounded-t shadow-md w-full'
                    />
                    <Button
                      onClick={() => removeImage(index)}
                      className='bg-red-500 rounded-b-md hover:bg-red-700 transition-all duration-300  flex w-full justify-center '
                    >
                      Eliminar
                    </Button>
                  </div>
                ))
              : undefined}
          </div>
        </div>
      </div>
    </form>
  )
}
