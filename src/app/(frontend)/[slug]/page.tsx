import type { Metadata } from 'next'
import {
  getPayload,
  type RequiredDataFromCollectionSlug
} from 'payload'
import { cache } from 'react'
import RenderBlocks from '@/src/blocks/RenderBlocks'
import { notFound } from 'next/navigation';
import buildConfig from '@/src/payload.config'
import { generateMeta } from '@/utils/generateMeta'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

const Page = async ({ params: paramsPromise }: Args) => {
  const { slug = 'home' } = await paramsPromise

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return notFound()
  }

  const { layout } = page

  return (
    <main>
      <RenderBlocks blocks={layout} />
    </main>
  )
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: buildConfig })

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

  return result.docs?.[0] || null
})

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

export default Page