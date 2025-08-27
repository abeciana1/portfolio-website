import {
  type CollectionConfig
} from 'payload';
import { titleToSlug } from '@/utils/helpers'

export const BlogCategory: CollectionConfig = {
  slug: 'blog-categories',
  admin: {
    useAsTitle: 'label',
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        if (doc.title) {
          doc.slug = titleToSlug(doc.title);
        }
      }
    ]
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    }
  ]
}