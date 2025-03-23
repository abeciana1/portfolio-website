import { type Media } from '@/src/payload-types'

/**
 * Your CMS media type – adds the custom webpUrl field
 */
export type CMSMediaT = Media & {
  webpUrl: string
}

/**
 * If you need a type that also guarantees these UI-specific fields, you can define one.
 * (Often CMSMediaT is enough if you always add webpUrl, and your CMS already provides alt, width, etc.)
 */
export type ImageT = CMSMediaT & {
  alt: string
  width: number
  height: number
}
