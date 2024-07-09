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
    href: '/',
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
    href: '/',
  },
  {
    icon: IoTicketOutline,
    title: 'Órdenes',
    href: '/',
  },
  {
    icon: IoPeopleOutline,
    title: 'Usuarios',
    href: '/',
  },
]
