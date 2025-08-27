import {
  type CollectionConfig
} from 'payload';
import { titleToSlug } from '@/utils/helpers'

// * blocks
import { HeroSectionNoImage } from '@/src/blocks/HeroSectionNoImage/config'
import { RichTextBlock } from '@/src/blocks/RichTextEditor/config'
import { BlogImage as BlogImageBlock } from '@/src/blocks/BlogImage/config'

// * fields
import { NestedRoute } from '@/src/fields/nested-route'

const allowableBlocks = [
  HeroSectionNoImage,
  RichTextBlock,
  BlogImageBlock
]

export const BlogPage: CollectionConfig = {
  slug: 'blog-pages',
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
            NestedRoute,
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
              name: 'enableBlogHeader',
              label: 'Enable blog header',
              type: 'checkbox'
            },
            {
              name: 'blogHeader',
              type: 'group',
              admin: {
                condition: (_, siblingData) => {
                  if (siblingData.enableBlogHeader) {
                    return true
                  } else {
                    return false
                  }
                }
              },
              fields: [
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
                  required: true
                }
              ]
            },
            {
              name: 'layout',
              type: 'blocks',
              label: 'Layout',
              blocks: allowableBlocks
            }
          ]
        }
      ]
    }
  ]
}