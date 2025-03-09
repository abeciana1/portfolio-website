import { link } from '@/src/fields/link'
import { type Block } from 'payload';

export const CallToAction: Block = {
  slug: 'call-to-action',
  fields: [
    {
      name: 'style',
      label: 'Primary or secondary CTA',
      type: 'select',
      options: [
        {label: 'Primary', value: 'primary'},
        {label: 'Secondary', value: 'secondary'}
      ],
      hooks: {
        beforeChange: [
          async ({ blockData }) => {
            if (blockData && blockData.link.label) {
              blockData.blockName = blockData.link.label
            }
          }
        ],
      },
    },
    link({
      required: false,
    }),
    {
      name: 'arrow',
      label: 'Use arrow',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'arrowDirection',
      label: 'Arrow direction',
      type: 'select',
      hasMany: false,
      options: [
        {
          label: 'Right',
          value: 'right',
        },
        {
          label: 'Down',
          value: 'down'
        }
      ]
    }
  ],
}