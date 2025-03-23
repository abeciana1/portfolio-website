import { type Block } from 'payload';

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
  ]
}