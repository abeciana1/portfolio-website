import React from 'react'
import '@/src/app/(frontend)/styles.css'
import { Inter } from 'next/font/google'
import CombinedProviders from '@/components/providers'
import { cookies } from 'next/headers';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { WebVitals } from '@/components/providers/web-vitals'

const inter = Inter({
  // weight: ['100', '300', '400', '500', '600', '700'],
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
          <section className='lg:px-10 md:px-10 px-5'>
            {children}
          </section>
        </CombinedProviders>
      </body>
      <GoogleAnalytics
        gaId='G-Y7HNS80HJT'
      />
      <GoogleTagManager
        gtmId='GTM-PJCZ4RCZ'
      />
    </html>
  )
}