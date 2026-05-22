import type { Metadata } from 'next'
import {
  type RequiredDataFromCollectionSlug
} from 'payload'
import { cache } from 'react'
import RenderBlocks from '@/src/blocks/RenderBlocks'
import { notFound } from 'next/navigation';
import { generateMeta } from '@/utils/generateMeta'
import { payload } from '@/src/payload'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

const Page = async ({ params: paramsPromise }: Args) => {
  const { slug = 'home' } = await paramsPromise
  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug(slug)

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

const queryPageBySlug = cache(async (slug = 'home') => {
  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result?.docs?.[0] || null
})

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug(slug)

  return generateMeta({ doc: page })
}

export default Page
