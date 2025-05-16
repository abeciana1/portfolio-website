import {
  type CollectionConfig
} from 'payload';
import { titleToSlug } from '@/utils/helpers'

// * blocks
import { RichTextBlock } from '@/src/blocks/RichTextEditor/config'

const allowableBlocks = [
  RichTextBlock
]

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
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page Layout',
          description: 'Added blocks and title to the page.',
          fields: [
            {
              name: 'title',
              type: 'text',
              admin: {
                description: 'Title for the page',
              },
              required: true
            },
            {
              name: 'slug',
              type: 'text',
              label: 'Slug'
            },
            {
              name: 'layout',
              type: 'blocks',
              label: 'Layout',
              blocks: allowableBlocks
            }
          ]
        }
      ],
    }
  ]
}