import React from 'react'
import './styles.css'
import { Inter } from 'next/font/google'
import CombinedProviders from '@/components/providers'
import NavBar from '@/components/_navigation/NavBar'
import Toolbar from '@/components/_navigation/Toolbar'
import { cookies } from 'next/headers';

export const revalidate = 3600 

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
  const theme = cookieStore?.get('theme')?.value || 'light';
  const { children } = props
  return (
    <html lang="en" className={theme} data-theme={theme}>
      <body className={`relative antialiased ${inter.className} bg-background text-foreground dark:bg-foreground dark:text-background max-w-[1440px] mx-auto`}>
        <CombinedProviders>
          <NavBar/>
          {children}
          <Toolbar/>
        </CombinedProviders>
      </body>
    </html>
  )
}
