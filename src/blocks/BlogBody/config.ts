import { type Block } from "payload"

// * blocks
import { RichTextBlock } from '@/src/blocks/RichTextEditor/config'
import { BlogImage as BlogImageBlock } from '@/src/blocks/BlogImage/config'

const allowableBlocks = [
  RichTextBlock,
  BlogImageBlock
]

export const BlogBody: Block = {
  slug: 'blog-body',
  interfaceName: 'BlogBodyBlock',
  fields: [
    {
      name: 'body',
      label: 'Body',
      type: 'blocks',
      blocks: allowableBlocks
    }
  ]
}