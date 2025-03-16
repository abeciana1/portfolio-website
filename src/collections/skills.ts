import { type CollectionConfig } from 'payload';

export const Skill: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'skillIcon',
      label: 'Skill Icon',
      type: 'upload',
      relationTo:'media',
      required: true,
    }
  ]
}