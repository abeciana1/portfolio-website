import { type Block } from 'payload'
import {
  lexicalEditor,
  lexicalHTMLField
} from '@payloadcms/richtext-lexical'

export const RichTextBlock: Block = {
  slug: 'rich-text-block',
  interfaceName: 'RichTextBlock',
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: 'Rich Text Content',
      required: true,
      editor: lexicalEditor()
    },
    lexicalHTMLField({
      htmlFieldName: 'content_html',
      lexicalFieldName: 'content'
    })
  ],
}