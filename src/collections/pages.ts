import {
  type CollectionConfig
} from 'payload';
import { HeroSection } from '@/src/blocks/HeroSection/config'

const Page: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
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
              name: 'layout',
              type: 'blocks',
              label: 'Layout',
              blocks: [
                HeroSection
              ]
            }
          ]
        }
      ],
    }
  ]
}

export default Page;