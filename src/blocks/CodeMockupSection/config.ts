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
      name: 'enableSection',
      type: 'checkbox',
      label: 'Enable Section',
    },
    {
      name: 'useRandomData',
      type: 'checkbox',
      label: 'Use Random Data',
      admin: {
        description: 'This is used for developer jokes.'
      }
    },
    {
      name: 'background',
      type: 'select',
      label: 'Background Color',
      options: [
        { label: 'Black', value: 'black' },
        { label: 'Gray', value: 'gray' },
      ]
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