import type { Metadata } from 'next'
import {
  type RequiredDataFromCollectionSlug
} from 'payload'
import { cache } from 'react'
import RenderProjectBlocks from '@/src/blocks/RenderProjectBlocks'
import { notFound } from 'next/navigation';
import { generateMeta } from '@/utils/generateMeta'
import { QueryClient } from '@tanstack/react-query'
import { payload } from '@/src/payload'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

let cachedParams: any;

const Page = async ({ params: paramsPromise }: Args) => {
  if (!cachedParams) {
    cachedParams = await paramsPromise;
  }
  const { slug = 'home' } = cachedParams
  const queryClient = new QueryClient()

  console.log('Received slug:', slug);


  const page: RequiredDataFromCollectionSlug<'blog-pages'> | null = await queryPageBySlug({
    slug,
  }, queryClient)

  if (!page) {
    return notFound()
  }

  const { layout } = page

  return (
    <main className='relative'>
      <RenderProjectBlocks blocks={layout} />
    </main>
  )
}

const queryPageBySlug = cache(async ({ slug = 'home' }: { slug: string }, queryClient: QueryClient) => {
  const result = await queryClient?.ensureQueryData({
    queryKey: ['page'],
    queryFn: () => 
      payload.find({
        collection: 'blog-pages',
        limit: 1,
        pagination: false,
        where: {
          slug: {
            equals: Array.isArray(slug) ? slug[0] : slug,
          },
        },
      }),
      staleTime: process.env.NODE_ENV === 'production' ? 60 * 1000 : 10 * 1000
  })
  return result?.docs?.[0] || null
})

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const queryClient = new QueryClient()
  const page = await queryPageBySlug({
    slug,
  }, queryClient)

  return generateMeta({ doc: page })
}

export default Page