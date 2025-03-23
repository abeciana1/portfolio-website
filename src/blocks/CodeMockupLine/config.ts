import { type Block } from 'payload';

export const CodeMockupLinkBlock: Block = {
  slug: 'code-mockup-link',
  interfaceName: 'CodeMockupLinkBlock',
  fields: [
    {
      name: 'prefix',
      type: 'text',
      label: 'Prefix',
      required: true,
      maxLength: 1
    },
    {
      name: 'text',
      label: 'Text',
      required: true,
      type: 'text',
    },
    {
      name: 'textColor',
      label: 'Text Color',
      type: 'select',
      required: true,
      options: [
        { label: 'White', value: 'white' },
        { label: 'Black', value: 'black' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' }
      ]
    }
  ]
}