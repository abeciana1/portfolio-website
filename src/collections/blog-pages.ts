import {
  type CollectionConfig
} from 'payload';
import { titleToSlug } from '@/utils/helpers'
import {
  lexicalEditor,
  lexicalHTMLField
} from '@payloadcms/richtext-lexical'

// * blocks
import { HeroSectionNoImage } from '@/src/blocks/HeroSectionNoImage/config'
import { RichTextBlock } from '@/src/blocks/RichTextEditor/config'
import { BlogImage as BlogImageBlock } from '@/src/blocks/BlogImage/config'
import { BlogHeader as BlogHeaderBlock } from '@/src/blocks/BlogHeader/config'
import { BlogBody as BlogBodyBlock } from '@/src/blocks/BlogBody/config'
import { BlogPostSectionBlock } from '@/src/blocks/BlogPostSection/config'

// * fields
import { NestedRoute } from '@/src/fields/nested-route'

const allowableBlocks = [
  HeroSectionNoImage,
  RichTextBlock,
  BlogImageBlock,
  BlogHeaderBlock,
  BlogBodyBlock,
  BlogPostSectionBlock
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
              name: 'isBlogPost',
              label: 'Is Blog Post?',
              type: 'checkbox',
              defaultValue: false
            },
            {
              name: 'publishedDate',
              type: 'date',
              label: 'Published Date',
              admin: {
                condition: (_, siblingData) => siblingData.isBlogPost
              }
            },
            {
              name: 'category',
              label: 'Category',
              type: 'relationship',
              relationTo: 'blog-categories',
              required: true,
              hasMany: false,
              admin: {
                condition: (_, siblingData) => siblingData.isBlogPost
              }
            },
            {
              name: 'tags',
              label: 'Tags',
              type: 'relationship',
              relationTo: 'blog-tags',
              hasMany: true,
              admin: {
                condition: (_, siblingData) => siblingData.isBlogPost
              }
            },
            {
              name: 'teaserContent',
              type: 'richText',
              label: 'Teaser Content',
              required: true,
              editor: lexicalEditor(),
              admin: {
                condition: (_, siblingData) => siblingData.isBlogPost
              }
            },
            lexicalHTMLField({
              htmlFieldName: 'content_html',
              lexicalFieldName: 'teaserContent'
            }),
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