import {
  type CollectionConfig
} from 'payload';
import { titleToSlug } from '@/utils/helpers'

// * blocks
import { HeroSectionNoImage } from '@/src/blocks/HeroSectionNoImage/config'
import { ProjectGridBlock } from '@/src/blocks/ProjectGrid/config'
import { HeroSection } from '@/src/blocks/HeroSection/config'
import { OverviewSection } from '@/src/blocks/OverviewSection/config'
import { ProblemFramingSection } from '@/src/blocks/ProblemFramingSection/config'

// * fields
import { NestedRoute } from '@/src/fields/nested-route'

const allowableBlocks = [
  HeroSectionNoImage,
  ProjectGridBlock,
  HeroSection,
  OverviewSection,
  ProblemFramingSection
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