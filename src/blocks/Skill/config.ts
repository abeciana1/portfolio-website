import { type Block } from 'payload';

export const Skill: Block = {
  slug: 'skill-block',
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