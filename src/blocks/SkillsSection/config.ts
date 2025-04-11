import {
  type Block,
  type CollectionSlug
} from 'payload';
import { CallToAction } from '@/src/blocks/CallToAction/config'

export const SkillsSection: Block = {
  slug: 'skills-section',
  interfaceName: 'SkillsSection',
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      label: 'Section ID',
      required: true,
    },
    {
      name: 'pill',
      type: 'text',
      label: 'Pill',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description'
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
      name: 'skillsCollection',
      label: 'Skills Collection',
      type: 'relationship',
      relationTo: 'skills-collection' as CollectionSlug,
      required: true
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