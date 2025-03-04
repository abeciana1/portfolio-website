import { type Block } from 'payload';

export const HeroSectionConfig: Block = {
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
    }
  ]
}