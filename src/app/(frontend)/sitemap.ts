/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MetadataRoute } from 'next'
import { payload } from '@/src/payload'
import { CollectionSlug } from 'payload'
import { getServerSideURL } from '@/utils/getURL'

type ResultSitemap = {
  url: string;
  lastModified: Date;
  images: string[];
}

const pageCollection = [
  'pages',
  'project-pages',
  'blog-pages'
] as const

type PageCollection = (typeof pageCollection)[number]

const collectionMapper: Record<PageCollection, string> = {
  'pages': '',
  'project-pages': 'projects',
  'blog-pages': 'blog'
}

const payloadFetcher = async (collectionSlug: CollectionSlug) => {
  const pages = await payload.find({
    collection: collectionSlug,
    depth: 1,
    limit: 0,
    pagination: false,
    select: {
      slug: true,
      updatedAt: true,
      meta: {
        image: true,
      },
    },
  })

  return pages
}

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const url: string = getServerSideURL()
  const pageResults = await Promise.all(
    pageCollection.map(async (collection) => ({
      collection,
      pages: await payloadFetcher(collection),
    }))
  )

  return pageResults.flatMap(({ collection, pages }) =>
    (pages?.docs as any[]).map((page) => ({
      url: `${url}/${collection === 'pages' ? '' : collectionMapper[collection] + '/'}${page.slug === 'home' ? '' : page.slug}`,
      lastModified: new Date(page.updatedAt),
      images: [page?.meta?.image?.url || 'https://ab-ph-us-west.s3.us-west-1.amazonaws.com/images/profile-image.png']
    }) satisfies ResultSitemap)
  )
}

export default Sitemap
