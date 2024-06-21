import Link from 'next/link'

interface Props {
  icon: React.ComponentType<{ size?: number }>
  title: string
  href: string
}

export const MenuItem = ({ icon: Icon, title, href }: Props) => {
  return (
    <Link href={href} className='flex items-center p-2 hover:bg-gray-100 rounded transition-all'>
      <Icon size={25} />
      <span className='ml-3 text-md'>{title}</span>
    </Link>
  )
}
