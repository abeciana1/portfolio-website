import {
  type CollectionConfig
} from 'payload';
import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML
} from '@payloadcms/richtext-lexical'

export const Project: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title'
  }, 
  fields: [
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true
    },
    {
      name: 'excerpt',
      label: 'Excerpt',
      type: 'textarea',
      required: true
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HTMLConverterFeature({}),
        ]
      })
    },
    {
      name: 'status',
      label: 'Project status',
      type: 'select',
      options: [
        {
          label: 'Completed',
          value: 'completed'
        },
        {
          label: 'In progress',
          value: 'inProgress',
        },
        {
          label: 'On hold',
          value: 'onHold'
        }
      ],
      required: true
    },
    lexicalHTML('description', { name: 'content_html' }),
    {
      name: 'links',
      label: 'Links',
      type: 'array',
      labels: {
        singular: 'Link',
        plural: 'Links'
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true
        },
        {
          name: 'link',
          type: 'text',
          required: true
        }
      ]
    }
  ]
}