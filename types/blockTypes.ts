import {
  type HeroSection,
  type Skill,
  type JobSectionBlock,
  type TestimonialSectionBlock,
  type Job,
  type Project,
  type ProjectTag,
  type HeroSectionNoImageBlock,
  type ProjectSectionBlock,
  type OverviewSectionBlock,
  type ImageBlock,
  type ProblemFramingSectionBlock,
  type UserResearchSectionBlock,
  type InsightsSectionBlock,
  type OutcomesSectionBlock,
  type BlogPostSectionBlock,
  type BlogPage
} from '@/src/payload-types'
import {
  type CMSMediaT,
  type ProjectLink
} from '@/types/general'
import { type BlockComponentsMap } from '@/src/blocks/RenderBlocks'
import { type BlockComponentsMap as BlogBlockComponentsMap } from '@/src/blocks/RenderBlogBlocks'

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

export type HeroSectionProps = Omit<HeroSection, 'enableInnerContainer'> & {
  media: ImageBlockProps[];
  enableInnerContainer: boolean;
  greyBackground?: boolean;
}

export type HeroSectionNoImageBlockProps = Pick<HeroSectionNoImageBlock,
  'sectionId' |
  'title' |
  'subtitle' |
  'description' |
  'secondaryBlurb' |
  'callToAction'
>;

export type ImageBlockProps = Pick<ImageBlock,
'forcedHeight' |
'forcedWidth'
> & {
  image: CMSMediaT;
  gradient?: boolean;
  gradientXFlip?: boolean;
  gradientYFlip?: boolean;
  gradientSelect?: GradientOptions;
  priority?: boolean;
  useURL?: boolean;
  cursorLabel?: string;
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
  eventLocation: string;
  cursorLabel?: string;
}

export type JobSectionProps = Pick<JobSectionBlock, 'title' | 'sectionId' > & {
  jobs: JobProps[];
  gradient: boolean;
  gradientSelect?: GradientOptions;
}

export type JobProps = Pick<Job,
  'companyName' |
  'jobRole' |
  'companyDescription' |
  'companyWebsite' |
  'startDate' |
  'endDate' |
  'location' |
  'positionType' |
  'currentPosition'
  > & {
  companyLogo: ImageBlockProps[];
  skills: Skill[];
  duties: RichTextEditorProps[];
}

export type TestimonialProps = {
  name: string;
  position: string;
  company: string;
  headshot: CMSMediaT;
  callout: string;
  content_html: string;
}

export type TestimonialSectionProps = Pick<TestimonialSectionBlock,
  'sectionId' |
  'pill' |
  'heading' |
  'description'
  > & {
  testimonials: TestimonialProps[];
  gradient: boolean;
  gradientSelect?: GradientOptions;
  carouselCustom: boolean;
  enableInfinite: boolean;
  carouselTimer: boolean;
  secondsTimer: number;
}

export type ProjectTagProps = Pick<ProjectTag,
  'id'
> & {
  label: string;
  addBorder?: boolean;
  enableDarkMode?: boolean;
  inversePill?: boolean;
}

export type ProjectProps = Pick<Project,
  'title' |
  'excerpt' |
  'status'
> & {
  slug: string;
  tech: Skill[];
  links: ProjectLink[];
  tags: ProjectTagProps[];
  image: CMSMediaT;
}

export type ProjectSectionBlockProps = Pick<ProjectSectionBlock,
  'sectionId' |
  'pill' |
  'heading' |
  'description' |
  'callToAction'
> & {
  projects: ProjectProps[];
  gradient: boolean;
  gradientSelect?: GradientOptions;
}

export type RoleSelect = 'designer' | 'frontendDev' | 'backendDEv' | 'integrationSpec'

export type OverviewSectionBlockProps = Pick<OverviewSectionBlock,
  'title' |
  'content_html' |
  'role' |
  'duration' | 
  'greyBackground'
> & {
  tags: ProjectTagProps[]
}

export type ProblemFrameProps = {
  frame: 'who' | 'where' | 'when' | 'why';
  description: string;
}

export type ProblemFramingSectionBlockProps = Pick<ProblemFramingSectionBlock,
  'sectionId' |
  'pill' |
  'heading' |
  'description' |
  'greyBackground' |
  'gradient' |
  'gradientSelect'
> & {
  problems: ProblemFrameProps[];
}

export type UserResearchCardProps = {
  researchType: ('survey' | 'interviews' | 'usability' | 'accessibility');
  numberMetric: number;
}

export type UserResearchSectionBlockProps = Pick<UserResearchSectionBlock,
  'sectionId' |
  'pill' |
  'heading' |
  'description' |
  'research' |
  'gradient' |
  'gradientSelect'
>

export type InsightProps = {
  title: string;
  body: string;
}

export type InsightsSectionBlockProps = Pick<InsightsSectionBlock,
  'sectionId' |
  'pill' |
  'heading' |
  'description' |
  'insights'
>

export type OutcomeStatProps = {
  number: number;
  numLabel?: string | null;
  label: string;
  id?: string | null;
}

export type OutcomeProps = {
  resultType: 'adoption' | 'retention' | 'efficiency';
  emojis: string;
  stats: OutcomeStatProps[];
}

export type OutcomesSectionBlockProps = Pick<OutcomesSectionBlock,
  'sectionId' |
  'pill' |
  'heading' |
  'description' |
  'outcomes' |
  'gradient' |
  'gradientSelect'
>

export type BlogImageProps = {
  image: CMSMediaT;
  caption: string;
  cursorLabel: string;
}

export type BlogHeaderProps = {
  title: string;
  excerpt: string;
  featuredImage: CMSMediaT;
  category: ProjectTagProps;
  tags: ProjectTagProps[];
  cursorLabel: string;
}

export type BlogBodyBlockProps = {
  embedBlocks: BlogBlockComponentsMap[];
}

export type BlogPostSectionBlockProps = Pick<BlogPostSectionBlock,
  'postSelection' |
  'postLimit'
> & {
  categoryFilter?: ProjectTagProps;
  posts: BlogPage[];
  enableSectionContent: boolean;
  sectionGroup?: {
    sectionId: string;
    pill: string;
    heading: string;
    description: string;
    callToAction: CallToActionProps[];
  }
}

export type BlogPostCardProps = {
  title: string;
  slug: string;
  publishedDate: string;
  category: ProjectTagProps;
  tags: ProjectTagProps[];
  meta: {
    image: CMSMediaT;
    description: string;
  }
  teaserContent: string;
}

export type CodeBlockProps = {
  code: string;
  language?: 'bash' | 'css' | 'html' | 'javascript' | 'json' | 'markdown' | 'python' | 'sql' | 'yaml' | 'typescript'
}

export type VideoBlockProps = {
  title: string;
  storageKey: string;
  streamUrl: string;
  videoUrl: string;
  url?: string;
  thumbnailURL?: string;
  width?: number;
  height?: number;
}