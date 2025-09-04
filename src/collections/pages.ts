import { type CollectionConfig } from 'payload'
import { titleToSlug } from '@/utils/helpers'

// * blocks
import { HeroSection } from '@/src/blocks/HeroSection/config'
import { InViewBasic } from '@/src/blocks/InViewBasic/config'
import { SkillsSection } from '@/src/blocks/SkillsSection/config'
import { TwoColumnGrid } from '@/src/blocks/TwoColumnGrid/config'
import { InViewEmbedBlock } from '@/src/blocks/InViewEmbed/config'
import { CardBlock } from '@/src/blocks/Card/config'
import { JobSection } from '@/src/blocks/JobSection/config'
import { TestimonialSectionBlock } from '@/src/blocks/TestimonialSection/config'
import { BlogPostSectionBlock } from '@/src/blocks/BlogPostSection/config'

// * fields
import { NestedRoute } from '@/src/fields/nested-route'

const allowableBlocks = [
  HeroSection,
  InViewBasic,
  SkillsSection,
  TwoColumnGrid,
  InViewEmbedBlock,
  CardBlock,
  JobSection,
  TestimonialSectionBlock,
  BlogPostSectionBlock
]

const Page: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        if (doc?.title) {
          doc.slug = titleToSlug(doc.title)
        }
      },
    ],
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
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              label: 'Slug',
            },
            {
              name: 'layout',
              type: 'blocks',
              label: 'Layout',
              blocks: allowableBlocks,
            },
          ],
        },
      ],
    },
  ],
}

export default Page
