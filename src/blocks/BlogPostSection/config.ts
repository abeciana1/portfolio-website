import { type Block } from 'payload'
import { CallToAction } from '@/src/blocks/CallToAction/config'

export const BlogPostSectionBlock: Block = {
  slug: 'blog-post-section',
  interfaceName: 'BlogPostSectionBlock',
  fields: [
    {
      name: 'enableSectionContent',
      label: 'Enable section content',
      type: 'checkbox'
    },
    {
      name: 'sectionGroup',
      label: 'Section group',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData.enableSectionContent
      },
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
        }
      ]
    },
    {
      name: 'postSelection',
      type: 'select',
      hasMany: false,
      required: true,
      options: [
        { label : 'Latest', value: 'latest' },
        { label : 'Custom', value: 'custom' },
        { label : 'All', value: 'all' },
        { label : 'By Category', value: 'byCategory' }
      ]
    },
    // * Set post limit for rendering
    {
      name: 'postLimit',
      label: 'Limit',
      type: 'number'
    },
    // * For by category post selection
    {
      name: 'categoryFilter',
      label: 'Category filter',
      type: 'relationship',
      relationTo: 'blog-categories',
      hasMany: false,
      admin: {
        condition: (_, siblingData) => siblingData.postSelection === 'byCategory'
      }
    },
    // * For custom post selection
    {
      name: 'posts',
      label: 'Posts',
      type: 'relationship',
      relationTo: 'blog-pages',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.postSelection === 'custom'
      }
    },
  ]
}