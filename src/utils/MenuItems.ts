import {
  IoLogInOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5'

export const options = [
  {
    icon: IoPersonOutline,
    title: 'Perfil',
    href: '/profile',
  },
  {
    icon: IoTicketOutline,
    title: 'Órdenes',
    href: '/orders',
  },
  {
    icon: IoLogInOutline,
    title: 'Ingresar',
    href: '/auth/login',
  },
]

export const admin_options = [
  {
    icon: IoShirtOutline,
    title: 'Productos',
    href: '/admin/products',
  },
  {
    icon: IoTicketOutline,
    title: 'Órdenes',
    href: '/admin/orders',
  },
  {
    icon: IoPeopleOutline,
    title: 'Usuarios',
    href: '/admin/users',
  },
]
