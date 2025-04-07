import {
  type Block,
  type CollectionSlug
} from 'payload';

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
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
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
      name: 'gradientXFlip',
      label: 'Flip gradient along X-axis',
      type: 'checkbox',
      defaultValue: false
    },
    {
      name: 'gradientYFlip',
      label: 'Flip gradient along X-axis',
      type: 'checkbox',
      defaultValue: false
    },
    {
      name: 'forcedWidth',
      type: 'number',
      label: 'Force image width (in pixels)',
      admin: {
        description: 'Set a specific width for the image, overriding the aspect ratio'
      }
    },
    {
      name: 'forcedHeight',
      type: 'number',
      label: 'Force image height (in pixels)',
      admin: {
        description: 'Set a specific height for the image, overriding the aspect ratio'
      }
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