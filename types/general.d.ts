import { type Media } from '@/src/payload-types'

export type CMSMediaT = Media & {
  webpUrl: string
}

export type ImageT = CMSMediaT & {
  alt: string
  width: number
  height: number
}
