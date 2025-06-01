import { type Block } from 'payload'

export const ProblemFramingSection: Block = {
  slug: 'problem-framing',
  interfaceName: 'ProblemFramingSectionBlock',
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
      name: 'problems',
      type: 'array',
      label: 'Problems',
      fields: [
        {
          name: 'frame',
          label: 'Frame',
          type: 'select',
          options: [
            { label: 'Who', value: 'who' },
            { label: 'Where', value: 'where' },
            { label: 'When', value: 'when' },
            { label: 'Why', value: 'why' }
          ],
          required: true
        },
        {
          name: 'description',
          label: 'Description',
          type: 'text',
          required: true
        }
      ]
    },
    {
      name: 'greyBackground',
      label: 'Grey background enabled',
      type: 'checkbox',
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