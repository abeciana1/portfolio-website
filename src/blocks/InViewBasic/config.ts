import { type Block } from 'payload';

export const InViewBasic: Block = {
  slug: 'in-view-basic',
  interfaceName: 'InViewBasic',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      required: true,
    },
    {
      label: 'Hidden options',
      type: 'collapsible',
      fields: [
        {
          name: 'hiddenY',
          label: 'Hidden on y-axis',
          type: 'number',
          admin: {
            description: 'Hidden on y-axis (in pixels)'
          },
          defaultValue: 0,
        },
        {
          name: 'hiddenBlur',
          label: 'Blur background',
          type: 'number',
          defaultValue: 4
        }
      ]
    },
    {
      label: 'Visible options',
      type: 'collapsible',
      fields: [
        {
          name: 'visibleY',
          label: 'Visible on y-axis',
          type: 'number',
          admin: {
            description: 'Visible on y-axis (in pixels)'
          },
          defaultValue: 1,
        },
        {
          name: 'visibleBlur',
          label: 'Blur background',
          type: 'number',
          defaultValue: 0
        }
      ]
    }
  ]
}