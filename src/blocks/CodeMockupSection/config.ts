import { type Block } from 'payload';

export const CodeMockupSection: Block = {
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