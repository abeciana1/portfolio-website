/* eslint-disable @typescript-eslint/no-explicit-any */
import { type BlogPage } from '@/src/payload-types'
import { Fragment } from 'react'
import { transformBlockMedia } from '@/utils/transformImage'

// * components
import HeroSectionNoImage from '@/src/blocks/HeroSectionNoImage/component'
import RichTextEditor from '@/src/blocks/RichTextEditor/component'
import BlogImage from '@/src/blocks/BlogImage/component'
import BlogHeader from '@/src/blocks/BlogHeader/component'

// * component types
import {
  type HeroSectionNoImageBlockProps,
  type RichTextEditorProps,
  type BlogImageProps,
  type BlogHeaderProps
} from '@/types/blockTypes'

export type BlockComponentsMap = {
  'hero-section-no-image': React.FC<HeroSectionNoImageBlockProps>;
  'rich-text-block': React.FC<RichTextEditorProps>;
  'blog-image': React.FC<BlogImageProps>;
  'blog-header': React.FC<BlogHeaderProps>;
}

const blockComponents: BlockComponentsMap = {
  'hero-section-no-image': HeroSectionNoImage,
  'rich-text-block': RichTextEditor,
  'blog-image': BlogImage,
  'blog-header': BlogHeader
}

const RenderProjectBlocks: React.FC<{
  blocks: BlogPage['layout']
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