import { type Block } from 'payload'

export const RichTextBlock: Block = {
  slug: 'rich-text-block',
  interfaceName: 'RichTextBlock',
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: 'Rich Text Content',
      required: true,
    },
  ],
}