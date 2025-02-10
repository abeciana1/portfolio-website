import React from 'react'
import './styles.css'
import { Inter } from 'next/font/google'

const inter = Inter({
  weight: ['100', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic']
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={`antialiased ${inter.className}`}>
        <main>{children}</main>
      </body>
    </html>
  )
}
