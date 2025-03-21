import {
  type HeroSection,
  type SkillBlock
} from '@/src/payload-types'
import { ImageT } from '@/types/general'

type InnerContainer = {
  enableInnerContainer?: boolean;
}

export type HeroSectionProps = HeroSection & InnerContainer & {
  media: ImageBlockProps[]
}

export type SkillProps = SkillBlock & InnerContainer

export type ImageBlockProps = {
  image: ImageT;
  gradient?: boolean;
  gradientXFlip?: boolean;
  gradientYFlip?: boolean;
  gradientSelect?: 'Variant1' | 'Variant2' | 'Variant3' | 'Variant4';
}

export type InViewBasicProps = {
  title: string;
  description: string;
  hiddenY: number;
  hiddenBlur: number;
  visibleY: number;
  visibleBlur: number;
}