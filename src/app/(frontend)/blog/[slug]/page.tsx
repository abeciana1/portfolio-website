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
import { format } from 'date-fns'
import { Media } from '@/src/payload-types'

type TagProp = {
  label: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

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

  const page: RequiredDataFromCollectionSlug<'blog-pages'> | null = await queryPageBySlug({
    slug,
  }, queryClient)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://alexbeciana.com/blog/${slug}`,
    "headline": page?.title,
    "name": page?.title,
    "description": page?.meta?.description,
    "datePublished": format(new Date(page?.publishedDate || ''), 'yyyy-MM-dd'),
    "author": {
      "@type": "Person",
      "name": "Alex Beciana",
      "@id": "https://alexbeciana.com/about",
      "url": "https://alexbeciana.com/about",
      "image": {
        "@type": "ImageObject",
        "@id": "https://ab-ph-us-west.s3.us-west-1.amazonaws.com/images/profile-image.png",
        "url": "https://ab-ph-us-west.s3.us-west-1.amazonaws.com/images/profile-image.png",
        "width": 397,
        "height": 400
      }
    },
    "image": {
      "@type": "ImageObject",
      "@id": (page?.meta?.image as Media)?.url,
      "url": (page?.meta?.image as Media)?.url,
      "width": 1084,
      "height": 445
    },
    "url": `https://alexbeciana.com/blog/${slug}`,
    "isPartOf": {
      "@type": "Blog",
      "@id": "https://alexbeciana.com/blog",
      "name": "Alex Beciana Blog",
    },
    "keywords": (page?.tags as TagProp[])?.map((tag: TagProp) => tag?.label)
  }

  if (!page) {
    return notFound()
  }

  const { layout } = page

  return (
    <>
      <main className='relative'>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <RenderBlogBlocks blocks={layout} />
      </main>
    </>
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