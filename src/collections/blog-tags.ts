import {
  type CollectionConfig
} from 'payload';

export const BlogTag: CollectionConfig = {
  slug: 'blog-tags',
  admin: {
    useAsTitle: 'label'
  },
  fields: [
    {
      name: 'label',
      label: 'Label',
      type: 'text',
      required: true
    }
  ]
}