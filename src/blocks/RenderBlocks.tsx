import { type Page } from '@/src/payload-types'
import { Fragment } from 'react'
import { transformBlockMedia } from '@/utils/transformImage'

// * components
import HeroSection from '@/src/blocks/HeroSection/component'
import InViewBasic from '@/src/blocks/InViewBasic/component'
import SkillsSection from '@/src/blocks/SkillsSection/component'
import CodeMockupSection from '@/src/blocks/CodeMockupSection/component'

// * component types
import {
  type HeroSectionProps,
  type InViewBasicProps,
  type CodeMockupSectionProps
} from '@/types/blockTypes'

type BlockComponentsMap = {
  'hero-section': React.FC<HeroSectionProps>;
  'in-view-basic': React.FC<InViewBasicProps>;
  'skills-section': React.FC<any>;
  'code-mockup-section': React.FC<CodeMockupSectionProps>;
};

const blockComponents: BlockComponentsMap = {
  'hero-section': HeroSection,
  'in-view-basic': InViewBasic,
  'skills-section': SkillsSection,
  'code-mockup-section': CodeMockupSection
}

const RenderBlocks: React.FC<{
  blocks: Page['layout']
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
