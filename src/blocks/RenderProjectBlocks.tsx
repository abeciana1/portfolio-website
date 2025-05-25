/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ProjectPage } from '@/src/payload-types'
import { Fragment } from 'react'
import { transformBlockMedia } from '@/utils/transformImage'

// * components
import HeroSectionNoImage from '@/src/blocks/HeroSectionNoImage/component'
import ProjectGrid from '@/src/blocks/ProjectGrid/component'
import HeroSection from '@/src/blocks/HeroSection/component'

// * component types
import {
  type HeroSectionNoImageBlockProps,
  type ProjectSectionBlockProps,
  type HeroSectionProps,
} from '@/types/blockTypes'

export type BlockComponentsMap = {
  'hero-section-no-image': React.FC<HeroSectionNoImageBlockProps>;
  'project-grid-block': React.FC<Pick<ProjectSectionBlockProps, 'projects' | 'gradient' | 'gradientSelect'>>;
  'hero-section': React.FC<HeroSectionProps>;
};

const blockComponents: BlockComponentsMap = {
  'hero-section-no-image': HeroSectionNoImage,
  'project-grid-block': ProjectGrid,
  'hero-section': HeroSection,
}

const RenderProjectBlocks: React.FC<{
  blocks: ProjectPage['layout']
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

export default RenderProjectBlocks