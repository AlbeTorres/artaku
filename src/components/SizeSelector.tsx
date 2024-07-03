import { Size } from '@/interfaces'
import clsx from 'clsx'

interface Props {
  selectedSize?: Size
  availableSize: Size[]
  selectSize: (z: Size) => void
}

export const SizeSelector = ({ selectedSize, availableSize, selectSize }: Props) => {
  return (
    <div className='my-5 relative'>
      <h3 className='font-bold mb-4'>Tallas disponibles</h3>
      <div className='flex'>
        {availableSize.map(z => (
          <button
            onClick={() => selectSize(z)}
            aria-label={`avalible size ${z}`}
            key={z}
            className={clsx('mx-2 hover:underline text-lg', { underline: z === selectedSize })}
          >
            {z}
          </button>
        ))}
      </div>
    </div>
  )
}
