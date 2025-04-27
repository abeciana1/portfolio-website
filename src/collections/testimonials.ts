import {
  type CollectionConfig
} from 'payload';
import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML
} from '@payloadcms/richtext-lexical'

export const Testimonial: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name'
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true
    },
    {
      name: 'position',
      type: 'text',
      label: 'Position',
      required: true
    },
    {
      name: 'company',
      type: 'text',
      label: 'Company',
      required: true
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
    lexicalHTML('content', { name: 'content_html' }),
    {
      name: 'headshot',
      label: 'Headshot',
      type: 'upload',
      relationTo: 'media',
      required: true
    }
  ]
}