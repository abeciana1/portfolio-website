import {
  type CollectionConfig
} from 'payload';

export const ProjectTag: CollectionConfig = {
  slug: 'project-tags',
  admin: {
    useAsTitle: 'label'
  },
  fields: [
    {
      name: 'label',
      label: 'Label',
      type: 'text',
      required: true
    }
  ]
}