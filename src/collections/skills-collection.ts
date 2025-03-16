import {
  type CollectionConfig,
  type CollectionSlug
} from 'payload'
// import { Skill } from '@/src/blocks/Skill/config'

export const SkillCollection: CollectionConfig = {
  slug: 'skills-collection',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Title for the skill collection',
      },
      required: true,
      label: 'Title'
    },
    {
      name: 'skills',
      label: 'Skills',
      type: 'relationship',
      relationTo: 'skills' as CollectionSlug,
      hasMany: true,
      admin: {
        description: 'Add skills to the collection',
      }
    }
  ]
}