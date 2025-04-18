import { type Block } from 'payload';
import { RichTextBlock } from '@/src/blocks/RichTextEditor/config'
import { Image } from '@/src/blocks/Image/config'

export const Job: Block = {
  slug: 'job-block',
  interfaceName: 'JobBlock',
  fields: [
    {
      name: 'companyLogo',
      label: 'Company logo',
      type: 'blocks',
      maxRows: 1,
      blocks: [
        Image
      ],
      required: true
    },
    {
      name: 'companyName',
      label: 'Company',
      type: 'text',
      required: true
    },
    {
      name: 'jobRole',
      label: 'Role',
      type: 'text',
      required: true
    },
    {
      name: 'startDate',
      label: 'Start date',
      type: 'date',
      required: true
    },
    {
      name: 'currentPosition',
      label: 'Current position?',
      type: 'checkbox'
    },
    {
      name: 'endDate',
      label: 'End date',
      type: 'date',
      required: true,
      admin: {
        condition: (data) => {
          if (!data.currentPosition) {
            return false
          } else {
            return true
          }
        }
      }
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      required: true
    },
    {
      name: 'positionType',
      label: 'Type of position',
      type: 'select',
      options: [
        { label: 'Contract', value: 'Contract' },
        { label: 'Full-Time', value: 'Full-Time' },
        { label: 'Entrepreneur', value: 'Entrepreneur' }
      ]
    },
    {
      name: 'companyDescription',
      label: 'Company description',
      type: 'textarea',
      required: true
    },
    {
      name: 'companyWebsite',
      label: 'Company website',
      type: 'text',
      required: true
    },
    {
      name: 'duties',
      label: 'Job responsibilities',
      type: 'blocks',
      maxRows: 1,
      blocks: [
        RichTextBlock
      ],
      required: true
    },
    {
      name: 'skills',
      label: 'Job skills',
      type: 'relationship',
      relationTo: 'skills',
      hasMany: true
    }
  ]
}