import type { Metadata } from 'next'
import { titleToSlug } from '@/utils/helpers'
import type { Media,  Config,  } from '@/src/payload-types'
import { nestedRouteHash } from '@/src/payload.config'
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

type PagePartial = {
  title: string;
  slug: string;
  nestedRoute: string;
  meta: {
    title?: string | null;
    description?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
  }
}

export const generateMeta = async (args: {
  doc: PagePartial
}): Promise<Metadata> => {
  const { doc } = args || {}

  const ogImage = getImageURL(doc.meta.image as Media)

  const title = doc?.meta?.title
    ? doc?.meta?.title
    : 'Payload Website Template'

  const routing = doc.nestedRoute === 'base' ? '/' : `/${nestedRouteHash[doc?.nestedRoute]}/`
  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: (doc.meta.image as Media).url as string,
              width: (doc.meta.image as Media)?.width as number,
              height: (doc.meta.image as Media)?.height as number,
              alt: doc.meta.title as string
            },
          ]
        : undefined,
      title,
      url: `https://alexbeciana.com${routing}${doc.title === 'Home' ? '' : titleToSlug(doc?.title)}`
    }),
    title,
    alternates: {
      canonical: `https://alexbeciana.com${routing}${doc.title === 'Home' ? '' : titleToSlug(doc?.title)}`,
    }
  }
}