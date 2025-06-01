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