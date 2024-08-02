import Image from 'next/image'

type Props = JSX.IntrinsicElements['img'] & {
  src?: string
  width: number
  height: number
  alt: string
  priority?: boolean
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className']
}

export const CustomImage = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  ...props
}: Props) => {
  let localsrc: string
  if (!src) {
    localsrc = '/imgs/placeholder.jpg'
  } else if (src?.startsWith('http') || src.startsWith('blob')) {
    localsrc = src
  } else {
    localsrc = `/products/${src}`
  }

  return (
    <Image
      src={localsrc}
      width={width}
      height={height}
      alt={alt}
      className={className}
      priority={priority}
      {...props}
    />
  )
}
