import { type Block } from 'payload';

export const Skill: Block = {
  slug: 'skill-block',
  fields: [
    {
      type: 'collapsible',
      label: ({ data }: {data : { title: string}}) => `Skill: ${data?.title}` || 'Skill: Untitled',
      admin: {
        initCollapsed: true,
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
  ]
}