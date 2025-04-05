import {
  type HeroSection,
  type SkillsCollection
} from '@/src/payload-types'
import {
  type CMSMediaT,
  type SkillProps
} from '@/types/general'
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
  code: BlockComponentsMap[];
  enableSection: boolean;
  background: 'black' | 'gray';
  useRandomData: boolean;
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
  vertAlignment: 'top' | 'middle' | 'bottom';
}

export type RichTextEditorProps = {
  content_html: string;
}

export type SkillsSectionProps = {
  sectionId: string;
  heading: string;
  skillsCollection: {
    skills: SkillProps[];
  };
}

export type InViewEmbedProps = {
  sectionId: string;
  embedBlocks: BlockComponentsMap[];
  hiddenY: number;
  hiddenBlur: number;
  visibleY: number;
  visibleBlur: number;
}