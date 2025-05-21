import { type Block } from 'payload'

export const ProjectGridBlock: Block = {
  slug: 'project-grid-block',
  interfaceName: 'ProjectGridBlock',
  fields: [
    {
      name: 'projects',
      label: 'Projects',
      type: 'relationship',
      relationTo: 'projects',
      required: true
    }
  ]
}