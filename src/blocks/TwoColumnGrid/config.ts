import { type Block } from 'payload';
import { CodeMockupSectionBlock } from '@/src/blocks/CodeMockupSection/config'
import { RichTextBlock } from '@/src/blocks/RichTextEditor/config'

const allowableBlocks = [
  CodeMockupSectionBlock,
  RichTextBlock
]

export const TwoColumnGrid: Block = {
  slug: 'two-column-grid',
  interfaceName: 'TwoColumnGridBlock',
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      label: 'Section ID',
      required: true,
    },
    {
      name: 'column1',
      type: 'blocks',
      label: 'Column 1',
      blocks: allowableBlocks
    },
    {
      name: 'column2',
      type: 'blocks',
      label: 'Column 2',
      blocks: allowableBlocks
    },
    {
      name: 'reverseOrder',
      type: 'checkbox',
      label: 'Reverse Order',
      admin: {
        description: 'Reverses the order of the columns'
      }
    }
  ]
}