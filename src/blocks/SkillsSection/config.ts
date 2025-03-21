import {
  type Block,
  type CollectionSlug
} from 'payload';

export const SkillsSection: Block = {
  slug: 'skills-section',
  interfaceName: 'SkillsSection',
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      label: 'Section ID',
      required: true,
    },
    {
      name: 'skillsCollection',
      label: 'Skills Collection',
      type: 'relationship',
      relationTo: 'skills' as CollectionSlug
    }
  ]
}