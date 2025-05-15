import {
  type CollectionConfig
} from 'payload';
import { titleToSlug } from '@/utils/helpers'

// * blocks
import { RichTextBlock } from '@/src/blocks/RichTextEditor/config'

export const ProjectPage: CollectionConfig = {
  slug: 'project-pages',
  admin: {
    useAsTitle: 'title'
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
  fields: []
}