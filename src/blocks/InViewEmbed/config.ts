import {
  type Block,
} from 'payload';
import { CodeMockupSectionBlock } from '@/src/blocks/CodeMockupSection/config'
import { RichTextBlock } from '@/src/blocks/RichTextEditor/config'

const allowableBlocks = [
  CodeMockupSectionBlock,
  RichTextBlock
]

export const InViewEmbedBlock: Block = {
  slug: 'in-view-embed',
  interfaceName: 'InViewEmbedBlock',
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      label: 'Section ID',
      required: true,
    },
    {
      name: 'embedBlocks',
      type: 'blocks',
      label: 'Embed Blocks',
      blocks: allowableBlocks,
    }
  ]
}