import { type Block } from 'payload';

export const BlogHeader: Block = {
  slug: 'blog-header',
  interfaceName: 'BlogHeaderBlock',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true
    },
    {
      name: 'excerpt',
      label: 'Excerpt',
      type: 'textarea',
      required: true
    },
    {
      name: 'featuredImage',
      label: 'Featured Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      hasMany: false
    },
    {
      name: 'category',
      label: 'Category',
      type: 'relationship',
      relationTo: 'blog-categories',
      required: true,
      hasMany: false
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'relationship',
      relationTo: 'skills',
      required: true,
      hasMany: true
    }
  ],
}