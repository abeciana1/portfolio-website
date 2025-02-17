'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WrapperT } from '@/types/general'

const queryClient = new QueryClient();

const CombinedProviders: React.FC<WrapperT> = ({
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