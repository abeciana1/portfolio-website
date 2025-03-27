import { type HeroSection } from '@/src/payload-types'
import { type CMSMediaT } from '@/types/general'
import { type BlockComponentsMap } from '@/src/blocks/RenderBlocks'

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

export type CodeMockupSectionProps = {
  sectionId: string;
  children: React.ReactNode;
  enableSection: boolean;
  background: 'black' | 'gray';
}

export type CodeMockupLineProps = {
  text: string;
  prefix: string;
  textColor: 'white' | 'black' | 'success' | 'warning'
}

export type TwoColumnGridProps = {
  sectionId: string;
  column1: BlockComponentsMap[];
  column2: BlockComponentsMap[];
  reverseOrder: boolean;
}

export type RichTextEditorProps = {
  content_html: string;
}