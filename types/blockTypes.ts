import { type HeroSection, type ImageBlock } from '@/src/payload-types'
import { type CMSMediaT } from '@/types/general'

/**
 * Define the allowed gradient options.
 */
export type GradientOptions = 'Variant1' | 'Variant2' | 'Variant3' | 'Variant4';

/**
 * For the HeroSection component, we want to ensure:
 * - media is an array of ImageBlockProps (our UI-specific type)
 * - enableInnerContainer is a boolean (not optional/null)
 */
export type HeroSectionProps = Omit<HeroSection, 'media' | 'enableInnerContainer'> & {
  media: ImageBlockProps[];
  enableInnerContainer: boolean;
}

/**
 * The ImageBlockProps for the image component.
 * Instead of using (Media & CMSMediaT) we simply use CMSMediaT,
 * because CMSMediaT already is defined as Media plus a webpUrl field.
 */
export type ImageBlockProps = {
  image: CMSMediaT;
  gradient?: boolean;
  gradientXFlip?: boolean;
  gradientYFlip?: boolean;
  gradientSelect?: GradientOptions;
}

/**
 * For your InViewBasic component, the props are defined directly.
 */
export type InViewBasicProps = {
  title: string;
  description: string;
  hiddenY: number;
  hiddenBlur: number;
  visibleY: number;
  visibleBlur: number;
  enableInnerContainer: boolean;
}
