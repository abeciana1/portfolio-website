import { type Media } from '@/src/payload-types'

export interface WrapperI {
  children: React.ReactNode;
}

export type ImageT = CMSMediaT & {
  alt: string;
  width: number;
  height: number;
}

export type CMSMediaT = Media & {
  webpUrl: string
}

export type HeadingProps = {
  text: string;
}