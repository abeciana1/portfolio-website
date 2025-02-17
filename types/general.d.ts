import { type Media } from '@/src/payload-types'

export interface WrapperI {
  children: React.ReactNode;
}

export type ImageT = {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CMSMediaT {
  webpUrl: string;
}