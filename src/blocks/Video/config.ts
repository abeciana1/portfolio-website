import { type Block } from 'payload';

export const Video: Block = {
  slug: 'video-block',
  interfaceName: 'VideoBlock',
  fields: [
    {
      name: 'video',
      label: 'Video',
      type: 'upload',
      relationTo: 'video',
      required: true,
    },
    {
      name: 'forcedWidth',
      type: 'number',
      label: 'Force image width (in pixels)',
      admin: {
        description: 'Set a specific width for the image, overriding the aspect ratio'
      },
      required: true,
      defaultValue: 0
    },
    {
      name: 'forcedHeight',
      type: 'number',
      label: 'Force image height (in pixels)',
      admin: {
        description: 'Set a specific height for the image, overriding the aspect ratio'
      },
      required: true,
      defaultValue: 0
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
      ],
      admin: {
        condition: (data, siblingData) => {
          if (siblingData?.gradient) {
            return true
          } else {
            return false
          }
        }
      }
    },
  ],
}