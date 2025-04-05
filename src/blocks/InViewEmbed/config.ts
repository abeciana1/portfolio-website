import {
  type Block,
} from 'payload';
import { CodeMockupSectionBlock } from '@/src/blocks/CodeMockupSection/config'
import { RichTextBlock } from '@/src/blocks/RichTextEditor/config'
import { TwoColumnGrid } from '@/src/blocks/TwoColumnGrid/config'
import { CardBlock } from '@/src/blocks/Card/config'

const allowableBlocks = [
  CodeMockupSectionBlock,
  RichTextBlock,
  TwoColumnGrid,
  CardBlock
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
      label: 'Hidden options',
      type: 'collapsible',
      fields: [
        {
          name: 'hiddenY',
          label: 'Hidden on y-axis',
          type: 'number',
          admin: {
            description: 'Hidden on y-axis (in pixels)'
          },
          defaultValue: 0,
        },
        {
          name: 'hiddenBlur',
          label: 'Blur background',
          type: 'number',
          defaultValue: 4
        }
      ]
    },
    {
      label: 'Visible options',
      type: 'collapsible',
      fields: [
        {
          name: 'visibleY',
          label: 'Visible on y-axis',
          type: 'number',
          admin: {
            description: 'Visible on y-axis (in pixels)'
          },
          defaultValue: 1,
        },
        {
          name: 'visibleBlur',
          label: 'Blur background',
          type: 'number',
          defaultValue: 0
        }
      ]
    },
    {
      name: 'embedBlocks',
      type: 'blocks',
      label: 'Embed Blocks',
      blocks: allowableBlocks,
    }
  ]
}