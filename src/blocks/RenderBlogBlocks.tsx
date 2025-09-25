/* eslint-disable @typescript-eslint/no-explicit-any */
import { type BlogPage } from '@/src/payload-types'
import { Fragment } from 'react'
import { transformBlockMedia } from '@/utils/transformImage'

// * components
import HeroSectionNoImage from '@/src/blocks/HeroSectionNoImage/component'
import RichTextEditor from '@/src/blocks/RichTextEditor/component'
import BlogImage from '@/src/blocks/BlogImage/component'
import BlogHeader from '@/src/blocks/BlogHeader/component'
import BlogBodyBlock from '@/src/blocks/BlogBody/component'
import BlogPostSection from '@/src/blocks/BlogPostSection/component'
import Code from '@/src/blocks/Code/component'
import Video from '@/src/blocks/Video/component'

// * component types
import {
  type HeroSectionNoImageBlockProps,
  type RichTextEditorProps,
  type BlogImageProps,
  type BlogHeaderProps,
  type BlogBodyBlockProps,
  type BlogPostSectionBlockProps,
  type CodeBlockProps,
  type VideoBlockProps
} from '@/types/blockTypes'

export type BlockComponentsMap = {
  'hero-section-no-image': React.FC<HeroSectionNoImageBlockProps>;
  'rich-text-block': React.FC<RichTextEditorProps>;
  'blog-image': React.FC<BlogImageProps>;
  'blog-header': React.FC<BlogHeaderProps>;
  'blog-body': React.FC<BlogBodyBlockProps>;
  'blog-post-section': React.FC<BlogPostSectionBlockProps>;
  'code': React.FC<CodeBlockProps>;
  'video-block': React.FC<VideoBlockProps>;
}

const blockComponents: BlockComponentsMap = {
  'hero-section-no-image': HeroSectionNoImage,
  'rich-text-block': RichTextEditor,
  'blog-image': BlogImage,
  'blog-header': BlogHeader,
  'blog-body': BlogBodyBlock,
  'blog-post-section': BlogPostSection,
  'code': Code,
  'video-block': Video
}

const RenderBlogBlocks: React.FC<{
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

export default RenderBlogBlocks