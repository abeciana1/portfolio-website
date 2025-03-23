import { CMSMediaT } from '@/types/general'
import { type ImageBlock, type Media } from '@/src/payload-types'
import { type ImageBlockProps } from '@/types/blockTypes'

export function transformBlockMedia<T>(block: T): T {
  if (
    block &&
    typeof block === 'object' &&
    'media' in block &&
    Array.isArray((block as any).media)
  ) {
    return {
      ...block,
      media: (block as any).media.map((item: unknown) =>
        transformImageBlock(item as any)
      ),
    }
  }
  return block
}
export const transformImageBlock = (block: ImageBlock): ImageBlockProps => ({
  image: transformImage(block.image),
  gradient: block.gradient ?? undefined,
  gradientXFlip: block.gradientXFlip ?? undefined,
  gradientYFlip: block.gradientYFlip ?? undefined,
  gradientSelect: block.gradientSelect ?? undefined,
})

export const transformImage = (img: number | Media): CMSMediaT => {
  if (typeof img === 'number') {
    return {
      id: img,
      alt: 'Default alt text',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      webpUrl: '', // Provide a default or placeholder URL if needed
      width: 0,
      height: 0,
    }
  }
  return {
    ...img,
    webpUrl: img.url || '', // Use img.url as webpUrl if not already provided
  }
}
