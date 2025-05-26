import { type Block } from 'payload'
import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML
} from '@payloadcms/richtext-lexical'

export const OverviewSection: Block = {
  slug: 'overview-section',
  interfaceName: 'OverviewSectionBlock',
  fields: [
    {
      name: 'title',
      label: 'Title',
      required: true,
      type: 'text'
    },
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
  ]
}