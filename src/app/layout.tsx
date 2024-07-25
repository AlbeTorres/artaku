import type { Metadata } from 'next'

import { inter } from '@/config/fonts'
import { Providers } from '@/providers'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Artaku',
    default: 'Home - Artaku',
  },
  description: 'Una tienda otaku',
  openGraph: {
    title: {
      template: '%s - Artaku',
      default: 'Home - Artaku',
    },
    description: 'Una tienda otaku',
    images: [`/img/zombi-sama.png`],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Toaster position='bottom-right' />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
