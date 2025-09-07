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
]

const collectionMapper: any = {
  'pages': '',
  'project-pages': 'projects',
  'blog-pages': 'blog'
}

const payloadFetcher = async (collectionSlug: CollectionSlug) => {
  const pages = await payload.find({
    collection: collectionSlug,
    limit: 0,
    depth: 2
  })
  return pages
}

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {

  const url: string = getServerSideURL()

  const results: ResultSitemap[] = []

  for (const collection of pageCollection) {
    const pages = await payloadFetcher(collection as CollectionSlug)
    for (const page of pages?.docs as any) {
      results.push({
        url: `${url}/${collection === 'pages' ? '' : collectionMapper[collection] + '/'}${page.slug === 'home' ? '' : page.slug}`,
        lastModified: new Date(page.updatedAt),
        images: [page?.meta?.image?.url || 'https://ab-ph-us-west.s3.us-west-1.amazonaws.com/images/profile-image.png']
      })
    }
  }
  
  return results
}

export default Sitemap