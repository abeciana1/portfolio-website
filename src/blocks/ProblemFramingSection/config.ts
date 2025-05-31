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
    }
  ]
}