import { type Block } from 'payload';
import { Job } from '@/src/blocks/Job/config'

export const JobSection: Block = {
  slug: 'job-section-block',
  interfaceName: 'JobSectionBlock',
  fields: [
    {
      name: 'jobs',
      label: 'jobs',
      type: 'blocks',
      blocks: [
        Job
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
      ]
    }
  ]
}