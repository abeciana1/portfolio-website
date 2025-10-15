import type { Metadata } from 'next'

import type { Media, Page, Config, ProjectPage, BlogPage } from '@/src/payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    url = image?.url as string
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<ProjectPage> | Partial<BlogPage>
}): Promise<Metadata> => {
  const { doc } = args || {}

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc?.meta?.title
    : 'Payload Website Template'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
              width: (doc?.meta?.image as Media)?.width as number,
              height: (doc?.meta?.image as Media)?.height as number,
              alt: doc?.meta?.title as string
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}