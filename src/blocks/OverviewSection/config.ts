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
    lexicalHTML('content', { name: 'content_html' }),
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Designer', 'value': 'designer' },
        { label: 'Frontend Developer', value: 'frontendDev' },
        { label: 'Backend Developer', value: 'backendDEv' },
        { label: 'Integration Specialist', value: 'integrationSpec' }
      ],
      required: true
    },
    {
      type: 'group',
      name: 'duration',
      label: 'Duration',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'timeLength',
              label: 'Time length',
              type: 'number',
              required: true
            },
            {
              name: 'frequency',
              label: 'Frequency',
              type: 'select',
              required: true,
              options: [
                { label: 'Years', value: 'years' },
                { label: 'Months', value: 'months' },
                { label: 'Weeks', value: 'weeks' }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'relationship',
      relationTo: 'project-tags',
      required: true,
      hasMany: true
    }
  ]
}