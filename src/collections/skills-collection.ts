import {
  type CollectionConfig
} from 'payload'
import { Skill } from '@/src/blocks/Skill/config'

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
      required: true,
      type: 'blocks',
      blocks: [
        Skill
      ],
      admin: {
        description: 'Add skills to the collection',
      }
    }
  ]
}