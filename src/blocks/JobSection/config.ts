import { type Block } from 'payload';

export const JobSection: Block = {
  slug: 'job-section-block',
  interfaceName: 'JobSectionBlock',
  fields: [
    {
      name: 'sectionId',
      label: 'Section ID',
      type: 'text',
      required: true
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true
    },
    {
      name: 'jobs',
      label: 'jobs',
      type: 'relationship',
      relationTo: 'jobs',
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
      ]
    }
  ]
}