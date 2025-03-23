import { type Media } from '@/src/payload-types'

export interface WrapperI {
  children: React.ReactNode;
}

export type NavLogoT = {
  src: string;
  alt: string;
  width: number;
  height: number;
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

export type GradientProps = {
  variant?: 'Variant1' | 'Variant2' | 'Variant3' | 'Variant4';
  gradientXFlip?: boolean;
  gradientYFlip?: boolean;
}