import { type Block } from 'payload'

export const ProjectGridBlock: Block = {
  slug: 'project-grid-block',
  interfaceName: 'ProjectGridBlock',
  fields: [
    {
      name: 'projects',
      label: 'Projects',
      type: 'relationship',
      relationTo: 'projects',
      required: true,
      hasMany: true
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
    },
  ]
}