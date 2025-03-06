import { type Block } from 'payload';
import { link } from '@/src/fields/link'

export const HeroSection: Block = {
  slug: 'hero-section',
  fields: [
    {
      type: 'collapsible',
      label: 'Hero Section',
      admin: {
        initCollapsed: true
      },
      fields: [
        {
          name: 'sectionId',
          label: 'Section ID',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          label: 'Subtitle',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
        },
      ]
    },
    {
      type: 'collapsible',
      label: 'Primary CTA (Optional)',
      admin: {
        initCollapsed: true,
      },
      fields: [
        link({
          required: false,
          overrides: {
            name: 'ctaPrimary',
            label: 'Primary CTA (Optional)',
          },
        })
      ],
    },
    {
      type: 'collapsible',
      label: 'Secondary CTA (Optional)',
      admin: {
        initCollapsed: true,
      },
      fields: [
        link({
          required: false,
          overrides: {
            name: 'ctaSecondary',
            label: 'Secondary CTA (Optional)',
          },
        }),
        {
          name: 'border',
          label: 'Use border',
          type: 'checkbox',
          defaultValue: false,
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
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imageGradient',
      label: 'Add gradient to image',
      type: 'checkbox',
      admin: {
        description: 'Add a gradient aura to the image'
      },
      defaultValue: false,
    }
  ]
}