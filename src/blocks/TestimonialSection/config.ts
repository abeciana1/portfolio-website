import {
  type Block,
  type CollectionSlug
} from 'payload';

export const TestimonialSectionBlock: Block = {
  slug: 'testimonial-section-block',
  interfaceName: 'TestimonialSectionBlock',
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      label: 'Section ID',
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
      name: 'testimonials',
      label: 'Testimonials',
      type: 'relationship',
      relationTo: 'testimonials' as CollectionSlug,
      required: true,
      hasMany: true
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
          if (siblingData.gradient) {
            return true
          } else {
            return false
          }
        }
      }
    },
    {
      name: 'carouselCustom',
      label: 'Add custom carousel settings',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'enableInfinite',
      label: 'Make carousel infinite',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: (data, siblingData) => {
          if (siblingData.carouselCustom) {
            return true
          } else {
            return false
          }
        }
      }
    },
    {
      name: 'carouselTimer',
      label: 'Enable timer',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: (data, siblingData) => {
          if (siblingData.carouselCustom) {
            return true
          } else {
            return false
          }
        }
      }
    },
    {
      name: 'secondsTimer',
      label: 'Timer (in seconds)',
      type: 'number',
      admin: {
        description: 'This is the delay between slides.',
        condition: (data, siblingData) => {
          if (siblingData.carouselTimer) {
            return true
          } else {
            return false
          }
        }
      }
    }
  ]
}