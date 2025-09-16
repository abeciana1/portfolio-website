import type { Metadata } from 'next'
import {
  type RequiredDataFromCollectionSlug
} from 'payload'
import { cache } from 'react'
import RenderBlogBlocks from '@/src/blocks/RenderBlogBlocks'
import { notFound } from 'next/navigation';
import { generateMeta } from '@/utils/generateMeta'
import { QueryClient } from '@tanstack/react-query'
import { payload } from '@/src/payload'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

const Page = async ({ params }: Args) => {
  const { slug = 'home' } = await params
  const queryClient = new QueryClient()

  const page: RequiredDataFromCollectionSlug<'blog-pages'> | null = await queryPageBySlug({
    slug,
  }, queryClient)

  if (!page) {
    return notFound()
  }

  const { layout } = page

  return (
    <main className='relative'>
      <RenderBlogBlocks blocks={layout} />
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