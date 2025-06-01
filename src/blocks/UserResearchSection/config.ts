import { type Block } from 'payload'

export const UserResearchSectionBlock: Block = {
  slug: 'user-research',
  interfaceName: 'UserResearchSectionBlock',
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
      name: 'research',
      type: 'array',
      label: 'Research',
      required: true,
      fields: [
        {
          name: 'researchType',
          type: 'select',
          label: 'Research Type',
          options: [
            { label: 'Survey', value: 'survey' },
            { label: 'Interviews', value: 'interviews' },
            { label: 'Usability Testing', value: 'usability' },
            { label: 'Accessibility Audit', value: 'accessibility' }
          ]
        },
        {
          name: 'numberMetric',
          type: 'number',
          label: 'Number Metric',
          required: true
        }
      ]
    }
  ]
}