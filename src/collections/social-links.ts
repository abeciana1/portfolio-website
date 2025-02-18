import { type CollectionConfig } from 'payload';

const SocialLinks: CollectionConfig = {
  slug: 'social-links',
  admin: {
    useAsTitle: 'label',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true
    },
    {
      name: 'link',
      type: 'text',
      required: true
    }
  ]
}

export default SocialLinks;