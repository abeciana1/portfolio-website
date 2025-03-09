import { type Block } from 'payload';
import { CallToAction } from '@/src/blocks/CallToAction/config'

export const HeroSection: Block = {
  slug: 'hero-section',
  fields: [
    {
      type: 'collapsible',
      label: 'Hero Section',
      admin: {
        initCollapsed: true,
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
      name: 'callToAction',
      label: 'Call-to-Action',
      type: 'blocks',
      maxRows: 2,
      blocks: [
        CallToAction
      ],
      required: false,
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