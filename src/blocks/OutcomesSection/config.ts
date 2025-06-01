import { type Block } from 'payload'

export const OutcomesSectionBlock: Block = {
  slug: 'outcomes-section',
  interfaceName: 'OutcomesSectionBlock',
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
      name: 'outcomes',
      label: 'Outcomes',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'outcomeType',
          label: 'Outcome Type',
          type: 'select',
          options: [
            { label: 'Adoption', value: 'adoption' },
            { label: 'Retention', value: 'retention' },
            { label: 'Efficiency', value: 'efficieny' }
          ],
          required: true
        },
        {
          name: 'emojis',
          label: 'Emojis',
          type: 'text',
          required: true
        },
        {
          name: 'stats',
          label: 'Stats',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'statNumber',
              label: 'Stat Number',
              type: 'number',
              required: true,
            },
            {
              name: 'numberLabel',
              label: 'Number Label',
              type: 'text'
            },
            {
              name: 'statLabel',
              label: 'Stat Label',
              type: 'text',
              required: true
            }
          ]
        }
      ]
    }
  ]
}