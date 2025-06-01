import { type Block } from 'payload'

export const InsightsSectionBlock: Block = {
  slug: 'insights-section',
  interfaceName: 'InsightsSectionBlock',
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      label: 'Section ID',
      required: true,
    },
    {
      name: 'pill',
      type: 'text',
      label: 'Pill',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description'
    },
    {
      name: 'insights',
      type: 'array',
      label: 'Insights',
      maxRows: 3,
      required: true,
      fields: [
        {
          name: 'title',
          label: 'Title',
          required: true,
          type: 'text'
        },
        {
          name: 'body',
          label: 'Body',
          required: true,
          type: 'textarea'
        }
      ]
    }
  ]
}