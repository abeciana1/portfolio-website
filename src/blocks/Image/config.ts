import { type Block } from 'payload';

export const Image: Block = {
  slug: 'image',
  fields: [
    {
      type: 'collapsible',
      label: 'Image',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
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
  ]
}