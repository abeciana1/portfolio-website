import { link } from '@/src/fields/link'
import { type Block } from 'payload';

export const CallToAction: Block = {
  slug: 'call-to-action',
  fields: [
    {
      type: 'collapsible',
      label: 'Call-To-Action link',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'style',
          label: 'Primary or secondary CTA',
          type: 'select',
          options: [
            {label: 'Primary', value: 'primary'},
            {label: 'Secondary', value: 'secondary'}
          ]
        },
        link({
          required: false,
        }),
        {
          name: 'border',
          label: 'Use border',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            condition: (data) => {
              if (data?.style === 'secondary') {
                return true
              } else {
                return false
              }
            }
          }
        },
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
          ],
          admin: {
            condition: (data) => {
              if (data?.arrow) {
                return true;
              } else {
                return false;
              }
            }
          }
        }
      ],
    },
  ]
}