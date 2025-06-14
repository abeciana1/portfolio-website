import {
  type CollectionConfig
} from 'payload';
import {
  lexicalEditor,
  lexicalHTMLField
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
      name: 'headshot',
      label: 'Headshot',
      type: 'upload',
      relationTo: 'media',
      required: true
    },
    {
      name: 'callout',
      label: 'Callout',
      type: 'text',
      required: true
    },
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
    }),
  ]
}