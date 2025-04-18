import {
  type HeroSection,
  type Skill,
  type JobSectionBlock
} from '@/src/payload-types'
import {
  type CMSMediaT,
} from '@/types/general'
import { type BlockComponentsMap } from '@/src/blocks/RenderBlocks'

export type GradientOptions = 'Variant1' | 'Variant2' | 'Variant3' | 'Variant4';

export type GradientProps = {
  gradientXFlip?: boolean;
  gradientYFlip?: boolean;
  variant?: GradientOptions;
  forcedFirstWidth?: number;
  forcedFirstHeight?: number;
  forcedSecondWidth?: number;
  forcedSecondHeight?: number;
}

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
  code: BlockComponentsMap[];
  enableSection: boolean;
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
  pill: string;
  description: string;
  sectionId: string;
  heading: string;
  gradient: boolean;
  gradientSelect?: GradientOptions;
  skillsCollection: {
    id: number;
    skills: Skill[];
  };
  callToAction: CallToActionProps[];
}

export type InViewEmbedProps = {
  sectionId: string;
  embedBlocks: BlockComponentsMap[];
  hiddenY: number;
  hiddenBlur: number;
  visibleY: number;
  visibleBlur: number;
}

export type CardBlockProps = {
  pill: string;
  embedBlocks: BlockComponentsMap[];
}

type CallToActionReference = {
  value: {
    slug: string
  }
}

export type ArrowDirection = 'right' | 'down'

export type CTAStyle = 'primary' | 'secondary' | 'tertiary' | 'noBackground'

export type CTALink = {
  type: 'reference' | 'custom';
  newTab: boolean;
  url: string;
  reference: CallToActionReference[];
  label: string;
}

export type CallToActionProps = {
  style: CTAStyle;
  arrow: boolean;
  arrowDirection: ArrowDirection
  link: CTALink;
}

export type JobSectionProps = Pick<JobSectionBlock, 'jobs'> & {
  title: string;
  gradient: boolean;
  gradientSelect?: GradientOptions;
}