import React from 'react'
import './styles.css'
import { Inter } from 'next/font/google'
import CombinedProviders from '@/components/providers'
import NavBar from '@/components/_navigation/NavBar'
import { cookies } from 'next/headers';

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
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')
  const { children } = props

  console.log('theme cookie', theme)

  return (
    <html lang="en">
      <body className={`antialiased ${inter.className} bg-background text-foreground dark:bg-background dark:text-foreground max-w-[1440px] mx-auto`}>
        <CombinedProviders>
          <NavBar/>
          {children}
        </CombinedProviders>
      </body>
    </html>
  )
}
