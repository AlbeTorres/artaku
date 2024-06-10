import Link from 'next/link'

interface Props {
  icon: React.ComponentType<{ size?: number }>
  title: string
  href: string
}

export const MenuItem = ({ icon: Icon, title, href }: Props) => {
  return (
    <Link
      href={href}
      className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
    >
      <Icon size={30} />
      <span className='ml-3 text-xl'>{title}</span>
    </Link>
  )
}
