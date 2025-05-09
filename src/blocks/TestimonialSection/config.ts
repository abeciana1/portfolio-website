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
    }
  ]
}