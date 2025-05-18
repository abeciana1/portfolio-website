/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type Page,
  type ProjectPage
} from '@/src/payload-types'
import { Fragment } from 'react'
import { transformBlockMedia } from '@/utils/transformImage'

// * components
import HeroSection from '@/src/blocks/HeroSection/component'
import InViewBasic from '@/src/blocks/InViewBasic/component'
import SkillsSection from '@/src/blocks/SkillsSection/component'
import CodeMockupSection from '@/src/blocks/CodeMockupSection/component'
import CodeMockupLine from '@/src/blocks/CodeMockupLine/component'
import TwoColumnGrid from '@/src/blocks/TwoColumnGrid/component'
import RichTextEditor from '@/src/blocks/RichTextEditor/component'
import InViewEmbed from '@/src/blocks/InViewEmbed/component'
import Card from '@/src/blocks/Card/component'
import JobSection from '@/src/blocks/JobSection/component'
import TestimonialSection from '@/src/blocks/TestimonialSection/component'

// * component types
import {
  type HeroSectionProps,
  type InViewBasicProps,
  type CodeMockupSectionProps,
  type TwoColumnGridProps,
  type RichTextEditorProps,
  type CodeMockupLineProps,
  type InViewEmbedProps,
  type CardBlockProps,
  type JobSectionProps,
  type TestimonialSectionProps
} from '@/types/blockTypes'

export type BlockComponentsMap = {
  'hero-section': React.FC<HeroSectionProps>;
  'in-view-basic': React.FC<InViewBasicProps>;
  'skills-section': React.FC<any>;
  'code-mockup-section': React.FC<CodeMockupSectionProps>;
  'two-column-grid': React.FC<TwoColumnGridProps>;
  'rich-text-block': React.FC<RichTextEditorProps>;
  'code-mockup-link': React.FC<CodeMockupLineProps>;
  'in-view-embed': React.FC<InViewEmbedProps>;
  'card': React.FC<CardBlockProps>;
  'job-section-block': React.FC<JobSectionProps>;
  'testimonial-section-block': React.FC<TestimonialSectionProps>;
};

const blockComponents: BlockComponentsMap = {
  'hero-section': HeroSection,
  'in-view-basic': InViewBasic,
  'skills-section': SkillsSection,
  'code-mockup-section': CodeMockupSection,
  'two-column-grid': TwoColumnGrid,
  'rich-text-block': RichTextEditor,
  'code-mockup-link': CodeMockupLine,
  'in-view-embed': InViewEmbed,
  'card': Card,
  'job-section-block': JobSection,
  'testimonial-section-block': TestimonialSection
}

const RenderBlocks: React.FC<{
  blocks: Page['layout'] | ProjectPage['layout']
}> = (props) => {
  const { blocks } = props
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          if (!block.blockType || !(block.blockType in blockComponents)) {
            return null
          }
          const Block = blockComponents[block.blockType]
          // Automatically transform media if it exists.
          const transformedBlock = transformBlockMedia(block)
          // Type assertion may be needed here if TypeScript loses track of the exact type.
          return <Block key={index} {...(transformedBlock as any)} />
        })}
      </Fragment>
    )
  }
  return null
}

export default RenderBlocks
