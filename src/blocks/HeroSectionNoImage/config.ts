import { type Block } from 'payload'
import { CallToAction } from '@/src/blocks/CallToAction/config'

export const HeroSectionNoImage: Block = {
  slug: 'hero-section-no-image',
  interfaceName: 'HeroSectionNoImageBlock',
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
      name: 'secondaryBlurb',
      label: 'Secondary Blurb',
      type: 'textarea'
    },
    {
      name: 'enableInnerContainer',
      label: 'Enable Inner Container',
      type: 'checkbox',
      admin: {
        description: 'Enable the inner container for this section'
      },
      defaultValue: false,
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
  ]
}