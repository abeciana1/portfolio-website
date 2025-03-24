import { type Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const RichTextBlock: Block = {
  slug: 'rich-text-block',
  interfaceName: 'RichTextBlock',
  fields: [
    {
      name: 'richTextContent',
      type: 'richText',
      label: 'Rich Text Content',
      editor: lexicalEditor(),
      required: true,
    },
  ],
}