'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes'
import { WrapperI } from '@/definitions/interfaces/general'

const queryClient = new QueryClient();

const CombinedProviders: React.FC<WrapperI> = ({
  children
}) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default CombinedProviders