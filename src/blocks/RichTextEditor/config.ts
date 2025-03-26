import { type Block } from 'payload'
import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML
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
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HTMLConverterFeature({}),
        ]
      })
    },
    lexicalHTML('content', { name: 'content_html' })
  ],
}