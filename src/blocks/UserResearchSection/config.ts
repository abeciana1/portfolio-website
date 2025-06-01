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
          required: true,
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
    },
    {
      name: 'gradient',
      label: 'Add gradient to image',
      type: 'checkbox',
      admin: {
        description: 'Add a gradient aura to the image'
      },
      defaultValue: false,
    },
    {
      name: 'gradientSelect',
      label: 'Gradient variant select',
      type: 'select',
      options: [
        { label: 'Variant 1', value: 'Variant1' },
        { label: 'Variant 2', value: 'Variant2' },
        { label: 'Variant 3', value: 'Variant3' },
        { label: 'Variant 4', value: 'Variant4' }
      ],
      admin: {
        condition: (data, siblingData) => {
          if (siblingData.gradient) {
            return true
          } else {
            return false
          }
        }
      }
    }
  ]
}