import { type Block } from 'payload';
import { CallToAction } from '@/src/blocks/CallToAction/config'

export const ProjectSection: Block = {
  slug: 'project-section-block',
  interfaceName: 'ProjectSectionBlock',
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
      name: 'projects',
      label: 'Projects',
      type: 'relationship',
      relationTo: 'projects',
      required: true,
      hasMany: true
    }
  ]
}