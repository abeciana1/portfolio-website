import { type Block } from 'payload';
import { CallToAction } from '@/src/blocks/CallToAction/config'
import { Image as ImageBlock } from '@/src/blocks/Image/config'

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
        {
          name: 'enableInnerContainer',
          label: 'Enable Inner Container',
          type: 'checkbox',
          admin: {
            description: 'Enable the inner container for this section'
          },
          defaultValue: false,
        }
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
      name: 'media',
      label: 'Image',
      type: 'blocks',
      maxRows: 1,
      blocks: [
        ImageBlock
      ]
    }
  ]
}