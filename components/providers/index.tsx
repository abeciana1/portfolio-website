'use client'
import { ThemeProvider } from 'next-themes'
import { WrapperI } from '@/definitions/interfaces/general'

const CombinedProviders: React.FC<WrapperI> = ({
  children
}) => {
  return (
    <>
      <ThemeProvider>
          {children}
      </ThemeProvider>
    </>
  )
}

export default CombinedProviders