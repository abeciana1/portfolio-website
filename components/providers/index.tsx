'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WrapperI } from '@/types/general'

const queryClient = new QueryClient();

const CombinedProviders: React.FC<WrapperI> = ({
  children
}) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </>
  )
}

export default CombinedProviders