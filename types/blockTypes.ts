import { type HeroSection, type ImageBlock } from '@/src/payload-types'
import { type CMSMediaT } from '@/types/general'

export type GradientOptions = 'Variant1' | 'Variant2' | 'Variant3' | 'Variant4';

export type HeroSectionProps = Omit<HeroSection, 'media' | 'enableInnerContainer'> & {
  media: ImageBlockProps[];
  enableInnerContainer: boolean;
}

export type ImageBlockProps = {
  image: CMSMediaT;
  gradient?: boolean;
  gradientXFlip?: boolean;
  gradientYFlip?: boolean;
  gradientSelect?: GradientOptions;
}

export type InViewBasicProps = {
  title: string;
  description: string;
  hiddenY: number;
  hiddenBlur: number;
  visibleY: number;
  visibleBlur: number;
  enableInnerContainer: boolean;
}
