import { type Block } from 'payload';
import { CodeMockupLinkBlock } from '@/src/blocks/CodeMockupLine/config'

export const CodeMockupSectionBlock: Block = {
  slug: 'code-mockup-section',
  interfaceName: 'CodeMockupSectionBlock',
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      label: 'Section ID',
      required: true,
    },
    {
      name: 'code',
      label: 'Code',
      type: 'blocks',
      blocks: [
        CodeMockupLinkBlock
      ]
    }
  ]
}