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
        }),
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
      ],
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ]
}