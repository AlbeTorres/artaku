import type { Metadata } from 'next'

import { NavBar } from '@/components'
import { inter } from '@/config/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Artaku',
  description: 'Una tienda otaku',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
