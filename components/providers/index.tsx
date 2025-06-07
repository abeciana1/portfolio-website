'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WrapperI } from '@/types/general'
import { PostHogProvider } from './posthog'

const queryClient = new QueryClient();

const CombinedProviders: React.FC<WrapperI> = ({
  children
}) => {
  return (
    <>
      <PostHogProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </PostHogProvider>
    </>
  )
}

export default CombinedProviders