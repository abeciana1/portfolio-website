import { type Block } from 'payload'

export const BlogPostSectionBlock: Block = {
  slug: 'blog-post-section',
  interfaceName: 'BlogPostSectionBlock',
  fields: [
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