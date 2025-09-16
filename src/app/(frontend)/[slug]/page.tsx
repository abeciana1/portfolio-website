import {
  type RequiredDataFromCollectionSlug
} from 'payload'
import { cache } from 'react'
import RenderBlocks from '@/src/blocks/RenderBlocks'
import { notFound } from 'next/navigation';
import { generateMeta } from '@/utils/generateMeta'
import { QueryClient } from '@tanstack/react-query'
import { payload } from '@/src/payload'

type RouteParams = { slug: string }
type PageProps = { params: RouteParams }

const Page = async ({ params }: PageProps) => {
  const { slug = 'home' } = params
  const queryClient = new QueryClient()

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug: slug as string
  }, queryClient)

  if (!page) {
    return notFound()
  }

  const { layout } = page

  return (
    <main className='relative'>
      <RenderBlocks blocks={layout} />
    </main>
  )
}

const queryPageBySlug = cache(async ({ slug = 'home' }: { slug: string }, queryClient: QueryClient) => {
  const result = await queryClient.ensureQueryData({
    queryKey: ['page'],
    queryFn: () => 
      payload.find({
        collection: 'pages',
        limit: 1,
        pagination: false,
        where: {
          slug: {
            equals: slug,
          }
        },
      }),
      staleTime: process.env.NODE_ENV === 'production' ? 60 * 1000 : 10 * 1000
  })
  return result?.docs?.[0] || null
})

export async function generateMetadata({ params }: PageProps) {
  const { slug = 'home' } = params
  const queryClient = new QueryClient()
  const page = await queryPageBySlug({
    slug: slug as string
  }, queryClient)

  return generateMeta({ doc: page })
}

export default Page