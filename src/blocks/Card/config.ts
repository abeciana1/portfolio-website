import {
  type Block,
} from 'payload';
import { CodeMockupSectionBlock } from '@/src/blocks/CodeMockupSection/config'
import { RichTextBlock } from '@/src/blocks/RichTextEditor/config'
import { TwoColumnGrid } from '@/src/blocks/TwoColumnGrid/config'

const allowableBlocks = [
  CodeMockupSectionBlock,
  RichTextBlock,
  TwoColumnGrid
]

export const CardBlock: Block = {
  slug: 'card',
  interfaceName: 'CardBlock',
  fields: [
    {
      name: 'pill',
      type: 'text',
      label: 'Pill',
    },
    {
      name: 'embedBlocks',
      type: 'blocks',
      label: 'Embed Blocks',
      blocks: allowableBlocks,
    }
  ]
}