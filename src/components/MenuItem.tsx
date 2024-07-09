import clsx from 'clsx'
import Link from 'next/link'

interface Props {
  icon: React.ComponentType<{ size?: number }>
  title: string
  href: string
  close?(): void
  hide?: boolean
}

export const MenuItem = ({ icon: Icon, title, href, close, hide }: Props) => {
  return (
    <Link
      onClick={close}
      href={href}
      className={clsx('flex items-center p-2 hover:bg-gray-100 rounded transition-all', {
        hidden: hide,
      })}
    >
      <Icon size={25} />
      <span className='ml-3 text-md'>{title}</span>
    </Link>
  )
}
