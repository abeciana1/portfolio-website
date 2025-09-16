import { type Block } from "payload"

// * blocks
import { RichTextBlock } from '@/src/blocks/RichTextEditor/config'
import { BlogImage as BlogImageBlock } from '@/src/blocks/BlogImage/config'
import { CodeBlock } from '@/src/blocks/Code/config'

const allowableBlocks = [
  RichTextBlock,
  BlogImageBlock,
  CodeBlock
]

export const BlogBody: Block = {
  slug: 'blog-body',
  interfaceName: 'BlogBodyBlock',
  fields: [
    {
      name: 'embedBlocks',
      label: 'Body',
      type: 'blocks',
      blocks: allowableBlocks
    }
  ]
}